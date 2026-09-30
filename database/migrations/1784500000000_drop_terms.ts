import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    async up(): Promise<void> {
        this.schema.dropTableIfExists('terms_versions');
        this.schema.alterTable('users', (table) => {
            table.dropColumn('accepted_terms_at');
        });
    }

    async down(): Promise<void> {
        this.schema.alterTable('users', (table) => {
            table.timestamp('accepted_terms_at').nullable();
        });
        this.schema.createTable('terms_versions', (table) => {
            table.uuid('id').primary().defaultTo(this.raw('uuidv7()'));
            table.timestamp('invalidated_at').notNullable();
            table.integer('grace_period_days').notNullable().defaultTo(30);
            table.string('note', 500).nullable();

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
}
