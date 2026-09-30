import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.defer(async (db) => {
            await db.table(this.tableName).insert({
                slug: 'service-area',
                title: 'Un large périmètre dans le Pas-de-Calais',
                description: 'Basés à Samer, nous nous déplaçons dans le triangle Calais / Berck / Saint-Omer, soit 40 km autour de Boulogne-sur-Mer.',
                created_at: new Date(),
            });
        });
    }

    async down(): Promise<void> {
        await this.db.from(this.tableName).where('slug', 'service-area').delete();
    }
}
