import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.defer(async (db) => {
            await db.table(this.tableName).insert({
                slug: 'services',
                title: 'Une expertise complète pour la rénovation intérieure',
                description: "Nous prenons en charge l'ensemble des corps d'état de la rénovation de votre bien. Un seul interlocuteur, un chantier coordonné, un rendu propre",
                created_at: new Date(),
            });
        });
    }

    async down(): Promise<void> {
        await this.db.from(this.tableName).where('slug', 'services').delete();
    }
}
