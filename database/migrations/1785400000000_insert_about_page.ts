import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.defer(async (db) => {
            await db.table(this.tableName).insert({
                slug: 'about',
                title: "L'artisan de vos rénovations intérieures",
                description:
                    'Solutions de Travaux et de Bricolage est une entreprise dirigée par Fabrice Cuisinier, spécialisée dans la rénovation intérieure et la mise aux normes des logements locatifs.',
                created_at: new Date(),
            });
        });
    }

    async down(): Promise<void> {
        await this.db.from(this.tableName).where('slug', 'about').delete();
    }
}
