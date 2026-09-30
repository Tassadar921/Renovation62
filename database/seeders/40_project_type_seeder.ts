import { BaseSeeder } from '@adonisjs/lucid/seeders';
import cache from '@adonisjs/cache/services/main';
import ProjectType from '#models/project_type';
import { PROJECT_TYPES_CACHE_KEY } from '#repositories/project_type_repository';
import { defaultProjectTypes } from '#database/data/default_project_types';

export default class extends BaseSeeder {
    public async run(): Promise<void> {
        await ProjectType.query().delete();
        await ProjectType.createMany(defaultProjectTypes.map((label, index) => ({ label, position: index + 1 })));

        // Seeded rows bypass the repository, so its cache must be invalidated here
        await cache.delete({ key: PROJECT_TYPES_CACHE_KEY });
    }
}
