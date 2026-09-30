import cache from '@adonisjs/cache/services/main';
import db from '@adonisjs/lucid/services/db';
import BaseRepository from '#repositories/base/base_repository';
import Service from '#models/service';

export const SERVICES_CACHE_KEY = 'services:all';

export type ServiceData = { title: string; icon: string; summary: string; description: string; features: string };
export type ServiceContent = Omit<ServiceData, 'features'> & { id: string; features: string[] };

/**
 * Features are stored one per line.
 */
export const splitFeatures = (features: string): string[] =>
    features
        .split('\n')
        .map((feature) => feature.trim())
        .filter(Boolean);

export default class ServiceRepository extends BaseRepository<typeof Service> {
    constructor() {
        super(Service);
    }

    public async getAll(): Promise<ServiceContent[]> {
        return cache.getOrSet({
            key: SERVICES_CACHE_KEY,
            ttl: '24h',
            factory: async () => {
                const services = await this.ordered();
                return services.map(({ id, title, icon, summary, description, features }) => ({ id, title, icon, summary, description, features: splitFeatures(features) }));
            },
        });
    }

    public async ordered(): Promise<Service[]> {
        return Service.query().orderBy('position', 'asc');
    }

    public async findOrFail(id: string): Promise<Service> {
        return Service.findOrFail(id);
    }

    public async create(data: ServiceData): Promise<Service> {
        const last = await Service.query().max('position as max').first();
        const service = await Service.create({ ...data, position: Number(last?.$extras.max ?? 0) + 1 });
        await this.clearCache();
        return service;
    }

    public async update(id: string, data: ServiceData): Promise<Service> {
        const service = await Service.findOrFail(id);
        service.merge(data);
        await service.save();
        await this.clearCache();
        return service;
    }

    public async delete(id: string): Promise<void> {
        const service = await Service.findOrFail(id);
        await service.delete();
        await this.clearCache();
    }

    /**
     * Swaps the service with its neighbour in the given direction.
     */
    public async move(id: string, direction: 'up' | 'down'): Promise<void> {
        const service = await Service.findOrFail(id);
        const neighbour = await Service.query()
            .where('position', direction === 'up' ? '<' : '>', service.position)
            .orderBy('position', direction === 'up' ? 'desc' : 'asc')
            .first();

        if (!neighbour) return;

        await db.transaction(async (trx) => {
            const position = service.position;
            service.useTransaction(trx).position = neighbour.position;
            neighbour.useTransaction(trx).position = position;
            await service.save();
            await neighbour.save();
        });
        await this.clearCache();
    }

    private async clearCache(): Promise<void> {
        await cache.delete({ key: SERVICES_CACHE_KEY });
    }
}
