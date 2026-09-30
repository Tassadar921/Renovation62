import ServiceIconEnum from '#types/enum/service_icon_enum';

/**
 * Default services, shared by the migration (production) and the seeder (local).
 */
export const defaultServices = [
    {
        title: 'Plâtrerie & isolation',
        icon: ServiceIconEnum.BRICK_WALL,
        summary: 'Pose de plaques de plâtre, cloisons, isolation intérieure des murs et des combles',
        description: 'Pour créer, redistribuer ou isoler des espaces intérieurs.',
        features: ['Pose de plaques de plâtre BA13 pour un effet thermique, phonique et hydrofuge', 'Création et modification de cloisons', 'Faux plafonds et habillages'],
    },
    {
        title: 'Électricité',
        icon: ServiceIconEnum.ZAP,
        summary: 'Mise aux normes, tableaux, branchements et sécurité',
        description: 'Mise en sécurité et remise aux normes des installations électriques.',
        features: [
            'Remplacement ou création de tableaux électriques',
            'Mise aux normes NF C 15-100',
            'Ajout ou déplacement de prises et interrupteurs',
            'Branchements et raccordements',
            'Permis de louer de votre ville',
        ],
    },
    {
        title: 'Peinture intérieure',
        icon: ServiceIconEnum.PAINT_ROLLER,
        summary: 'Préparation des supports et finitions soignées, peintures de qualité',
        description: 'Préparation des supports et finitions soignées.',
        features: [
            'Préparation des supports',
            'Rebouchage, ponçage, enduit et lissage',
            "Application d'impressions et sous-couches",
            'Peinture murs et plafonds',
            'Peinture de boiseries, portes et huisseries',
            'Accompagnement dans le choix des teintes et finitions',
        ],
    },
    {
        title: 'Revêtements de sol',
        icon: ServiceIconEnum.LAYOUT_GRID,
        summary: 'Linoléum, balatum, parquet flottant : pose professionnelle',
        description: "Pose propre adaptée à l'usage de chaque pièce.",
        features: ['Dépose et préparation du support', 'Pose de linoléum et de balatum, avec sous-couches', 'Parquet flottant', 'Plinthes et finitions', 'Ragréage sur carrelage existant'],
    },
];
