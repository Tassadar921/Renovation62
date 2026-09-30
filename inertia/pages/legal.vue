<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { Link } from '@adonisjs/inertia/vue';
import type { Data } from '@generated/data';
import { useI18n } from 'vue-i18n';
import PageHeader from '~/components/page-header.vue';
import { formatPhone, phoneHref } from '~/lib/phone';

const { t } = useI18n();
const page = usePage<Data.SharedProps>();

const editorFacts = ['legalForm', 'headquarters', 'registration', 'siret', 'vat'] as const;
</script>

<template>
    <Head :title="t('legal.title')">
        <meta name="robots" content="noindex" />
    </Head>

    <div class="px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-24 lg:pt-40">
        <div class="w-full max-w-7xl mx-auto">
            <PageHeader :label="t('layout.footer.legalLabel')" :title="t('legal.title')" />

            <div class="mt-12 lg:w-2/3 space-y-10">
                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.editor.title') }}</h2>
                    <div class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <p class="font-medium text-slate-700 dark:text-slate-200">{{ t('legal.editor.name') }}</p>
                        <p v-for="fact in editorFacts" :key="fact">{{ t(`legal.editor.${fact}.label`) }} : {{ t(`legal.editor.${fact}.value`) }}</p>
                        <p v-if="page.props.settings.phone">
                            {{ t('legal.editor.phoneLabel') }} :
                            <a :href="phoneHref(page.props.settings.phone)" class="underline underline-offset-2 hover:text-primary transition-colors">{{ formatPhone(page.props.settings.phone) }}</a>
                        </p>
                        <p v-if="page.props.settings.email">
                            {{ t('legal.editor.emailLabel') }} :
                            <a :href="'mailto:' + page.props.settings.email" class="underline underline-offset-2 hover:text-primary transition-colors">{{ page.props.settings.email }}</a>
                        </p>
                        <p class="pt-2">{{ t('legal.editor.publisher.label') }} : {{ t('legal.editor.publisher.value') }}</p>
                    </div>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.credits.title') }}</h2>
                    <div class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <p>{{ t('legal.credits.identity') }}</p>
                        <p>
                            {{ t('legal.editor.phoneLabel') }} :
                            <a :href="phoneHref(t('legal.credits.phone'))" class="underline underline-offset-2 hover:text-primary transition-colors">{{ t('legal.credits.phone') }}</a>
                        </p>
                    </div>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.purpose.title') }}</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('legal.purpose.description') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.hosting.title') }}</h2>
                    <div class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <p class="font-medium text-slate-700 dark:text-slate-200">{{ t('legal.hosting.name') }}</p>
                        <p>{{ t('legal.hosting.address') }}</p>
                        <p>{{ t('legal.hosting.registration') }}</p>
                        <p>
                            {{ t('legal.editor.phoneLabel') }} :
                            <a :href="phoneHref(t('legal.hosting.phone'))" class="underline underline-offset-2 hover:text-primary transition-colors">{{ t('legal.hosting.phone') }}</a>
                        </p>
                        <p>
                            {{ t('legal.hosting.websiteLabel') }} :
                            <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-primary transition-colors">www.ovh.com</a>
                        </p>
                    </div>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.intellectualProperty.title') }}</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('legal.intellectualProperty.description') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.links.title') }}</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('legal.links.description') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.personalData.title') }}</h2>
                    <div class="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                        <p>{{ t('legal.personalData.collection') }}</p>
                        <p>{{ t('legal.personalData.cookies') }}</p>
                        <p>
                            {{ t('legal.personalData.rights') }}
                            <template v-if="page.props.settings.email">
                                {{ t('legal.personalData.rightsByEmail') }}
                                <!-- inline-flex drops the whitespace Prettier inserts before the period -->
                                <span class="inline-flex">
                                    <a :href="'mailto:' + page.props.settings.email" class="underline underline-offset-2 hover:text-primary transition-colors">{{ page.props.settings.email }}</a>
                                    .
                                </span>
                            </template>
                            <template v-else>
                                {{ t('legal.data.rightsByContactPage') }}
                                <span class="inline-flex">
                                    <Link route="contact" class="underline underline-offset-2 hover:text-primary transition-colors">{{ t('layout.nav.links.contact') }}</Link>
                                    .
                                </span>
                            </template>
                        </p>
                        <p>
                            {{ t('legal.personalData.more') }}
                            <span class="inline-flex">
                                <Link route="privacy.show" class="underline underline-offset-2 hover:text-primary transition-colors">{{ t('legal.personalData.privacyLink') }}</Link>
                                .
                            </span>
                        </p>
                    </div>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.liability.title') }}</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('legal.liability.description') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.mediation.title') }}</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        {{ t('legal.mediation.description') }}
                        <span class="inline-flex">
                            <a href="https://www.economie.gouv.fr/mediation-conso" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-primary transition-colors">
                                economie.gouv.fr/mediation-conso
                            </a>
                            .
                        </span>
                    </p>
                </section>

                <section class="space-y-3">
                    <h2 class="font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.law.title') }}</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('legal.law.description') }}</p>
                </section>
            </div>
        </div>
    </div>
</template>
