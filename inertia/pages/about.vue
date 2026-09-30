<script setup lang="ts">
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import { Link } from '@adonisjs/inertia/vue';
import { Button } from '~/components/ui/button';
import { useI18n } from 'vue-i18n';
import PageHeader from '~/components/page-header.vue';
import FeatureCard from '~/components/feature-card.vue';
import { ArrowRight, BadgeCheck, Clock, HeartHandshake, Target } from '@lucide/vue';

const { t } = useI18n();

const props = defineProps<{
    content: { title: string; description: string; body: string | null };
}>();

const values = [
    { key: 'precision', icon: Target },
    { key: 'proximity', icon: HeartHandshake },
    { key: 'expertise', icon: BadgeCheck },
    { key: 'reactivity', icon: Clock },
] as const;

const companyFacts = ['director', 'legalName', 'siren', 'creation', 'headquarters'] as const;

// A blank line in the BO separates paragraphs
const paragraphs = computed(() =>
    (props.content.body ?? '')
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
);
</script>

<template>
    <Head :title="t('pages.about.title')">
        <meta head-key="description" name="description" :content="content.title" />
    </Head>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div class="w-full max-w-7xl mx-auto grid gap-10 lg:grid-cols-4 lg:gap-16">
            <div class="lg:col-span-3 space-y-12 lg:space-y-16">
                <PageHeader :label="t('pages.about.title')" :title="content.title" :description="content.description" full-width />

                <div class="space-y-5">
                    <p v-for="(paragraph, index) in paragraphs" :key="index" class="text-lg font-medium text-foreground/80 text-pretty">{{ paragraph }}</p>
                </div>
            </div>

            <aside class="self-end rounded-2xl border bg-card px-5 py-4 shadow-xs space-y-3">
                <h2 class="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('pages.about.company.title') }}</h2>
                <dl class="divide-y">
                    <div v-for="fact in companyFacts" :key="fact" class="py-2 first:pt-0 last:pb-0">
                        <dt class="text-xs font-medium text-muted-foreground">{{ t(`pages.about.company.${fact}.label`) }}</dt>
                        <dd class="text-sm font-semibold text-foreground">{{ t(`pages.about.company.${fact}.value`) }}</dd>
                    </div>
                </dl>
            </aside>

            <ul class="lg:col-span-4 pt-8 lg:pt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
                <li v-for="value in values" :key="value.key">
                    <FeatureCard :icon="value.icon" :title="t(`pages.about.values.${value.key}.title`)" :description="t(`pages.about.values.${value.key}.description`)" heading-tag="h2" />
                </li>
            </ul>

            <blockquote class="lg:col-span-4 pt-12 lg:pt-20 text-center">
                <p class="font-serif text-3xl sm:text-4xl font-semibold italic leading-tight text-primary text-balance">
                    <span class="block">{{ t('pages.about.approach.titleLine1') }}</span>
                    <span class="block">{{ t('pages.about.approach.titleLine2') }}</span>
                </p>
                <span class="mx-auto mt-6 block h-1 w-16 rounded-full bg-secondary" aria-hidden="true"></span>
            </blockquote>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24 bg-muted/50 border-y">
        <div class="w-full max-w-3xl mx-auto text-center space-y-4">
            <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('pages.about.cta.title') }}</h2>
            <p class="text-lg font-medium text-muted-foreground text-balance">{{ t('pages.about.cta.description') }}</p>
            <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button as-child variant="outline">
                    <Link route="services">{{ t('pages.about.cta.services') }}</Link>
                </Button>
                <Button as-child class="group gap-2">
                    <Link route="contact">
                        {{ t('pages.about.cta.quote') }}
                        <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </Button>
            </div>
        </div>
    </section>
</template>
