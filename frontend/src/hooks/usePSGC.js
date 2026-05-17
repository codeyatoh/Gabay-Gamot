import { useState, useEffect } from 'react';

const API_BASE = 'https://psgc.cloud/api';

// Cache NCR barangays locally to avoid slow repeated network requests (1,710 records)
let ncrBarangaysCache = null;

export function usePSGC() {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBarangays, setLoadingBarangays] = useState(false);

  const [error, setError] = useState(null);

  // Fetch Regions on mount
  useEffect(() => {
    async function fetchRegions() {
      setLoadingRegions(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/regions`);
        if (!res.ok) throw new Error('Failed to fetch regions');
        const data = await res.json();
        // Sort regions alphabetically by name
        setRegions(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        setError('Error loading regions. Please refresh or try again.');
        console.error(err);
      } finally {
        setLoadingRegions(false);
      }
    }
    fetchRegions();
  }, []);

  // Fetch Provinces for a selected Region
  const fetchProvincesForRegion = async (regionCode) => {
    if (!regionCode) {
      setProvinces([]);
      return [];
    }
    setLoadingProvinces(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/regions/${regionCode}/provinces`);
      if (!res.ok) throw new Error('Failed to fetch provinces');
      const data = await res.json();
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setProvinces(sorted);
      return sorted;
    } catch (err) {
      console.error(err);
      setProvinces([]);
      return [];
    } finally {
      setLoadingProvinces(false);
    }
  };

  // Fetch Cities/Municipalities for a selected Province OR directly from Region (for NCR/province-less regions)
  const fetchCitiesForParent = async (parentType, parentCode) => {
    if (!parentCode) {
      setCities([]);
      return [];
    }
    setLoadingCities(true);
    setError(null);
    try {
      const endpoint = parentType === 'region' 
        ? `${API_BASE}/regions/${parentCode}/cities-municipalities`
        : `${API_BASE}/provinces/${parentCode}/cities-municipalities`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch cities');
      const data = await res.json();
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setCities(sorted);
      return sorted;
    } catch (err) {
      console.error(err);
      setCities([]);
      return [];
    } finally {
      setLoadingCities(false);
    }
  };

  // Fetch Barangays for a selected City/Municipality
  const fetchBarangaysForCity = async (cityCode) => {
    if (!cityCode) {
      setBarangays([]);
      return [];
    }
    setLoadingBarangays(true);
    setError(null);
    try {
      let data = [];
      // NCR city codes in this API start with '13' (e.g. 1380600000)
      // but in psgc.cloud, NCR city barangays are stored under the NCR region (1300000000)
      if (cityCode.startsWith("13")) {
        let allBrgys = [];
        if (ncrBarangaysCache) {
          allBrgys = ncrBarangaysCache;
        } else {
          const res = await fetch(`${API_BASE}/regions/1300000000/barangays`);
          if (!res.ok) throw new Error('Failed to fetch NCR barangays');
          allBrgys = await res.json();
          ncrBarangaysCache = allBrgys; // Store in persistent local cache
        }
        // Filter by the first 6 digits of the cityCode (e.g., '138060' for Manila City)
        data = allBrgys.filter(b => b.code.startsWith(cityCode.substring(0, 6)));
      } else {
        const res = await fetch(`${API_BASE}/cities-municipalities/${cityCode}/barangays`);
        if (!res.ok) throw new Error('Failed to fetch barangays');
        data = await res.json();
      }
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setBarangays(sorted);
      return sorted;
    } catch (err) {
      console.error("Failed to load barangays:", err);
      setBarangays([]);
      return [];
    } finally {
      setLoadingBarangays(false);
    }
  };

  return {
    regions,
    provinces,
    cities,
    barangays,
    loadingRegions,
    loadingProvinces,
    loadingCities,
    loadingBarangays,
    error,
    fetchProvincesForRegion,
    fetchCitiesForParent,
    fetchBarangaysForCity,
    setProvinces,
    setCities,
    setBarangays
  };
}
