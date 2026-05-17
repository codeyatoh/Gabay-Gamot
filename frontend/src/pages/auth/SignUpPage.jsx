import { useState, useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { usePSGC } from "@/hooks/usePSGC";
import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, Locate, Layers } from 'lucide-react';
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { SearchableSelect } from "@/components/reui/SearchableSelect";

// Backend API base — Mapbox token is stored server-side only, never exposed to browser
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// Custom Mapbox styles from Mapbox Studio
const MAPBOX_STREETS_STYLE = "mapbox://styles/0xyatoh/cmpa0qeah001z01s3gmphgs0b"; // Custom Streets
const MAPBOX_SATELLITE_STYLE = "mapbox://styles/0xyatoh/cmpa0ea9p003d01sk7v3z4qu3"; // Custom Satellite

const validProofs = [
  "Authorization letter for the Barangay Health Center",
  "City Health Office or Barangay Health Center endorsement",
  "Government, employee, or barangay health worker ID",
  "Appointment, designation, or employment certification connected to the health center",
];

const steps = [
  { title: "Account", description: "Personal details" },
  { title: "Assignment", description: "Health center info" },
  { title: "Pin Location", description: "Center coordinates" },
  { title: "Validation", description: "Proof & identity" },
];

export function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [idDocPreview, setIdDocPreview] = useState(null);
  const [authDocError, setAuthDocError] = useState(null);
  const [idDocError, setIdDocError] = useState(null);

  // Address selectors using PSGC
  const {
    regions,
    provinces,
    cities,
    barangays,
    loadingRegions,
    loadingProvinces,
    loadingCities,
    loadingBarangays,
    fetchProvincesForRegion,
    fetchCitiesForParent,
    fetchBarangaysForCity,
    setProvinces,
    setCities,
    setBarangays
  } = usePSGC();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const handleRegionChange = async (e) => {
    const code = e.target.value;
    setSelectedRegion(code);
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedBarangay("");
    setProvinces([]);
    setCities([]);
    setBarangays([]);

    if (code) {
      const fetchedProvinces = await fetchProvincesForRegion(code);
      if (fetchedProvinces.length === 0) {
        // Province-less region like NCR, fetch cities directly under region
        await fetchCitiesForParent("region", code);
        setSelectedProvince("N/A");
      }
    }
  };

  const handleProvinceChange = async (e) => {
    const code = e.target.value;
    setSelectedProvince(code);
    setSelectedCity("");
    setSelectedBarangay("");
    setCities([]);
    setBarangays([]);

    if (code && code !== "N/A") {
      await fetchCitiesForParent("province", code);
    }
  };

  const handleCityChange = async (e) => {
    const code = e.target.value;
    setSelectedCity(code);
    setSelectedBarangay("");
    setBarangays([]);

    if (code) {
      await fetchBarangaysForCity(code);
    }
  };

  const handleBarangayChange = (e) => {
    setSelectedBarangay(e.target.value);
  };

  const getSelectedName = (list, code) => {
    const item = list.find((x) => x.code === code);
    return item ? item.name : "";
  };

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Mapbox Lifecycle
  useEffect(() => {
    if (currentStep !== 3) {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
      return;
    }

    // Fetch token from backend proxy (token never exposed in browser)
    const timer = setTimeout(async () => {
      const container = document.getElementById("map-container");
      if (!container) return;

      let token;
      try {
        const res = await fetch(`${API_BASE}/api/mapbox/token`);
        const data = await res.json();
        token = data.token;
      } catch (err) {
        console.error("Failed to fetch Mapbox token from backend:", err);
        return;
      }

      if (!token) {
        console.error("No Mapbox token received from backend");
        return;
      }

      mapboxgl.accessToken = token;

      const initialLng = parseFloat(longitude) || 120.9842;
      const initialLat = parseFloat(latitude) || 14.5995;

      const map = new mapboxgl.Map({
        container: "map-container",
        style: mapStyle === "streets" ? MAPBOX_STREETS_STYLE : MAPBOX_SATELLITE_STYLE,
        center: [initialLng, initialLat],
        zoom: parseFloat(longitude) && parseFloat(latitude) ? 15 : 10,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      const marker = new mapboxgl.Marker({
        draggable: true,
        color: "#0b6b35",
      })
        .setLngLat([initialLng, initialLat])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng.toFixed(6));
        setLatitude(lngLat.lat.toFixed(6));
      });

      map.on("load", () => {
        map.resize();
        // Custom styles from Mapbox Studio already include 3D buildings and other features if configured there.
        // No need to manually inject extrusions here.
      });

      mapRef.current = map;
      markerRef.current = marker;
    }, 300);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [currentStep]);

  // Mapbox geocoding whenever address changes
  useEffect(() => {
    if (currentStep !== 2 && currentStep !== 3) return;

    const regionName = getSelectedName(regions, selectedRegion);
    const provinceName = selectedProvince === "N/A" ? "" : getSelectedName(provinces, selectedProvince);
    const cityName = getSelectedName(cities, selectedCity);
    const barangayName = getSelectedName(barangays, selectedBarangay);

    const parts = [barangayName, cityName, provinceName, regionName, "Philippines"].filter(Boolean);
    if (parts.length <= 1) return; // Only "Philippines"

    const query = parts.join(", ");
    // Geocoding via backend proxy — token stays server-side
    const geocodeUrl = `${API_BASE}/api/mapbox/geocode?q=${encodeURIComponent(query)}`;

    fetch(geocodeUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          setLongitude(lng.toFixed(6));
          setLatitude(lat.toFixed(6));

          if (mapRef.current) {
            mapRef.current.flyTo({ center: [lng, lat], zoom: 15 });
          }
          if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);
          }
        }
      })
      .catch((err) => {
        console.error("Geocoding failed:", err);
      });
  }, [selectedRegion, selectedProvince, selectedCity, selectedBarangay, currentStep]);

  const [mapStyle, setMapStyle] = useState("streets"); // "streets" or "satellite"

  const toggleMapStyle = () => {
    if (!mapRef.current) return;
    const nextStyle = mapStyle === "streets" ? "satellite" : "streets";
    setMapStyle(nextStyle);

    // Must use diff:false when switching between styles with different sprites
    // to avoid "Unable to perform style diff: Unimplemented: setSprite" error
    mapRef.current.setStyle(
      nextStyle === "streets" ? MAPBOX_STREETS_STYLE : MAPBOX_SATELLITE_STYLE,
      { diff: false }
    );

    // Re-add marker after style rebuild (setStyle removes all layers + markers)
    mapRef.current.once("style.load", () => {
      if (!mapRef.current || !markerRef.current) return;
      const lngLat = markerRef.current.getLngLat();
      markerRef.current.remove();
      const newMarker = new mapboxgl.Marker({ draggable: true, color: "#0b6b35" })
        .setLngLat(lngLat)
        .addTo(mapRef.current);
      newMarker.on("dragend", () => {
        const pos = newMarker.getLngLat();
        setLongitude(pos.lng.toFixed(6));
        setLatitude(pos.lat.toFixed(6));
      });
      markerRef.current = newMarker;
      mapRef.current.resize();
    });
  };

  const [locating, setLocating] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat.toFixed(6));
        setLongitude(lng.toFixed(6));

        if (mapRef.current) {
          mapRef.current.flyTo({ center: [lng, lat], zoom: 17 });
        }
        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        }
        setLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMsg = "Unable to retrieve exact location.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location access denied. Please enable location permissions in your browser.";
        }
        setLocating(false);
        alert(errorMsg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Auto GPS when reaching step 3 if permission is already granted
  useEffect(() => {
    if (currentStep === 3) {
      if (navigator.permissions && navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            handleGetCurrentLocation();
          }
        });
      }
    }
  }, [currentStep]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFileChange = (e, setPreview, setError, allowedExtensions, maxMb) => {
    setError(null);
    const file = e.target.files[0];
    if (!file) {
      setPreview(null);
      return;
    }

    // Check extension
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const isAllowed = allowedExtensions.includes(fileExtension);

    if (!isAllowed) {
      setError(`Invalid file type. Only ${allowedExtensions.join(', ')} are allowed.`);
      setPreview(null);
      e.target.value = '';
      return;
    }

    // Check size
    const maxBytes = maxMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`File is too large. Maximum size is ${maxMb}MB.`);
      setPreview(null);
      e.target.value = '';
      return;
    }

    // Generate preview
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(file.name);
    }
  };

  return (
    <section className="flex min-h-screen min-h-dvh overflow-x-hidden bg-zinc-50 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-14 md:px-8 md:py-20 lg:py-24 xl:py-28 dark:bg-transparent">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 sm:max-w-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-5 pb-6 sm:p-7 sm:pb-6 md:p-8 md:pb-6">
          <div className="text-center">
            <a href="/" aria-label="go home" className="mx-auto block w-fit">
              <img
                src={logoUrl}
                alt="GabayGamot"
                className="h-12 w-12 max-w-full rounded-md object-contain"
              />
            </a>
            <h1 className="mb-1 mt-4 text-lg font-semibold sm:text-xl">
              Request Health Center Admin Access
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Submit your barangay health center details for Super Admin review
            </p>
          </div>

          <div className="mt-8">
            <Stepper
              value={currentStep}
              onValueChange={setCurrentStep}
              indicators={{
                completed: <CheckIcon className="size-4" />,
              }}
              className="w-full space-y-8"
            >
              <StepperNav className="relative flex w-full justify-between">
                {steps.map((step, index) => (
                  <StepperItem
                    key={index}
                    step={index + 1}
                    className="relative flex flex-1 flex-col items-center"
                  >
                    <StepperTrigger step={index + 1} className="flex flex-col items-center gap-1 sm:gap-2">
                      <StepperIndicator>{index + 1}</StepperIndicator>
                      <div className="text-center">
                        <StepperTitle className="text-[11px] sm:text-sm">{step.title}</StepperTitle>
                        <StepperDescription className="hidden text-[9px] sm:block sm:text-xs">{step.description}</StepperDescription>
                      </div>
                    </StepperTrigger>
                    {steps.length > index + 1 && (
                      <StepperSeparator 
                        isCompleted={currentStep > index + 1} 
                        className="absolute left-[calc(50%+1.25rem)] top-4 w-[calc(100%-2.5rem)]" 
                      />
                    )}
                  </StepperItem>
                ))}
              </StepperNav>

              <StepperPanel>
                {/* Step 1: Account */}
                <StepperContent value={1} className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-left">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Personal Information</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstname" className="block text-sm">First Name</Label>
                          <Input type="text" name="firstname" id="firstname" placeholder="e.g. Juan" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastname" className="block text-sm">Last Name</Label>
                          <Input type="text" name="lastname" id="lastname" placeholder="e.g. Dela Cruz" />
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="block text-sm">Email Address</Label>
                          <Input type="email" name="email" id="email" placeholder="e.g. juan@gmail.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber" className="block text-sm">Mobile Number</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">
                              +63
                            </span>
                            <Input 
                              type="tel" 
                              name="mobileNumber" 
                              id="mobileNumber" 
                              placeholder="9XXXXXXXXX" 
                              className="pl-11"
                              maxLength={10}
                              pattern="^9\d{9}$"
                              onInput={(e) => {
                                let val = e.target.value.replace(/[^0-9]/g, '');
                                if (val.length > 0 && val[0] !== '9') {
                                  val = '';
                                }
                                e.target.value = val;
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
                    <hr className="border-dashed" />
                    <span className="text-muted-foreground whitespace-nowrap text-xs">Or continue with</span>
                    <hr className="border-dashed" />
                  </div>

                  <div className="grid gap-3">
                    <Button type="button" variant="outline" className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262" className="mr-2">
                        <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                        <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                        <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                        <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                      </svg>
                      <span>Sign up with Google</span>
                    </Button>
                  </div>
                </StepperContent>

                {/* Step 2: Assignment */}
                <StepperContent value={2} className="space-y-6">
                  {/* Section 1: Center Information */}
                  <div className="space-y-4">
                    <div className="text-left">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Center Details</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="facilityName" className="block text-sm">Barangay Health Center Name</Label>
                        <Input type="text" name="facilityName" id="facilityName" placeholder="e.g. San Jose Health Center" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position" className="block text-sm">Position / Designation</Label>
                        <Input type="text" name="position" id="position" placeholder="e.g. Barangay Health Worker" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Address Information */}
                  <div className="space-y-4 border-t pt-4">
                    <div className="text-left">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Center Location</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {/* Hidden inputs to capture the selected text names upon form submission */}
                        <input type="hidden" name="regionName" value={getSelectedName(regions, selectedRegion)} />
                        <input type="hidden" name="provinceName" value={selectedProvince === "N/A" ? "N/A" : getSelectedName(provinces, selectedProvince)} />
                        <input type="hidden" name="cityName" value={getSelectedName(cities, selectedCity)} />
                        <input type="hidden" name="barangayName" value={getSelectedName(barangays, selectedBarangay)} />

                        {/* Region Select */}
                        <div className="space-y-2">
                          <Label htmlFor="region" className="block text-sm text-left">Region</Label>
                          <SearchableSelect
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            options={regions.map(r => ({ code: r.code, name: r.name }))}
                            placeholder="Select Region"
                            searchPlaceholder="Search region..."
                            disabled={regions.length === 0}
                            loading={loadingRegions}
                          />
                        </div>

                        {/* Province Select */}
                        <div className="space-y-2">
                          <Label htmlFor="province" className="block text-sm text-left">Province</Label>
                          <SearchableSelect
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            options={provinces.map(p => ({ code: p.code, name: p.name }))}
                            placeholder={selectedProvince === "N/A" ? "N/A - Metro Manila" : "Select Province"}
                            searchPlaceholder="Search province..."
                            disabled={
                              !selectedRegion || 
                              (provinces.length === 0 && selectedRegion && selectedProvince === "N/A")
                            }
                            loading={loadingProvinces}
                          />
                        </div>

                        {/* City/Municipality Select */}
                        <div className="space-y-2">
                          <Label htmlFor="cityMunicipality" className="block text-sm text-left">City / Municipality</Label>
                          <SearchableSelect
                            value={selectedCity}
                            onChange={handleCityChange}
                            options={cities.map(c => ({ code: c.code, name: c.name }))}
                            placeholder="Select City / Municipality"
                            searchPlaceholder="Search city or municipality..."
                            disabled={!selectedRegion || (selectedProvince === "" && selectedProvince !== "N/A")}
                            loading={loadingCities}
                          />
                        </div>

                        {/* Barangay Select */}
                        <div className="space-y-2">
                          <Label htmlFor="barangay" className="block text-sm text-left">Barangay</Label>
                          <SearchableSelect
                            value={selectedBarangay}
                            onChange={handleBarangayChange}
                            options={barangays.map(b => ({ code: b.code, name: b.name }))}
                            placeholder="Select Barangay"
                            searchPlaceholder="Search barangay..."
                            disabled={!selectedCity}
                            loading={loadingBarangays}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="facilityAddress" className="block text-sm">Facility Address Line</Label>
                        <Input type="text" name="facilityAddress" id="facilityAddress" placeholder="Street, sitio, or purok" />
                      </div>
                    </div>
                  </div>
                </StepperContent>

                {/* Step 3: Pin Location */}
                <StepperContent value={3} className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-left">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Pin Center Location</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        Specify the exact physical location of the Barangay Health Center. 
                      </p>
                    </div>

                    {/* Mapbox Coordinates Hidden Inputs */}
                    <input type="hidden" name="latitude" value={latitude} />
                    <input type="hidden" name="longitude" value={longitude} />

                    {/* Map Area with Overlays */}
                    <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-white/10 shadow-md">
                      {/* Map Style Switcher (Top Left) */}
                      <button
                        type="button"
                        onClick={toggleMapStyle}
                        className="absolute top-3 left-3 z-10 rounded-md bg-white/95 dark:bg-zinc-900/95 border dark:border-white/10 px-3 py-2 text-[10px] font-bold shadow-md backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-zinc-900 active:scale-[0.97] text-[#0b6b35] dark:text-[#16a34a] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        <Layers className="h-3.5 w-3.5" />
                        <span>{mapStyle === "streets" ? "Satellite View" : "Streets View"}</span>
                      </button>

                      {/* GPS Button (Top Right) */}
                      <button
                        type="button"
                        onClick={handleGetCurrentLocation}
                        disabled={locating}
                        className="absolute top-3 right-[50px] z-10 rounded-md bg-white/95 dark:bg-zinc-900/95 border dark:border-white/10 px-3 py-2 text-[10px] font-bold shadow-md backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-zinc-900 active:scale-[0.97] text-[#0b6b35] dark:text-[#16a34a] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                        title="Use Current GPS Location"
                      >
                        <Locate className={`h-3.5 w-3.5 ${locating ? "animate-pulse" : ""}`} />
                        <span>{locating ? "Locating..." : "Use GPS"}</span>
                      </button>

                      <div 
                        id="map-container" 
                        className="h-[400px] w-full bg-slate-100 dark:bg-zinc-900"
                      />

                      {/* Coordinates Overlay (Bottom Left) */}
                      <div className="absolute bottom-3 left-3 z-10 rounded-md bg-white/95 dark:bg-zinc-900/95 border dark:border-white/10 px-3 py-2 shadow-md backdrop-blur-sm flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Latitude</span>
                          <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">{latitude || "Not located"}</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200 dark:bg-zinc-800" />
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Longitude</span>
                          <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">{longitude || "Not located"}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </StepperContent>

                {/* Step 4: Validation */}
                <StepperContent value={4} className="space-y-6">
                  {/* Section: Guidelines */}
                  <div className="rounded-md border border-[#dbe9d5] bg-[#f8fbf5] p-4 text-left dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Valid proof documents</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">Upload documents that prove you are authorized.</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-muted-foreground">
                      {validProofs.map((proof) => (
                        <li key={proof}>{proof}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Section: Uploads */}
                  <div className="space-y-4 border-t pt-4">
                    <div className="text-left">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Document Uploads</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="authorizationDocument" className="block text-sm">Authorization Document</Label>
                          <span className="text-[10px] text-muted-foreground">PDF, DOC, DOCX up to 5MB</span>
                        </div>
                        <Input 
                          type="file" 
                          name="authorizationDocument" 
                          id="authorizationDocument" 
                          accept=".pdf,.doc,.docx" 
                          className="cursor-pointer" 
                          onChange={(e) => handleFileChange(e, () => {}, setAuthDocError, ['.pdf', '.doc', '.docx'], 5)}
                        />
                        {authDocError && (
                          <p className="text-xs font-medium text-rose-500 mt-1 text-left">{authDocError}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="idDocument" className="block text-sm">Government / Employee ID</Label>
                          <span className="text-[10px] text-muted-foreground">JPG, JPEG, PNG up to 2MB</span>
                        </div>
                        <Input 
                          type="file" 
                          name="idDocument" 
                          id="idDocument" 
                          accept=".jpg,.jpeg,.png" 
                          className="cursor-pointer" 
                          onChange={(e) => handleFileChange(e, setIdDocPreview, setIdDocError, ['.jpg', '.jpeg', '.png'], 2)}
                        />
                        {idDocError && (
                          <p className="text-xs font-medium text-rose-500 mt-1 text-left">{idDocError}</p>
                        )}
                        {idDocPreview && (
                          <div className="mt-2 relative rounded-md border p-2 bg-slate-50 dark:bg-zinc-900/50">
                            {idDocPreview.startsWith('blob:') ? (
                              <img src={idDocPreview} alt="ID Document Preview" className="max-h-40 w-auto rounded object-contain mx-auto" />
                            ) : (
                              <div className="text-xs text-muted-foreground py-1 text-center font-medium text-left">📄 {idDocPreview}</div>
                            )}
                            <button 
                              type="button" 
                              onClick={() => {
                                setIdDocPreview(null);
                                document.getElementById('idDocument').value = '';
                              }}
                              className="absolute top-1 right-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 text-[10px] w-5 h-5 flex items-center justify-center shadow"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section: Agreement */}
                  <div className="space-y-4 border-t pt-4">
                    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-[#dbe9d5] bg-white p-3 text-left transition-all dark:border-white/10 dark:bg-white/5">
                      <input type="checkbox" name="authorizationAgreement" className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-[#0b6b35]" />
                      <span className="text-xs leading-5 text-muted-foreground">
                        I confirm that I am authorized to request GabayGamot admin access.
                      </span>
                    </label>
                    <div className="rounded-md bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
                      No password is created yet. The Super Admin will review your request first.
                    </div>
                  </div>
                </StepperContent>
              </StepperPanel>

              {/* Navigation Buttons */}
              <div className="flex w-full items-center justify-between gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="w-24"
                >
                  Back
                </Button>
                
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep} className="w-24 bg-[#0b6b35] hover:bg-[#08552b] dark:bg-[#16a34a] dark:hover:bg-[#15803d]">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-[#0b6b35] hover:bg-[#08552b] dark:bg-[#16a34a] dark:hover:bg-[#15803d]">
                    Submit Request
                  </Button>
                )}
              </div>
            </Stepper>
          </div>


        </div>

        <div className="p-3 sm:p-4">
          <p className="text-accent-foreground flex flex-wrap items-center justify-center text-center text-sm">
            Already have an account?
            <Button asChild variant="link" className="px-2">
              <a href="/login">Sign In</a>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
