import { BaseSeeder } from '@adonisjs/lucid/seeders';
import cache from '@adonisjs/cache/services/main';
import Service from '#models/service';
import { SERVICES_CACHE_KEY } from '#repositories/service_repository';
import { defaultServices } from '#database/data/default_services';

export default class extends BaseSeeder {
    public async run(): Promise<void> {
        await Service.query().delete();
        await Service.createMany(defaultServices.map((service, index) => ({ ...service, features: service.features.join('\n'), position: index + 1 })));

        // Seeded rows bypass the repository, so its cache must be invalidated here
        await cache.delete({ key: SERVICES_CACHE_KEY });
    }
}
