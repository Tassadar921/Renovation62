import { BaseSchema } from '@adonisjs/lucid/schema';
import { defaultServices } from '#database/data/default_services';

export default class extends BaseSchema {
    protected tableName = 'services';

    async up(): Promise<void> {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary().defaultTo(this.raw('uuidv7()'));
            table.string('title', 60).notNullable();
            table.string('icon', 30).notNullable();
            table.string('summary', 160).notNullable();
            table.text('description').notNullable();
            table.integer('position').notNullable().defaultTo(0);

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });

        this.defer(async (db) => {
            await db
                .table(this.tableName)
                .multiInsert(defaultServices.map(({ title, icon, summary, description }, index) => ({ title, icon, summary, description, position: index + 1, created_at: new Date() })));
        });
    }

    async down(): Promise<void> {
        this.schema.dropTable(this.tableName);
    }
}
