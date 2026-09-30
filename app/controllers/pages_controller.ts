import { HttpContext } from '@adonisjs/core/http';
import PageRepository from '#repositories/page_repository';
import ServiceRepository from '#repositories/service_repository';
import ProjectTypeRepository from '#repositories/project_type_repository';

export default class PagesController {
    constructor(
        private readonly pageRepository: PageRepository = new PageRepository(),
        private readonly serviceRepository: ServiceRepository = new ServiceRepository(),
        private readonly projectTypeRepository: ProjectTypeRepository = new ProjectTypeRepository()
    ) {}

    public async home({ inertia }: HttpContext) {
        const { title, description, image } = await this.pageRepository.getContent('home');
        const services = await this.serviceRepository.getAll();

        return inertia.render('home', {
            content: { title, description, image },
            services: services.map(({ id, title: serviceTitle, icon, summary }) => ({ id, title: serviceTitle, icon, summary })),
        });
    }

    public async serviceArea({ inertia }: HttpContext) {
        const { title, description } = await this.pageRepository.getContent('service-area');
        return inertia.render('service_area', { content: { title, description } });
    }

    public async contact({ inertia }: HttpContext) {
        const { title, description } = await this.pageRepository.getContent('contact');
        return inertia.render('contact', { content: { title, description }, projectTypes: await this.projectTypeRepository.getAll() });
    }

    public async about({ inertia }: HttpContext) {
        const { title, description, body } = await this.pageRepository.getContent('about');
        return inertia.render('about', { content: { title, description, body } });
    }

    public async rentalPermit({ inertia }: HttpContext) {
        const { title, description } = await this.pageRepository.getContent('rental-permit');
        return inertia.render('rental_permit', { content: { title, description } });
    }

    public async services({ inertia }: HttpContext) {
        const { title, description } = await this.pageRepository.getContent('services');
        const services = await this.serviceRepository.getAll();

        return inertia.render('services', {
            content: { title, description },
            services: services.map(({ id, title: serviceTitle, icon, description: serviceDescription, features }) => ({ id, title: serviceTitle, icon, description: serviceDescription, features })),
        });
    }
}
