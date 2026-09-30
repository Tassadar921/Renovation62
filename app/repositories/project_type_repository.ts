import cache from '@adonisjs/cache/services/main';
import db from '@adonisjs/lucid/services/db';
import BaseRepository from '#repositories/base/base_repository';
import ProjectType from '#models/project_type';

export const PROJECT_TYPES_CACHE_KEY = 'project_types:all';

export type ProjectTypeContent = { id: string; label: string };

export default class ProjectTypeRepository extends BaseRepository<typeof ProjectType> {
    constructor() {
        super(ProjectType);
    }

    public async getAll(): Promise<ProjectTypeContent[]> {
        return cache.getOrSet({
            key: PROJECT_TYPES_CACHE_KEY,
            ttl: '24h',
            factory: async () => {
                const projectTypes = await ProjectType.query().orderBy('position', 'asc');
                return projectTypes.map(({ id, label }) => ({ id, label }));
            },
        });
    }

    public async add(label: string): Promise<ProjectType> {
        const last = await ProjectType.query().max('position as max').first();
        const projectType = await ProjectType.create({ label, position: Number(last?.$extras.max ?? 0) + 1 });
        await this.clearCache();
        return projectType;
    }

    public async update(id: string, label: string): Promise<ProjectType> {
        const projectType = await ProjectType.findOrFail(id);
        projectType.label = label;
        await projectType.save();
        await this.clearCache();
        return projectType;
    }

    public async delete(id: string): Promise<void> {
        const projectType = await ProjectType.findOrFail(id);
        await projectType.delete();
        await this.clearCache();
    }

    /**
     * Swaps the project type with its neighbour in the given direction.
     */
    public async move(id: string, direction: 'up' | 'down'): Promise<void> {
        const projectType = await ProjectType.findOrFail(id);
        const neighbour = await ProjectType.query()
            .where('position', direction === 'up' ? '<' : '>', projectType.position)
            .orderBy('position', direction === 'up' ? 'desc' : 'asc')
            .first();

        if (!neighbour) return;

        await db.transaction(async (trx) => {
            const position = projectType.position;
            projectType.useTransaction(trx).position = neighbour.position;
            neighbour.useTransaction(trx).position = position;
            await projectType.save();
            await neighbour.save();
        });
        await this.clearCache();
    }

    private async clearCache(): Promise<void> {
        await cache.delete({ key: PROJECT_TYPES_CACHE_KEY });
    }
}
