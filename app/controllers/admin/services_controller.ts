import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import ServiceRepository from '#repositories/service_repository';
import ServiceIconEnum from '#types/enum/service_icon_enum';
import { moveServiceValidator, serviceValidator } from '#validators/admin/services';

export default class ServicesController {
    constructor(private readonly serviceRepository: ServiceRepository = new ServiceRepository()) {}

    public async index({ inertia }: HttpContext) {
        const services = await this.serviceRepository.ordered();

        return inertia.render('admin/services/index', {
            services: services.map(({ id, title, icon, summary }) => ({ id, title, icon, summary })),
        });
    }

    public async create({ inertia }: HttpContext) {
        return inertia.render('admin/services/form', { service: null, icons: Object.values(ServiceIconEnum) });
    }

    public async store({ request, response, session, i18n }: HttpContext) {
        const data = await request.validateUsing(serviceValidator);

        try {
            await this.serviceRepository.create({ ...data, features: data.features ?? '' });
            session.flash('success', i18n.t('messages.admin.services.store.success'));
            return response.redirect().toRoute('admin.services.index');
        } catch (e) {
            logger.error({ err: e }, 'services.store failed');
            session.flash('error', i18n.t('messages.admin.services.store.error'));
            return response.redirect().back();
        }
    }

    public async edit({ inertia, params }: HttpContext) {
        const { id, title, icon, summary, description, features } = await this.serviceRepository.findOrFail(params.id);

        return inertia.render('admin/services/form', { service: { id, title, icon, summary, description, features }, icons: Object.values(ServiceIconEnum) });
    }

    public async update({ request, params, response, session, i18n }: HttpContext) {
        const data = await request.validateUsing(serviceValidator);

        try {
            await this.serviceRepository.update(params.id, { ...data, features: data.features ?? '' });
            session.flash('success', i18n.t('messages.admin.services.update.success'));
            return response.redirect().toRoute('admin.services.index');
        } catch (e) {
            logger.error({ err: e }, 'services.update failed');
            session.flash('error', i18n.t('messages.admin.services.update.error'));
            return response.redirect().back();
        }
    }

    public async destroy({ params, response, session, i18n }: HttpContext) {
        try {
            await this.serviceRepository.delete(params.id);
            session.flash('success', i18n.t('messages.admin.services.destroy.success'));
        } catch (e) {
            logger.error({ err: e }, 'services.destroy failed');
            session.flash('error', i18n.t('messages.admin.services.destroy.error'));
        }

        return response.redirect().toRoute('admin.services.index');
    }

    public async move({ request, params, response }: HttpContext) {
        const { direction } = await request.validateUsing(moveServiceValidator);
        await this.serviceRepository.move(params.id, direction);
        return response.redirect().back();
    }
}
