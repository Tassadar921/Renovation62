<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { Link } from '@adonisjs/inertia/vue';
import { useI18n } from 'vue-i18n';
import { Button } from '~/components/ui/button';
import { ArrowRight, Phone } from '@lucide/vue';
import { formatPhone, phoneHref } from '~/lib/phone';
import type { Data } from '@generated/data';

defineProps<{
    // Label of the button leading to the contact page
    label: string;
}>();

const { t } = useI18n();
const page = usePage<Data.SharedProps>();
</script>

<template>
    <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <a
            v-if="page.props.settings.phone"
            :href="phoneHref(page.props.settings.phone)"
            :aria-label="t('homePage.call', { phone: formatPhone(page.props.settings.phone) })"
            class="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
        >
            <Phone class="size-4 text-secondary" aria-hidden="true" />
            {{ formatPhone(page.props.settings.phone) }}
        </a>
        <Button as-child class="group gap-2">
            <Link route="contact">
                {{ label }}
                <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
        </Button>
    </div>
</template>
