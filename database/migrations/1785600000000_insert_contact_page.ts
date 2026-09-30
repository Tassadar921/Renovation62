import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.defer(async (db) => {
            await db.table(this.tableName).insert({
                slug: 'contact',
                title: 'Parlons de votre projet.',
                description: 'Remplissez le formulaire ou appelez-nous directement. Une fois la visite de votre futur chantier réalisée, nous vous répondons sous 48h avec un devis clair et détaillé.',
                created_at: new Date(),
            });
        });
    }

    async down(): Promise<void> {
        await this.db.from(this.tableName).where('slug', 'contact').delete();
    }
}
