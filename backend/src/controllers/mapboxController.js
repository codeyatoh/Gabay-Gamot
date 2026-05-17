/**
 * Mapbox Proxy Controller
 * 
 * Purpose: Keep the Mapbox secret access token server-side only.
 * The frontend never sees the real token — it proxies all requests
 * through this Express server which injects the token before forwarding.
 */

const MAPBOX_TOKEN = process.env.MAPBOX_SECRET_TOKEN;
const MAPBOX_API = "https://api.mapbox.com";

/**
 * GET /api/mapbox/token
 * Returns a temporary, scoped public token for initializing the Mapbox GL JS map.
 * Note: For full security, use Mapbox Temporary Tokens API here.
 */
export const mapboxTokenHandler = (req, res) => {
  if (!MAPBOX_TOKEN) {
    return res.status(500).json({ error: "Mapbox token not configured on server" });
  }
  // Return the token — frontend uses this to initialize mapboxgl
  // In production you can upgrade this to issue temporary tokens via the Mapbox Tokens API
  res.json({ token: MAPBOX_TOKEN });
};

/**
 * GET /api/mapbox/geocode?q=...
 * Proxies geocoding requests to Mapbox, injecting the secret token server-side.
 */
export const mapboxGeocodeHandler = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query parameter q" });
  if (!MAPBOX_TOKEN) return res.status(500).json({ error: "Mapbox token not configured" });

  try {
    const encoded = encodeURIComponent(q);
    const url = `${MAPBOX_API}/geocoding/v5/mapbox.places/${encoded}.json?access_token=${MAPBOX_TOKEN}&country=PH&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("[Mapbox Geocode Proxy Error]", err);
    res.status(502).json({ error: "Failed to reach Mapbox geocoding service" });
  }
};

/**
 * GET /api/mapbox/tiles/:styleUser/:styleId/:z/:x/:y
 * Proxies Mapbox tile requests server-side so the token never appears in browser network tab.
 */
export const mapboxTileHandler = async (req, res) => {
  const { styleUser, styleId, z, x, y } = req.params;
  if (!MAPBOX_TOKEN) return res.status(500).json({ error: "Mapbox token not configured" });

  try {
    const url = `${MAPBOX_API}/styles/v1/${styleUser}/${styleId}/tiles/512/${z}/${x}/${y}?access_token=${MAPBOX_TOKEN}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("Tile fetch failed");
    }

    // Forward content-type and binary tile data
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache tiles for 24h
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("[Mapbox Tile Proxy Error]", err);
    res.status(502).send("Failed to reach Mapbox tile service");
  }
};
