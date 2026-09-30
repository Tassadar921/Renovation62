<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import PageHeader from '~/components/page-header.vue';
import ContactActions from '~/components/contact-actions.vue';
import { serviceIcon } from '~/lib/service-icons';
import { CircleCheck, Recycle } from '@lucide/vue';

const { t } = useI18n();

const accessibilityExamples = ['shower', 'grabBars', 'passages', 'nonSlip', 'toilets'] as const;

defineProps<{
    content: { title: string; description: string };
    services: { id: string; title: string; icon: string; description: string; features: string[] }[];
}>();
</script>

<template>
    <Head :title="t('pages.services.label')">
        <meta head-key="description" name="description" :content="content.title" />
    </Head>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div class="w-full max-w-7xl mx-auto">
            <PageHeader :label="t('pages.services.label')" :title="content.title" :description="content.description" />

            <ul class="mt-12 lg:mt-16 grid gap-6 lg:gap-8 md:grid-cols-2 list-none">
                <li v-for="service in services" :key="service.id">
                    <article class="h-full rounded-2xl border bg-card p-6 sm:p-8 shadow-xs space-y-5">
                        <span class="flex size-12 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                            <component :is="serviceIcon(service.icon)" class="size-6" aria-hidden="true" />
                        </span>
                        <h2 class="text-2xl font-semibold leading-snug text-primary">{{ service.title }}</h2>
                        <p class="font-medium text-muted-foreground whitespace-pre-line">{{ service.description }}</p>
                        <ul v-if="service.features.length" class="space-y-3 list-none">
                            <li v-for="feature in service.features" :key="feature" class="flex items-start gap-3">
                                <CircleCheck class="size-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                                <span class="font-medium text-foreground">{{ feature }}</span>
                            </li>
                        </ul>
                    </article>
                </li>
            </ul>

            <aside class="mt-6 lg:mt-8 flex items-center gap-4 rounded-xl border border-l-4 border-l-secondary bg-card px-6 py-5 shadow-xs">
                <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <Recycle class="size-5" aria-hidden="true" />
                </span>
                <p class="leading-snug">
                    <span class="block font-semibold text-primary">{{ t('pages.services.waste.title') }}</span>
                    <span class="block text-sm font-medium text-muted-foreground">{{ t('pages.services.waste.description') }}</span>
                </p>
            </aside>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24 bg-muted/50 border-y">
        <div class="w-full max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div class="space-y-4">
                <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('pages.services.accessibility.title') }}</h2>
                <p class="text-lg font-medium text-muted-foreground text-pretty">{{ t('pages.services.accessibility.description') }}</p>
            </div>

            <div class="rounded-2xl border bg-card p-6 sm:p-8 shadow-xs space-y-5">
                <h3 class="text-xl font-semibold leading-snug text-primary">{{ t('pages.services.accessibility.examples.title') }}</h3>
                <ul class="space-y-3 list-none">
                    <li v-for="example in accessibilityExamples" :key="example" class="flex items-start gap-3">
                        <CircleCheck class="size-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                        <span class="font-medium text-foreground">{{ t(`pages.services.accessibility.examples.items.${example}`) }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24">
        <div class="w-full max-w-3xl mx-auto text-center space-y-4">
            <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('pages.services.cta.title') }}</h2>
            <p class="text-lg font-medium text-muted-foreground text-balance">{{ t('pages.services.cta.description') }}</p>
            <ContactActions class="pt-4" :label="t('pages.services.cta.button')" />
        </div>
    </section>
</template>
