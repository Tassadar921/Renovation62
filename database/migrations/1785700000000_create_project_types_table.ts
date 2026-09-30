import { BaseSchema } from '@adonisjs/lucid/schema';
import { defaultProjectTypes } from '#database/data/default_project_types';

export default class extends BaseSchema {
    protected tableName = 'project_types';

    async up(): Promise<void> {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary().defaultTo(this.raw('uuidv7()'));
            table.string('label', 80).notNullable();
            table.integer('position').notNullable().defaultTo(0);

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });

        this.defer(async (db) => {
            await db.table(this.tableName).multiInsert(defaultProjectTypes.map((label, index) => ({ label, position: index + 1, created_at: new Date() })));
        });
    }

    async down(): Promise<void> {
        this.schema.dropTable(this.tableName);
    }
}
