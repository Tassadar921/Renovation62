import { DateTime } from 'luxon';
import BaseRepository from '#repositories/base/base_repository';
import ContactRequest from '#models/contact_request';

export type ContactRequestData = { name: string; phone: string; email: string; postalCode: string; projectTypeId: string; projectTypeLabel: string };

export default class ContactRequestRepository extends BaseRepository<typeof ContactRequest> {
    constructor() {
        super(ContactRequest);
    }

    public async add(data: ContactRequestData): Promise<ContactRequest> {
        return ContactRequest.create(data);
    }

    public async latest(): Promise<ContactRequest[]> {
        return ContactRequest.query().orderBy('created_at', 'desc');
    }

    public async countUnprocessed(): Promise<number> {
        const result = await ContactRequest.query().whereNull('processed_at').count('* as total').first();
        return Number(result?.$extras.total ?? 0);
    }

    public async setProcessed(id: string, processed: boolean): Promise<void> {
        const contactRequest = await ContactRequest.findOrFail(id);
        contactRequest.processedAt = processed ? DateTime.now() : null;
        await contactRequest.save();
    }

    /**
     * Deletes requests whose last activity (creation or last update, e.g. marked as processed) is older than the given date.
     */
    public async deleteInactiveSince(date: DateTime): Promise<number> {
        const deleted = await ContactRequest.query().whereRaw('coalesce(updated_at, created_at) < ?', [date.toSQL()!]).delete();
        return Number(Array.isArray(deleted) ? deleted[0] : deleted);
    }

    public async delete(id: string): Promise<void> {
        const contactRequest = await ContactRequest.findOrFail(id);
        await contactRequest.delete();
    }
}
