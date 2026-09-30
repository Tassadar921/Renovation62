import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import GeocodingService from '#services/geocoding_service';
import { municipalitySearchValidator } from '#validators/service_area';

export default class ServiceAreaController {
    public async searchMunicipalities({ request, response }: HttpContext) {
        const { q } = await request.validateUsing(municipalitySearchValidator, { data: request.qs() });

        try {
            return response.json({ municipalities: await GeocodingService.searchMunicipalities(q) });
        } catch (e) {
            logger.error({ err: e }, 'serviceArea.searchMunicipalities failed');
            return response.status(503).json({ municipalities: [] });
        }
    }
}
