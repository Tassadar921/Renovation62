<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { Link } from '@adonisjs/inertia/vue';
import type { Data } from '@generated/data';
import { useI18n } from 'vue-i18n';
import PageHeader from '~/components/page-header.vue';

const { t } = useI18n();

const page = usePage<Data.SharedProps>();

// Sections made of a title and a single paragraph, shown after "Données collectées"
const simpleSections = ['purposes', 'basis'] as const;
</script>

<template>
    <Head :title="t('privacy.title')">
        <meta name="robots" content="noindex" />
    </Head>

    <div class="px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-24 lg:pt-40">
        <div class="w-full max-w-7xl mx-auto">
            <PageHeader :label="t('layout.footer.legalLabel')" :title="t('privacy.title')" :description="t('privacy.intro')" />

            <div class="mt-12 lg:w-2/3 space-y-10 text-sm text-slate-600 dark:text-slate-400">
                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('privacy.controller.title') }}</h2>
                    <p>{{ t('privacy.controller.text') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('privacy.collected.title') }}</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>{{ t('privacy.collected.form') }}</li>
                        <li>{{ t('privacy.collected.technical') }}</li>
                    </ul>
                    <p>{{ t('privacy.collected.browsing') }}</p>
                </section>

                <section v-for="section in simpleSections" :key="section" class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t(`privacy.${section}.title`) }}</h2>
                    <p>{{ t(`privacy.${section}.text`) }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('privacy.recipients.title') }}</h2>
                    <p>{{ t('privacy.recipients.text') }}</p>
                    <p>{{ t('privacy.recipients.map') }}</p>
                    <p>{{ t('privacy.recipients.transfers') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('privacy.retention.title') }}</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>{{ t('privacy.retention.form') }}</li>
                        <li>{{ t('privacy.retention.technical') }}</li>
                    </ul>
                </section>

                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('legal.cookies.title') }}</h2>
                    <p>{{ t('legal.cookies.intro') }}</p>
                    <p>{{ t('privacy.storage') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('privacy.security.title') }}</h2>
                    <p>{{ t('privacy.security.text') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('privacy.rights.title') }}</h2>
                    <p>
                        {{ t('privacy.rights.text') }}
                        <template v-if="page.props.settings.email">
                            {{ t('privacy.rights.byEmail') }}
                            <!-- inline-flex drops the whitespace Prettier inserts before the period -->
                            <span class="inline-flex">
                                <a :href="'mailto:' + page.props.settings.email" class="underline underline-offset-2 hover:text-primary transition-colors">{{ page.props.settings.email }}</a>
                                .
                            </span>
                        </template>
                        <template v-else>
                            {{ t('privacy.rights.byContactPage') }}
                            <span class="inline-flex">
                                <Link route="contact" class="underline underline-offset-2 hover:text-primary transition-colors">{{ t('layout.nav.links.contact') }}</Link>
                                .
                            </span>
                        </template>
                    </p>
                    <p>{{ t('privacy.rights.cnil') }}</p>
                </section>

                <section class="space-y-3">
                    <h2 class="text-base font-semibold text-slate-700 dark:text-slate-200">{{ t('privacy.updates.title') }}</h2>
                    <p>{{ t('privacy.updates.text') }}</p>
                    <p class="text-xs text-slate-500">{{ t('privacy.updates.lastUpdate') }}</p>
                </section>
            </div>
        </div>
    </div>
</template>
