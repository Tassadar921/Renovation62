import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('image', 255).nullable();
        });
    }

    async down(): Promise<void> {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('image');
        });
    }
}
