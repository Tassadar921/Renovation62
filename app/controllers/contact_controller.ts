import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import ProjectType from '#models/project_type';
import ContactRequestRepository from '#repositories/contact_request_repository';
import ContactRequestService from '#services/contact_request_service';
import { contactValidator } from '#validators/contact';

export default class ContactController {
    constructor(private readonly contactRequestRepository: ContactRequestRepository = new ContactRequestRepository()) {}

    public async store({ request, response, session, i18n }: HttpContext) {
        const { projectType: projectTypeId, ...data } = await request.validateUsing(contactValidator);

        const projectType = await ProjectType.find(projectTypeId);
        if (!projectType) {
            session.flashErrors({ projectType: i18n.t('messages.contact.invalidProjectType') });
            return response.redirect().back();
        }

        try {
            const contactRequest = await this.contactRequestRepository.add({ ...data, projectTypeId: projectType.id, projectTypeLabel: projectType.label });
            await ContactRequestService.notify(contactRequest, i18n);
            session.flash('success', i18n.t('messages.contact.success'));
        } catch (e) {
            logger.error({ err: e }, 'contact.store failed');
            session.flash('error', i18n.t('messages.contact.error'));
        }

        return response.redirect().toRoute('contact');
    }
}
