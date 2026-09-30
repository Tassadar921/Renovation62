<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import PageHeader from '~/components/page-header.vue';
import ContactActions from '~/components/contact-actions.vue';
import { CircleCheck } from '@lucide/vue';

const { t } = useI18n();

const commitments = ['audit', 'quote', 'documents', 'diagnostics', 'report'] as const;

const checklist = ['electricity', 'fire', 'railings', 'surfaces', 'ventilation', 'insulation', 'joinery', 'sanitary'] as const;

defineProps<{
    content: { title: string; description: string };
}>();
</script>

<template>
    <Head :title="t('pages.rentalPermit.title')">
        <meta head-key="description" name="description" :content="content.title" />
    </Head>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div class="w-full max-w-7xl mx-auto">
            <PageHeader :label="t('pages.rentalPermit.title')" :title="content.title" :description="content.description" />
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24 bg-muted/50 border-y">
        <div class="w-full max-w-7xl mx-auto">
            <div class="lg:w-2/3 space-y-4">
                <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('pages.rentalPermit.what.title') }}</h2>
                <p v-for="paragraph in ['law', 'visit']" :key="paragraph" class="text-lg font-medium text-muted-foreground text-pretty">
                    {{ t(`pages.rentalPermit.what.${paragraph}`) }}
                </p>
            </div>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24">
        <div class="w-full max-w-7xl mx-auto grid gap-10 lg:grid-cols-3 lg:gap-16">
            <div class="lg:col-span-2 space-y-4">
                <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('pages.rentalPermit.checklist.title') }}</h2>
                <p class="text-lg font-medium text-muted-foreground text-pretty">{{ t('pages.rentalPermit.checklist.description') }}</p>
                <ul class="pt-4 grid gap-3 sm:grid-cols-2 list-none">
                    <li v-for="item in checklist" :key="item" class="flex items-start gap-3 rounded-xl border bg-card px-4 py-3.5 shadow-xs">
                        <CircleCheck class="size-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                        <span class="font-medium text-foreground">{{ t(`pages.rentalPermit.checklist.items.${item}`) }}</span>
                    </li>
                </ul>
            </div>

            <div class="self-start rounded-2xl border bg-card p-6 sm:p-8 shadow-xs space-y-5">
                <h3 class="text-xl font-semibold leading-snug text-primary">{{ t('pages.rentalPermit.commitment.title') }}</h3>
                <ul class="space-y-3 list-none">
                    <li v-for="item in commitments" :key="item" class="flex items-start gap-3">
                        <CircleCheck class="size-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                        <span class="font-medium text-foreground">{{ t(`pages.rentalPermit.commitment.items.${item}`) }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24 bg-muted/50 border-y">
        <div class="w-full max-w-3xl mx-auto text-center space-y-4">
            <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('pages.rentalPermit.cta.title') }}</h2>
            <p class="text-lg font-medium text-muted-foreground text-balance">{{ t('pages.rentalPermit.cta.description') }}</p>
            <ContactActions class="pt-4" :label="t('pages.rentalPermit.cta.button')" />
        </div>
    </section>
</template>
