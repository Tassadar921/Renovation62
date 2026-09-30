import mail from '@adonisjs/mail/services/main';
import router from '@adonisjs/core/services/router';
import logger from '@adonisjs/core/services/logger';
import env from '#start/env';
import type { I18n } from '@adonisjs/i18n';
import type ContactRequest from '#models/contact_request';
import { DateTime } from 'luxon';
import SettingRepository from '#repositories/setting_repository';
import ContactRequestRepository from '#repositories/contact_request_repository';

const settingRepository = new SettingRepository();
const contactRequestRepository = new ContactRequestRepository();

// Retention period announced in the privacy policy
export const CONTACT_REQUEST_RETENTION_YEARS = 3;

export default class ContactRequestService {
    /**
     * Notifies the company (contact email from the BO settings) of a new request.
     * Never throws: the request is already saved and listed in the BO.
     */
    public static async notify(contactRequest: ContactRequest, i18n: I18n): Promise<void> {
        const { email: to } = await settingRepository.getAll();

        if (!to) {
            logger.warn({ id: contactRequest.id }, 'contactRequestService: no contact email in settings, notification skipped');
            return;
        }

        try {
            await mail.send((message) => {
                message
                    .to(to)
                    .from(env.get('NOREPLY_SENDER_EMAIL'), 'Solutions de Travaux et de Bricolage')
                    .replyTo(contactRequest.email, contactRequest.name)
                    .subject(i18n.t('messages.mail.contactRequest.subject', { name: contactRequest.name }))
                    .htmlView('emails/contact_request', {
                        intro: i18n.t('messages.mail.contactRequest.intro'),
                        rows: [
                            { label: i18n.t('messages.mail.contactRequest.name'), value: contactRequest.name },
                            { label: i18n.t('messages.mail.contactRequest.phone'), value: contactRequest.phone },
                            { label: i18n.t('messages.mail.contactRequest.email'), value: contactRequest.email },
                            { label: i18n.t('messages.mail.contactRequest.postalCode'), value: contactRequest.postalCode },
                            { label: i18n.t('messages.mail.contactRequest.projectType'), value: contactRequest.projectTypeLabel },
                        ],
                        ctaLabel: i18n.t('messages.mail.contactRequest.cta'),
                        adminUrl: `${env.get('APP_URL')}${router.makeUrl('admin.contactRequests.index')}`,
                        footer: i18n.t('messages.mail.contactRequest.footer'),
                    });
            });
        } catch (e) {
            logger.error({ err: e, id: contactRequest.id }, 'contactRequestService: mail.send failed');
        }
    }

    /**
     * Deletes the requests with no activity for longer than the retention period.
     */
    public static async purgeExpired(): Promise<number> {
        const deleted = await contactRequestRepository.deleteInactiveSince(DateTime.now().minus({ years: CONTACT_REQUEST_RETENTION_YEARS }));
        logger.info({ deleted }, 'contactRequestService: expired contact requests purged');
        return deleted;
    }
}
