import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import ProjectTypeRepository from '#repositories/project_type_repository';
import { moveProjectTypeValidator, projectTypeValidator } from '#validators/admin/project_types';

export default class ProjectTypesController {
    constructor(private readonly projectTypeRepository: ProjectTypeRepository = new ProjectTypeRepository()) {}

    public async index({ inertia }: HttpContext) {
        return inertia.render('admin/project_types', { projectTypes: await this.projectTypeRepository.getAll() });
    }

    public async store({ request, response, session, i18n }: HttpContext) {
        const { label } = await request.validateUsing(projectTypeValidator);

        try {
            await this.projectTypeRepository.add(label);
            session.flash('success', i18n.t('messages.admin.projectTypes.store.success'));
        } catch (e) {
            logger.error({ err: e }, 'projectTypes.store failed');
            session.flash('error', i18n.t('messages.admin.projectTypes.store.error'));
        }

        return response.redirect().toRoute('admin.projectTypes.index');
    }

    public async update({ request, params, response, session, i18n }: HttpContext) {
        const { label } = await request.validateUsing(projectTypeValidator);

        try {
            await this.projectTypeRepository.update(params.id, label);
            session.flash('success', i18n.t('messages.admin.projectTypes.update.success'));
        } catch (e) {
            logger.error({ err: e }, 'projectTypes.update failed');
            session.flash('error', i18n.t('messages.admin.projectTypes.update.error'));
        }

        return response.redirect().toRoute('admin.projectTypes.index');
    }

    public async destroy({ params, response, session, i18n }: HttpContext) {
        try {
            await this.projectTypeRepository.delete(params.id);
            session.flash('success', i18n.t('messages.admin.projectTypes.destroy.success'));
        } catch (e) {
            logger.error({ err: e }, 'projectTypes.destroy failed');
            session.flash('error', i18n.t('messages.admin.projectTypes.destroy.error'));
        }

        return response.redirect().toRoute('admin.projectTypes.index');
    }

    public async move({ request, params, response }: HttpContext) {
        const { direction } = await request.validateUsing(moveProjectTypeValidator);
        await this.projectTypeRepository.move(params.id, direction);
        return response.redirect().back();
    }
}
