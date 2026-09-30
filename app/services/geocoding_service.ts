import cache from '@adonisjs/cache/services/main';
import logger from '@adonisjs/core/services/logger';

export type Municipality = { name: string; postcode: string; department: string; lat: number; lon: number };

type GeoplateformeFeature = {
    geometry: { coordinates: [number, number] };
    properties: { name: string; postcode?: string; context?: string };
};

// French government geocoder (IGN Géoplateforme): free, no API key, France only
const SEARCH_URL = 'https://data.geopf.fr/geocodage/search';

// Results are biased towards the company's headquarters (Samer), so local municipalities come first
const BIAS = { lat: '50.64', lon: '1.75' };

export default class GeocodingService {
    /**
     * Searches French municipalities by name. Results are cached, so the same query never hits the API twice.
     */
    public static async searchMunicipalities(query: string): Promise<Municipality[]> {
        return cache.getOrSet({
            key: `geocoding:v2:${query.toLowerCase()}`,
            ttl: '30d',
            factory: async () => {
                const url = `${SEARCH_URL}?${new URLSearchParams({ q: query, type: 'municipality', limit: '5', ...BIAS })}`;
                const response = await fetch(url, { signal: AbortSignal.timeout(5000) });

                if (!response.ok) {
                    logger.warn({ status: response.status, query }, 'geocodingService: search failed');
                    throw new Error(`Geocoding failed with status ${response.status}`);
                }

                const { features } = (await response.json()) as { features: GeoplateformeFeature[] };

                return features.map(({ geometry, properties }) => ({
                    name: properties.name,
                    postcode: properties.postcode ?? '',
                    // context looks like "62, Pas-de-Calais, Hauts-de-France"
                    department: properties.context?.split(', ')[1] ?? '',
                    lat: geometry.coordinates[1],
                    lon: geometry.coordinates[0],
                }));
            },
        });
    }
}
