import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('description', 320).notNullable().alter();
        });

        this.defer(async (db) => {
            await db.table(this.tableName).insert({
                slug: 'rental-permit',
                title: 'Bailleurs : un accompagnement expert pour louer en toute conformité',
                description:
                    'Sur le secteur de Boulogne-sur-Mer et dans plusieurs communes du Pas-de-Calais, la mise en location est soumise à autorisation préalable : le permis de louer. Nous vous aidons à préparer votre logement en corrigeant les non-conformités pour sécuriser votre dossier.',
                created_at: new Date(),
            });
        });
    }

    async down(): Promise<void> {
        await this.db.from(this.tableName).where('slug', 'rental-permit').delete();
        this.schema.alterTable(this.tableName, (table) => {
            table.string('description', 160).notNullable().alter();
        });
    }
}
