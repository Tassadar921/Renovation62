import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'contact_requests';

    async up(): Promise<void> {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary().defaultTo(this.raw('uuidv7()'));
            table.string('name', 100).notNullable();
            table.string('phone', 20).notNullable();
            table.string('email', 255).notNullable();
            table.string('postal_code', 5).notNullable();
            // Label is copied so the request stays readable if the type is renamed or deleted
            table.uuid('project_type_id').nullable().references('id').inTable('project_types').onDelete('SET NULL');
            table.string('project_type_label', 80).notNullable();
            table.timestamp('processed_at').nullable();

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }

    async down(): Promise<void> {
        this.schema.dropTable(this.tableName);
    }
}
