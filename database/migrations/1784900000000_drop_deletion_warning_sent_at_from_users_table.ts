import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'users';

    async up(): Promise<void> {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('deletion_warning_sent_at');
        });
    }

    async down(): Promise<void> {
        this.schema.alterTable(this.tableName, (table) => {
            table.timestamp('deletion_warning_sent_at').nullable();
        });
    }
}
