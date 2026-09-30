import cache from '@adonisjs/cache/services/main';
import BaseRepository from '#repositories/base/base_repository';
import Setting from '#models/setting';

export const SETTINGS_CACHE_KEY = 'settings:all';

export type SiteSettings = { phone: string | null; email: string | null; facebook: string | null };

export default class SettingRepository extends BaseRepository<typeof Setting> {
    constructor() {
        super(Setting);
    }

    public async getAll(): Promise<SiteSettings> {
        return cache.getOrSet({
            key: SETTINGS_CACHE_KEY,
            ttl: '24h',
            factory: async () => {
                const rows = await Setting.all();
                const values = Object.fromEntries(rows.map((row) => [row.key, row.value]));
                return { phone: values.phone ?? null, email: values.email ?? null, facebook: values.facebook ?? null };
            },
        });
    }

    public async update(data: Partial<SiteSettings>): Promise<void> {
        for (const [key, value] of Object.entries(data)) {
            await Setting.updateOrCreate({ key }, { value: value ?? null });
        }
        await cache.delete({ key: SETTINGS_CACHE_KEY });
    }
}
