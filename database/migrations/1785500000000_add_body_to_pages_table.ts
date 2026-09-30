import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'pages';

    async up(): Promise<void> {
        this.schema.alterTable(this.tableName, (table) => {
            table.text('body').nullable();
        });

        this.defer(async (db) => {
            await db.from(this.tableName).where('slug', 'about').update({
                body: "Créée en juillet 2024 et basée à Samer, l'entreprise s'adresse aux particuliers, aux propriétaires bailleurs et aux investisseurs qui souhaitent un interlocuteur unique, capable d'effectuer l'ensemble d'un chantier de rénovation intérieure.\n\nUn technicien se déplace systématiquement pour évaluer votre projet, prendre des mesures et faire les photos nécessaires. Le devis est ensuite transmis sous 48 heures, avec un chiffrage précis, détaillé poste par poste.\n\nNotre expertise sur le permis de louer nous permet d'accompagner efficacement les bailleurs. Nous connaissons les attentes administratives et nous savons remettre un logement en conformité.",
            });
        });
    }

    async down(): Promise<void> {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('body');
        });
    }
}
