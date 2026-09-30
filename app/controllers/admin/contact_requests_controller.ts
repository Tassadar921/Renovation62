import { HttpContext } from '@adonisjs/core/http';
import ContactRequestRepository from '#repositories/contact_request_repository';
import { processContactRequestValidator } from '#validators/admin/contact_requests';

export default class ContactRequestsController {
    constructor(private readonly contactRequestRepository: ContactRequestRepository = new ContactRequestRepository()) {}

    public async index({ inertia }: HttpContext) {
        const contactRequests = await this.contactRequestRepository.latest();

        return inertia.render('admin/contact_requests', {
            contactRequests: contactRequests.map((contactRequest) => ({
                id: contactRequest.id,
                name: contactRequest.name,
                phone: contactRequest.phone,
                email: contactRequest.email,
                postalCode: contactRequest.postalCode,
                projectTypeLabel: contactRequest.projectTypeLabel,
                processedAt: contactRequest.processedAt?.toISO() ?? null,
                createdAt: contactRequest.createdAt.toISO()!,
            })),
        });
    }

    public async process({ request, params, response }: HttpContext) {
        const { processed } = await request.validateUsing(processContactRequestValidator);
        await this.contactRequestRepository.setProcessed(params.id, processed);
        return response.redirect().back();
    }

    public async destroy({ params, response, session, i18n }: HttpContext) {
        await this.contactRequestRepository.delete(params.id);
        session.flash('success', i18n.t('messages.admin.contactRequests.destroy.success'));
        return response.redirect().toRoute('admin.contactRequests.index');
    }
}
