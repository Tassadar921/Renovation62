import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import PageRepository from '#repositories/page_repository';
import { updatePageValidator } from '#validators/admin/pages';

export default class PagesController {
    constructor(private readonly pageRepository: PageRepository = new PageRepository()) {}

    public async edit({ inertia, params }: HttpContext) {
        const page = await this.pageRepository.findBySlugOrFail(params.slug);

        return inertia.render('admin/pages/edit', {
            content: {
                slug: page.slug,
                title: page.title,
                description: page.description,
                body: page.body,
                image: page.image,
                updatedAt: page.updatedAt?.toISO() ?? null,
            },
        });
    }

    public async update({ request, params, response, session, i18n }: HttpContext) {
        const data = await request.validateUsing(updatePageValidator);

        try {
            await this.pageRepository.updateBySlug(params.slug, data);
            session.flash('success', i18n.t('messages.admin.pages.update.success'));
        } catch (e) {
            logger.error({ err: e }, 'pages.update failed');
            session.flash('error', i18n.t('messages.admin.pages.update.error'));
        }

        return response.redirect().back();
    }
}
