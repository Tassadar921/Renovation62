import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary().defaultTo(this.raw('uuidv7()'));
            table.string('slug', 50).notNullable().unique();
            table.string('title', 70).notNullable();
            table.string('description', 160).notNullable();

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });

        this.defer(async (db) => {
            await db.table(this.tableName).insert({
                slug: 'home',
                title: 'Votre logement remis à neuf en respectant les normes les plus récentes',
                description: 'Plâtrerie, électricité, peinture, sols. Nous accompagnons les propriétaires et les bailleurs dans toute rénovation intérieure, permis de louer compris',
                created_at: new Date(),
            });
        });
    }

    async down(): Promise<void> {
        this.schema.dropTable(this.tableName);
    }
}
