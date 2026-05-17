import express from "express";
import { mapboxTokenHandler, mapboxGeocodeHandler, mapboxTileHandler } from "../controllers/mapboxController.js";

const router = express.Router();

// Securely provide a temporary scoped token to the frontend
router.get("/token", mapboxTokenHandler);

// Proxy Mapbox Geocoding API — hides token from browser network tab
router.get("/geocode", mapboxGeocodeHandler);

// Proxy Mapbox tile requests — truly hides the token
router.get("/tiles/:styleUser/:styleId/:z/:x/:y", mapboxTileHandler);

export default router;
