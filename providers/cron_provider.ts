import type { ApplicationService } from '@adonisjs/core/types';
import logger from '@adonisjs/core/services/logger';

function scheduleDailyAt(hour: number, task: () => Promise<void>): void {
    const now = new Date();
    const next = new Date();
    next.setHours(hour, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);

    setTimeout(() => {
        task();
        setInterval(task, 24 * 60 * 60 * 1000);
    }, next.getTime() - now.getTime());
}

export default class CronProvider {
    constructor(protected app: ApplicationService) {}

    async ready() {
        // Only run scheduled tasks in the HTTP server process, not in Ace commands
        if (this.app.getEnvironment() !== 'web') return;

        scheduleDailyAt(3, async () => {
            try {
                const { default: ContactRequestService } = await import('#services/contact_request_service');
                await ContactRequestService.purgeExpired();
            } catch (e) {
                logger.error({ err: e }, 'cron: contact requests purge failed');
            }
        });

        logger.info('cron: contact requests purge scheduled daily at 03:00');
    }
}
