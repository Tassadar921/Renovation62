<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import PageHeader from '~/components/page-header.vue';
import ContactActions from '~/components/contact-actions.vue';
import { ref } from 'vue';
import ServiceAreaMap from '~/components/service-area-map.vue';
import ServiceAreaChecker, { type Municipality } from '~/components/service-area-checker.vue';

const { t } = useI18n();

const checkedPlace = ref<Municipality | null>(null);

defineProps<{
    content: { title: string; description: string };
}>();
</script>

<template>
    <Head :title="t('pages.serviceArea.title')">
        <meta head-key="description" name="description" :content="content.title" />
    </Head>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div class="w-full max-w-7xl mx-auto">
            <PageHeader :label="t('pages.serviceArea.title')" :title="content.title" :description="content.description" />

            <div class="mt-12 lg:mt-16 space-y-6">
                <div class="lg:w-1/2">
                    <ServiceAreaChecker @place="checkedPlace = $event" />
                </div>
                <ServiceAreaMap :place="checkedPlace" />
            </div>
        </div>
    </section>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 py-20 lg:py-24 bg-muted/50 border-y">
        <div class="w-full max-w-3xl mx-auto text-center space-y-4">
            <h2 class="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-primary text-balance">{{ t('pages.serviceArea.outside.title') }}</h2>
            <p class="text-lg font-medium text-muted-foreground text-balance">{{ t('pages.serviceArea.outside.description') }}</p>
            <ContactActions class="pt-4" :label="t('pages.serviceArea.outside.button')" />
        </div>
    </section>
</template>
