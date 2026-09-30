import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import { controllers } from '#generated/controllers';
import { loginThrottle, loginEmailThrottle, forgotPasswordThrottle, passwordResetThrottle, contactThrottle, geocodingThrottle } from '#start/limiter';

router.get('/', [controllers.Pages, 'home']).as('home');
router.get('/prestations', [controllers.Pages, 'services']).as('services');
router.get('/permis-de-louer', [controllers.Pages, 'rentalPermit']).as('rental.permit');
router.get('/zone-intervention', [controllers.Pages, 'serviceArea']).as('service.area');
router.get('/zone-intervention/communes', [controllers.ServiceArea, 'searchMunicipalities']).as('service.area.municipalities').use(geocodingThrottle);
router.get('/a-propos', [controllers.Pages, 'about']).as('about');
router.get('/contact', [controllers.Pages, 'contact']).as('contact');
router.post('/contact', [controllers.Contact, 'store']).as('contact.store').use(contactThrottle);

router.get('/password-reset', [controllers.PasswordReset, 'show']).as('password.reset.show');
router.post('/password-reset', [controllers.PasswordReset, 'update']).as('password.reset.update').use(passwordResetThrottle);

router.get('/profile', [controllers.Profile, 'show']).as('profile.show').use(middleware.auth());
router.get('/profile/export', [controllers.Profile, 'exportData']).as('profile.export').use(middleware.auth());
router.put('/profile', [controllers.Profile, 'update']).as('profile.update').use(middleware.auth());
router.post('/profile/password-reset', [controllers.Profile, 'sendPasswordReset']).as('profile.passwordReset').use(middleware.auth());
router.delete('/profile', [controllers.Profile, 'destroy']).as('profile.destroy').use(middleware.auth());

router.on('/login').renderInertia('auth/login', {}).as('login').use(middleware.guest());
router.post('/login', [controllers.Auth, 'login']).as('auth.login.store').use(loginThrottle).use(loginEmailThrottle);
router.get('/forgot-password', [controllers.ForgotPassword, 'show']).as('forgot.password').use(middleware.guest());
router.post('/forgot-password', [controllers.ForgotPassword, 'store']).as('forgot.password.store').use(middleware.guest()).use(forgotPasswordThrottle);
router.delete('/logout', [controllers.Auth, 'logout']).as('auth.logout').use(middleware.auth());

router
    .group((): void => {
        router.get('/', [controllers.admin.Dashboard, 'index']).as('admin.dashboard');

        router.get('/pages/:slug', [controllers.admin.Pages, 'edit']).as('admin.pages.edit');
        router.post('/pages/:slug', [controllers.admin.Pages, 'update']).as('admin.pages.update');

        router.get('/services', [controllers.admin.Services, 'index']).as('admin.services.index');
        router.get('/services/create', [controllers.admin.Services, 'create']).as('admin.services.create');
        router.post('/services', [controllers.admin.Services, 'store']).as('admin.services.store');
        router.get('/services/:id/edit', [controllers.admin.Services, 'edit']).as('admin.services.edit');
        router.put('/services/:id', [controllers.admin.Services, 'update']).as('admin.services.update');
        router.delete('/services/:id', [controllers.admin.Services, 'destroy']).as('admin.services.destroy');
        router.post('/services/:id/move', [controllers.admin.Services, 'move']).as('admin.services.move');

        router.get('/contact-requests', [controllers.admin.ContactRequests, 'index']).as('admin.contactRequests.index');
        router.patch('/contact-requests/:id', [controllers.admin.ContactRequests, 'process']).as('admin.contactRequests.process');
        router.delete('/contact-requests/:id', [controllers.admin.ContactRequests, 'destroy']).as('admin.contactRequests.destroy');

        router.get('/project-types', [controllers.admin.ProjectTypes, 'index']).as('admin.projectTypes.index');
        router.post('/project-types', [controllers.admin.ProjectTypes, 'store']).as('admin.projectTypes.store');
        router.put('/project-types/:id', [controllers.admin.ProjectTypes, 'update']).as('admin.projectTypes.update');
        router.delete('/project-types/:id', [controllers.admin.ProjectTypes, 'destroy']).as('admin.projectTypes.destroy');
        router.post('/project-types/:id/move', [controllers.admin.ProjectTypes, 'move']).as('admin.projectTypes.move');

        router.get('/settings', [controllers.admin.Settings, 'edit']).as('admin.settings.edit');
        router.put('/settings', [controllers.admin.Settings, 'update']).as('admin.settings.update');
    })
    .prefix('/admin')
    .use([middleware.auth(), middleware.admin()]);

router.on('/mentions-legales').renderInertia('legal', {}).as('legal.show');
router.get('/legal', ({ response }) => response.redirect().status(301).toPath('/mentions-legales'));
router.on('/politique-de-confidentialite').renderInertia('privacy', {}).as('privacy.show');
