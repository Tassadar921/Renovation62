import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import SettingRepository from '#repositories/setting_repository';
import { updateSettingsValidator } from '#validators/admin/settings';

export default class SettingsController {
    constructor(private readonly settingRepository: SettingRepository = new SettingRepository()) {}

    public async edit({ inertia }: HttpContext) {
        return inertia.render('admin/settings', { settings: await this.settingRepository.getAll() });
    }

    public async update({ request, response, session, i18n }: HttpContext) {
        const { phone, email, facebook } = await request.validateUsing(updateSettingsValidator);

        try {
            await this.settingRepository.update({ phone: phone || null, email: email || null, facebook: facebook || null });
            session.flash('success', i18n.t('messages.admin.settings.update.success'));
        } catch (e) {
            logger.error({ err: e }, 'settings.update failed');
            session.flash('error', i18n.t('messages.admin.settings.update.error'));
        }

        return response.redirect().back();
    }
}
