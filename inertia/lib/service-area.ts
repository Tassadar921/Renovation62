export type LatLon = [number, number];

// Service area triangle, [latitude, longitude]
export const CALAIS: LatLon = [50.9513, 1.8587];
export const SAINT_OMER: LatLon = [50.75, 2.2522];
export const BERCK: LatLon = [50.4086, 1.5926];
export const SAMER: LatLon = [50.638, 1.7447];

export const SERVICE_AREA: LatLon[] = [CALAIS, SAINT_OMER, BERCK];

// A municipality further than this from the triangle is out of reach
export const MAX_DISTANCE_KM = 50;

// Local flat projection in km, accurate enough at this scale (a few hundred km around the area)
const REFERENCE_LATITUDE = 50.7;
const toKm = ([lat, lon]: LatLon): [number, number] => [lon * 111.32 * Math.cos((REFERENCE_LATITUDE * Math.PI) / 180), lat * 110.57];

const distanceToSegment = (p: [number, number], a: [number, number], b: [number, number]): number => {
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
};

const isInsideTriangle = (p: [number, number], [a, b, c]: [number, number][]): boolean => {
    const side = (u: [number, number], v: [number, number]) => (p[0] - v[0]) * (u[1] - v[1]) - (u[0] - v[0]) * (p[1] - v[1]);
    const [d1, d2, d3] = [side(a, b), side(b, c), side(c, a)];
    const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
    const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
    return !(hasNegative && hasPositive);
};

/**
 * Distance in km between a point and the service area (0 when the point is inside the triangle).
 */
export const distanceToServiceArea = (point: LatLon): number => {
    const p = toKm(point);
    const vertices = SERVICE_AREA.map(toKm);
    if (isInsideTriangle(p, vertices)) return 0;
    return Math.min(...vertices.map((vertex, index) => distanceToSegment(p, vertex, vertices[(index + 1) % vertices.length])));
};
