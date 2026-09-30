import { unlink } from 'node:fs/promises';
import app from '@adonisjs/core/services/app';
import { randomUUID } from 'node:crypto';
import cache from '@adonisjs/cache/services/main';
import type { MultipartFile } from '@adonisjs/core/bodyparser';
import BaseRepository from '#repositories/base/base_repository';
import Page from '#models/page';

export const PAGES_CACHE_TAG = 'pages';

const UPLOADS_DIR = 'uploads/pages';

export type PageContent = { slug: string; title: string; description: string; body: string | null; image: string | null };

export default class PageRepository extends BaseRepository<typeof Page> {
    constructor() {
        super(Page);
    }

    public async getContent(slug: string): Promise<PageContent> {
        return cache.getOrSet({
            key: `page:${slug}`,
            ttl: '24h',
            tags: [PAGES_CACHE_TAG],
            factory: async () => {
                const page = await Page.findByOrFail('slug', slug);
                return { slug: page.slug, title: page.title, description: page.description, body: page.body, image: page.image };
            },
        });
    }

    public async findBySlugOrFail(slug: string): Promise<Page> {
        return Page.findByOrFail('slug', slug);
    }

    public async updateBySlug(slug: string, data: { title: string; description: string; body?: string | null; image?: MultipartFile; removeImage?: boolean }): Promise<Page> {
        const page = await Page.findByOrFail('slug', slug);
        const previousImage = page.image;

        page.merge({ title: data.title, description: data.description });
        if (data.body !== undefined) page.body = data.body || null;

        if (data.image) {
            const name = `${randomUUID()}.${data.image.extname}`;
            await data.image.move(app.publicPath(UPLOADS_DIR), { name });
            page.image = `/${UPLOADS_DIR}/${name}`;
        } else if (data.removeImage) {
            page.image = null;
        }

        await page.save();
        await cache.deleteByTag({ tags: [PAGES_CACHE_TAG] });

        if (previousImage && previousImage !== page.image) {
            await unlink(app.publicPath(previousImage.slice(1))).catch(() => {});
        }

        return page;
    }
}
