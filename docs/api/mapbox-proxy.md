# Mapbox Proxy API

## Current Status

The backend currently exposes a small Express API for Mapbox-related requests. Its main purpose is to keep the Mapbox token on the server instead of hardcoding it into the React app.

Implemented files:

- `backend/src/server.js`
- `backend/src/routes/mapboxRoutes.js`
- `backend/src/controllers/mapboxController.js`

## Environment

Required backend variable:

```text
MAPBOX_SECRET_TOKEN=
```

The frontend reads the backend base URL from:

```text
VITE_API_BASE_URL=http://localhost:5000
```

If `VITE_API_BASE_URL` is missing, the signup page falls back to `http://localhost:5000`.

## Endpoints

### `GET /health`

Returns a simple backend health response.

### `GET /api/mapbox/token`

Returns the configured Mapbox token to initialize Mapbox GL JS on the signup location step.

Current behavior:

- validates that `MAPBOX_SECRET_TOKEN` exists
- returns `{ token }`

Security note:

- This is acceptable for local development and early integration, but production should issue a temporary or scoped Mapbox token rather than returning the long-lived secret token directly.

### `GET /api/mapbox/geocode?q=...`

Proxies a geocoding search to Mapbox.

Current behavior:

- requires the `q` query parameter
- adds `country=PH`
- limits results to 1
- injects the Mapbox token server-side

Used by:

- `frontend/src/pages/auth/SignUpPage.jsx` during address selection and pin-location setup

### `GET /api/mapbox/tiles/:styleUser/:styleId/:z/:x/:y`

Proxies Mapbox tile requests through the backend and sets a 24-hour public cache header.

Current behavior:

- injects the Mapbox token server-side
- forwards the Mapbox response content type
- returns binary tile data

## Known Gaps

- CORS currently allows all origins.
- No route-level rate limiting yet.
- No temporary Mapbox token generation yet.
- Tile proxy endpoint is implemented but the current signup map still initializes Mapbox GL JS with the token returned by `/api/mapbox/token`.
