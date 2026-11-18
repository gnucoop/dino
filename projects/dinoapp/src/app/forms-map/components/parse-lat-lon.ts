/**
 * Parses a `"lat,lon"` string — the format of both the location coordinates and the ajf
 * geolocation field value — into a coordinate pair. Returns null for anything that is not a
 * complete, in-range pair (ajf can save partial values such as `"45.1,"`).
 */
export function parseLatLon(value: unknown): [number, number] | null {
  if (typeof value !== 'string' || !value.includes(',')) {
    return null;
  }
  const parts = value.split(',').slice(0, 2).map(s => s.trim());
  if (parts.some(s => s === '')) {
    return null;
  }
  const [lat, lon] = parts.map(s => Number(s));
  if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return null;
  }
  return [lat, lon];
}
