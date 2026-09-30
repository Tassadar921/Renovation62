import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import User from '#models/user';
import { DateTime } from 'luxon';
import { loginValidator } from '#validators/auth';

export default class AuthController {
    public async logout({ auth, response, session, i18n }: HttpContext) {
        await auth.use('web').logout();
        session.flash('success', i18n.t('messages.auth.logout.success'));
        return response.redirect().toRoute('home');
    }

    public async login({ request, auth, response, session, i18n }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator);

        try {
            const user: User = await User.verifyCredentials(email, password);

            if (!user.enabled) {
                session.flash('error', i18n.t('messages.auth.login.notEnabled'));
                return response.redirect().back();
            }

            await auth.use('web').login(user);
            user.lastLoginAt = DateTime.now();
            await user.save();
            return response.redirect().toRoute('admin.dashboard');
        } catch (e) {
            logger.warn({ err: e }, 'auth.login failed');
            session.flash('error', i18n.t('messages.auth.login.error'));
            return response.redirect().back();
        }
    }
}
