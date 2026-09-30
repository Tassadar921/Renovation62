import { BaseSeeder } from '@adonisjs/lucid/seeders';
import cache from '@adonisjs/cache/services/main';
import Page from '#models/page';
import { PAGES_CACHE_TAG } from '#repositories/page_repository';

export default class extends BaseSeeder {
    public async run(): Promise<void> {
        await Page.updateOrCreateMany('slug', [
            {
                slug: 'home',
                title: 'Votre logement remis à neuf en respectant les normes les plus récentes',
                description: 'Plâtrerie, électricité, peinture, sols. Nous accompagnons les propriétaires et les bailleurs dans toute rénovation intérieure, permis de louer compris',
            },
            {
                slug: 'services',
                title: 'Une expertise complète pour la rénovation intérieure',
                description: "Nous prenons en charge l'ensemble des corps d'état de la rénovation de votre bien. Un seul interlocuteur, un chantier coordonné, un rendu propre",
            },
            {
                slug: 'rental-permit',
                title: 'Bailleurs : un accompagnement expert pour louer en toute conformité',
                description:
                    'Sur le secteur de Boulogne-sur-Mer et dans plusieurs communes du Pas-de-Calais, la mise en location est soumise à autorisation préalable : le permis de louer. Nous vous aidons à préparer votre logement en corrigeant les non-conformités pour sécuriser votre dossier.',
            },
            {
                slug: 'about',
                title: "L'artisan de vos rénovations intérieures",
                description:
                    'Solutions de Travaux et de Bricolage est une entreprise dirigée par Fabrice Cuisinier, spécialisée dans la rénovation intérieure et la mise aux normes des logements locatifs.',
                body: "Créée en juillet 2024 et basée à Samer, l'entreprise s'adresse aux particuliers, aux propriétaires bailleurs et aux investisseurs qui souhaitent un interlocuteur unique, capable d'effectuer l'ensemble d'un chantier de rénovation intérieure.\n\nUn technicien se déplace systématiquement pour évaluer votre projet, prendre des mesures et faire les photos nécessaires. Le devis est ensuite transmis sous 48 heures, avec un chiffrage précis, détaillé poste par poste.\n\nNotre expertise sur le permis de louer nous permet d'accompagner efficacement les bailleurs. Nous connaissons les attentes administratives et nous savons remettre un logement en conformité.",
            },
            {
                slug: 'contact',
                title: 'Parlons de votre projet.',
                description: 'Remplissez le formulaire ou appelez-nous directement. Une fois la visite de votre futur chantier réalisée, nous vous répondons sous 48h avec un devis clair et détaillé.',
            },
            {
                slug: 'service-area',
                title: 'Un large périmètre dans le Pas-de-Calais',
                description: 'Basés à Samer, nous nous déplaçons dans le triangle Calais / Berck / Saint-Omer, soit 40 km autour de Boulogne-sur-Mer.',
            },
        ]);

        // Seeded rows bypass the repository, so its cache must be invalidated here
        await cache.deleteByTag({ tags: [PAGES_CACHE_TAG] });
    }
}
