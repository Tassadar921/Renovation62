import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class PurgeContactRequests extends BaseCommand {
    static commandName = 'purge:contact-requests';
    static description = 'Delete contact requests with no activity for longer than the retention period (run daily by the cron provider)';

    static options: CommandOptions = {
        startApp: true,
    };

    async run() {
        const { default: ContactRequestService, CONTACT_REQUEST_RETENTION_YEARS } = await import('#services/contact_request_service');
        const deleted = await ContactRequestService.purgeExpired();
        this.logger.success(`${deleted} demande(s) de contact de plus de ${CONTACT_REQUEST_RETENTION_YEARS} ans supprimée(s)`);
    }
}
