import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'settings';

    async up(): Promise<void> {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary().defaultTo(this.raw('uuidv7()'));
            table.string('key', 50).notNullable().unique();
            table.text('value').nullable();

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });

        this.defer(async (db) => {
            await db.table(this.tableName).insert({ key: 'phone', value: null, created_at: new Date() });
        });
    }

    async down(): Promise<void> {
        this.schema.dropTable(this.tableName);
    }
}
