<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { Link } from '@adonisjs/inertia/vue';
import { useI18n } from 'vue-i18n';
import { Accessibility, ArrowRight, CircleCheck, ClipboardCheck, Clock, Hammer, ImageIcon, KeyRound, MapPin, Phone, Ruler } from '@lucide/vue';
import { Button } from '~/components/ui/button';
import FeatureCard from '~/components/feature-card.vue';
import { formatPhone, phoneHref } from '~/lib/phone';
import { serviceIcon } from '~/lib/service-icons';
import type { Data } from '@generated/data';

const { t } = useI18n();
const page = usePage<Data.SharedProps>();

const highlights = [
    { key: 'quote', icon: ClipboardCheck },
    { key: 'visit', icon: Ruler },
    { key: 'projects', icon: Hammer },
    { key: 'rentalPermit', icon: KeyRound },
] as const;

const rentalPermitSteps = ['diagnosis', 'quote', 'works', 'contact'] as const;

const processSteps = ['contact', 'visit', 'quote', 'works'] as const;

defineProps<{
    content: { title: string; description: string; image: string | null };
    services: { id: string; title: string; icon: string; summary: string }[];
}>();
</script>

<template>
    <Head :title="t('homePage.eyebrow')">
        <meta head-key="description" name="description" :content="content.title" />
    </Head>
    <section class="min-h-svh px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-20 lg:pt-40 lg:pb-16">
        <div class="w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div class="space-y-4 text-center lg:text-left">
                <p class="text-sm font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('homePage.eyebrow') }}</p>
                <h1 class="font-serif text-4xl sm:text-5xl font-semibold leading-tight text-primary text-balance">{{ content.title }}</h1>
                <p class="text-lg font-medium text-muted-foreground text-balance max-w-xl mx-auto lg:mx-0">{{ content.description }}</p>

                <div class="pt-4 flex flex-col items-center lg:items-start gap-6">
                    <Button as-child size="lg" class="group gap-2 h-12 px-7 text-base">
                        <Link route="services">
                            {{ t('homePage.cta') }}
                            <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </Button>

                    <div class="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm">
                        <a
                            v-if="page.props.settings.phone"
                            :href="phoneHref(page.props.settings.phone)"
                            :aria-label="t('homePage.call', { phone: formatPhone(page.props.settings.phone) })"
                            class="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
                        >
                            <Phone class="size-4 text-secondary" aria-hidden="true" />
                            {{ formatPhone(page.props.settings.phone) }}
                        </a>
                        <span class="inline-flex items-center gap-2 text-muted-foreground">
                            <MapPin class="size-4 text-secondary" aria-hidden="true" />
                            {{ t('homePage.sector') }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="relative mx-auto w-full max-w-md lg:max-w-none">
                <div class="aspect-4/5 lg:aspect-auto lg:h-[calc(100svh-14rem)] lg:min-h-[28rem] lg:max-h-[44rem] overflow-hidden rounded-2xl bg-muted shadow-xl">
                    <img v-if="content.image" :src="content.image" :alt="content.title" class="size-full object-cover" fetchpriority="high" />
                    <div v-else class="size-full flex items-center justify-center bg-linear-to-br from-primary/15 to-secondary/20">
                        <ImageIcon class="size-12 text-muted-foreground/60" aria-hidden="true" />
                    </div>
                </div>

                <div class="absolute -bottom-6 left-4 sm:-left-6 flex items-center gap-4 rounded-xl border bg-card/95 backdrop-blur px-5 py-4 shadow-lg max-w-[18rem]">
                    <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                        <Clock class="size-5" aria-hidden="true" />
                    </span>
                    <p class="leading-tight">
                        <span class="block text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('homePage.badge.label') }}</span>
                        <span class="block text-lg font-semibold text-foreground">{{ t('homePage.badge.value') }}</span>
                        <span class="block text-sm font-medium text-muted-foreground">{{ t('homePage.badge.detail') }}</span>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24 bg-muted/50 border-y">
        <ul class="w-full max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
            <li v-for="item in highlights" :key="item.key">
                <FeatureCard :icon="item.icon" :title="t(`homePage.highlights.${item.key}.title`)" :description="t(`homePage.highlights.${item.key}.description`)" heading-tag="h2" />
            </li>
        </ul>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-28">
        <div class="w-full max-w-7xl mx-auto">
            <header class="max-w-3xl mx-auto text-center space-y-4">
                <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('homePage.expertise.title') }}</h2>
                <p class="text-lg font-medium text-muted-foreground text-balance">{{ t('homePage.expertise.subtitle') }}</p>
            </header>

            <ul class="mt-12 lg:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
                <li v-for="service in services" :key="service.id">
                    <FeatureCard :icon="serviceIcon(service.icon)" :title="service.title" :description="service.summary" />
                </li>
            </ul>

            <aside class="mt-6 flex flex-col sm:flex-row gap-6 rounded-xl border border-l-4 border-l-secondary bg-card p-6 lg:p-8 shadow-xs">
                <span class="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <Accessibility class="size-7" aria-hidden="true" />
                </span>
                <div class="space-y-2">
                    <p class="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('homePage.expertise.extra.label') }}</p>
                    <h3 class="text-xl font-semibold leading-snug text-primary">{{ t('homePage.expertise.extra.title') }}</h3>
                    <p class="text-base text-foreground max-w-4xl">{{ t('homePage.expertise.extra.description') }}</p>
                </div>
            </aside>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-28 bg-muted/50 border-y">
        <div class="w-full max-w-7xl mx-auto grid gap-10 lg:grid-cols-3 lg:gap-16 items-center">
            <header class="lg:col-span-2 text-center lg:text-left space-y-4">
                <p class="text-sm font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('homePage.rentalPermit.label') }}</p>
                <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('homePage.rentalPermit.title') }}</h2>
                <p class="text-lg font-medium text-muted-foreground text-pretty">{{ t('homePage.rentalPermit.subtitle') }}</p>
            </header>

            <ul class="rounded-xl border bg-card p-6 lg:p-8 shadow-xs space-y-5 list-none">
                <li v-for="step in rentalPermitSteps" :key="step" class="flex items-start gap-3">
                    <CircleCheck class="size-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                    <span class="font-semibold text-foreground">{{ t(`homePage.rentalPermit.steps.${step}`) }}</span>
                </li>
            </ul>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-28">
        <div class="w-full max-w-7xl mx-auto">
            <header class="max-w-3xl mx-auto text-center space-y-4">
                <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('homePage.process.title') }}</h2>
            </header>

            <ol class="mt-12 lg:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none">
                <li v-for="(step, index) in processSteps" :key="step">
                    <FeatureCard :step="index + 1" :title="t(`homePage.process.steps.${step}.title`)" :description="t(`homePage.process.steps.${step}.description`)" />
                </li>
            </ol>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-28 bg-muted/50 border-y">
        <div class="w-full max-w-3xl mx-auto text-center space-y-4">
            <p class="text-sm font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('homePage.serviceArea.label') }}</p>
            <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('homePage.serviceArea.title') }}</h2>
            <p class="text-lg font-medium text-muted-foreground">{{ t('homePage.serviceArea.subtitle') }}</p>
            <div class="pt-4">
                <Button as-child size="lg" class="gap-2 h-12 px-7 text-base">
                    <Link route="service.area">
                        <MapPin class="size-4" aria-hidden="true" />
                        {{ t('homePage.serviceArea.cta') }}
                    </Link>
                </Button>
            </div>
        </div>
    </section>
</template>
