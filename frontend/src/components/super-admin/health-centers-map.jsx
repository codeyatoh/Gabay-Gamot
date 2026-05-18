import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

const markerClasses = {
  good: "bg-emerald-600 ring-emerald-500/25",
  warning: "bg-amber-500 ring-amber-500/25",
  danger: "bg-rose-600 ring-rose-500/25",
  neutral: "bg-slate-500 ring-slate-500/25",
};

export function HealthCentersMap({ centers }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedCenterId, setSelectedCenterId] = useState(centers[0]?.id);
  const [mapStatus, setMapStatus] = useState("loading");

  const selectedCenter = useMemo(
    () => centers.find((center) => center.id === selectedCenterId) || centers[0],
    [centers, selectedCenterId]
  );

  useEffect(() => {
    let cancelled = false;

    async function setupMap() {
      if (!mapContainerRef.current || mapRef.current) {
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/mapbox/token`);
        const data = await response.json();

        if (!data.token) {
          throw new Error("No Mapbox token returned by backend.");
        }

        if (cancelled) {
          return;
        }

        mapboxgl.accessToken = data.token;

        const firstCenter = centers[0];
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: MAPBOX_STYLE,
          center: [
            firstCenter.coordinates.longitude,
            firstCenter.coordinates.latitude,
          ],
          zoom: 12,
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        mapRef.current = map;

        map.on("load", () => {
          if (cancelled) {
            return;
          }

          const bounds = new mapboxgl.LngLatBounds();

          centers.forEach((center) => {
            const markerElement = document.createElement("button");
            markerElement.type = "button";
            markerElement.className = cn(
              "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-white shadow-lg ring-8 transition-transform hover:scale-110",
              markerClasses[center.statusTone] || markerClasses.neutral
            );
            markerElement.setAttribute("aria-label", `View ${center.name}`);
            markerElement.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>';
            markerElement.addEventListener("click", () => {
              setSelectedCenterId(center.id);
              map.flyTo({
                center: [
                  center.coordinates.longitude,
                  center.coordinates.latitude,
                ],
                zoom: 14,
              });
            });

            const marker = new mapboxgl.Marker(markerElement)
              .setLngLat([
                center.coordinates.longitude,
                center.coordinates.latitude,
              ])
              .addTo(map);

            markersRef.current.push(marker);
            bounds.extend([
              center.coordinates.longitude,
              center.coordinates.latitude,
            ]);
          });

          map.fitBounds(bounds, {
            padding: 64,
            maxZoom: 13.5,
          });
          setMapStatus("ready");
        });
      } catch (error) {
        console.error("[Super Admin Map] Failed to initialize Mapbox", error);
        if (!cancelled) {
          setMapStatus("error");
        }
      }
    }

    setupMap();

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [centers]);

  return (
    <Card className="overflow-hidden rounded-xl bg-muted/50 shadow-none">
      <CardHeader className="gap-3 border-b md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle>Barangay Coverage Map</CardTitle>
          <CardDescription>
            Registered health centers with assignment and location status.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Legend tone="good" label="Active" />
          <Legend tone="warning" label="Needs review" />
          <Legend tone="danger" label="Suspended" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border bg-background">
          <div ref={mapContainerRef} className="absolute inset-0" />
          {mapStatus === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80 text-sm text-muted-foreground">
              Loading health center map...
            </div>
          )}
          {mapStatus === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/90 p-6 text-center">
              <MapPin className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Mapbox preview is unavailable.</p>
              <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
                Start the backend or check the Mapbox token proxy to view live map pins.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{selectedCenter.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedCenter.barangay}, {selectedCenter.city}
                </p>
              </div>
              <Badge variant="outline">{selectedCenter.status}</Badge>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <Detail label="Primary admin" value={selectedCenter.primaryAdmin} />
              <Detail label="Workers" value={String(selectedCenter.workers)} />
              <Detail label="Inventory" value={selectedCenter.inventoryStatus} />
              <Detail label="Last updated" value={selectedCenter.lastUpdated} />
            </dl>
            <Button className="mt-4 w-full" variant="outline">
              View center profile
            </Button>
          </div>

          <div className="space-y-2">
            {centers.map((center) => (
              <button
                key={center.id}
                type="button"
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border bg-background p-3 text-left transition-colors hover:bg-accent",
                  selectedCenterId === center.id && "border-primary bg-primary/5"
                )}
                onClick={() => {
                  setSelectedCenterId(center.id);
                  mapRef.current?.flyTo({
                    center: [
                      center.coordinates.longitude,
                      center.coordinates.latitude,
                    ],
                    zoom: 14,
                  });
                }}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    markerClasses[center.statusTone]?.split(" ")[0] || "bg-slate-500"
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {center.shortName}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {center.barangay} - {center.status}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Legend({ tone, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs text-muted-foreground">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          markerClasses[tone]?.split(" ")[0] || "bg-slate-500"
        )}
      />
      {label}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0 truncate text-right text-muted-foreground">{value}</dd>
    </div>
  );
}
