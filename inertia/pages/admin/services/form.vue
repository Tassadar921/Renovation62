<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue';
import { useAdminLayout } from '~/composables/use_admin_layout';
import { useI18n } from 'vue-i18n';
import { useForm } from '@inertiajs/vue3';
import { Link } from '@adonisjs/inertia/vue';
import { urlFor } from '~/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { ArrowLeft } from '@lucide/vue';
import { serviceIcon } from '~/lib/service-icons';

defineOptions({ layout: AdminLayout });

const TITLE_MAX = 60;
const SUMMARY_MAX = 160;
const DESCRIPTION_MAX = 2000;
const FEATURES_MAX = 1000;

const { t } = useI18n();
const { pageTitle } = useAdminLayout();

const props = defineProps<{
    service: { id: string; title: string; icon: string; summary: string; description: string; features: string } | null;
    icons: string[];
}>();

pageTitle.value = props.service ? t('admin.services.form.editTitle') : t('admin.services.form.createTitle');

const form = useForm({
    title: props.service?.title ?? '',
    icon: props.service?.icon ?? props.icons[0],
    summary: props.service?.summary ?? '',
    description: props.service?.description ?? '',
    features: props.service?.features ?? '',
});

function submit() {
    if (props.service) {
        form.put(urlFor('admin.services.update', { id: props.service.id }));
    } else {
        form.post(urlFor('admin.services.store'));
    }
}
</script>

<template>
    <form class="space-y-4 max-w-3xl" @submit.prevent="submit">
        <div class="flex items-center justify-between gap-4">
            <Button variant="outline" class="gap-2" as-child>
                <Link route="admin.services.index">
                    <ArrowLeft class="size-4" />
                    {{ t('admin.services.form.back') }}
                </Link>
            </Button>
            <Button type="submit" :disabled="form.processing">
                {{ t('admin.services.form.save') }}
            </Button>
        </div>

        <div class="rounded-md border p-5 space-y-6">
            <div class="grid gap-6 sm:grid-cols-[1fr_14rem]">
                <div class="space-y-1">
                    <Label for="title">{{ t('admin.services.form.fields.title') }}</Label>
                    <Input id="title" v-model="form.title" type="text" :max="TITLE_MAX" />
                    <p v-if="form.errors.title" class="text-xs text-destructive">{{ form.errors.title }}</p>
                    <p class="text-xs text-muted-foreground text-right">{{ form.title.length }}/{{ TITLE_MAX }}</p>
                </div>

                <div class="space-y-1">
                    <Label>{{ t('admin.services.form.fields.icon') }}</Label>
                    <Select v-model="form.icon">
                        <SelectTrigger class="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="icon in icons" :key="icon" :value="icon">
                                <component :is="serviceIcon(icon)" class="size-4 text-secondary" aria-hidden="true" />
                                {{ t(`admin.services.icons.${icon}`) }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p v-if="form.errors.icon" class="text-xs text-destructive">{{ form.errors.icon }}</p>
                </div>
            </div>

            <div class="space-y-1">
                <Label for="summary">{{ t('admin.services.form.fields.summary') }}</Label>
                <Textarea id="summary" v-model="form.summary" :maxlength="SUMMARY_MAX" rows="2" />
                <p v-if="form.errors.summary" class="text-xs text-destructive">{{ form.errors.summary }}</p>
                <div class="flex justify-between gap-4 text-xs text-muted-foreground">
                    <p>{{ t('admin.services.form.fields.summaryHint') }}</p>
                    <p class="shrink-0">{{ form.summary.length }}/{{ SUMMARY_MAX }}</p>
                </div>
            </div>

            <div class="space-y-1">
                <Label for="description">{{ t('admin.services.form.fields.description') }}</Label>
                <Textarea id="description" v-model="form.description" :maxlength="DESCRIPTION_MAX" rows="8" />
                <p v-if="form.errors.description" class="text-xs text-destructive">{{ form.errors.description }}</p>
                <div class="flex justify-between gap-4 text-xs text-muted-foreground">
                    <p>{{ t('admin.services.form.fields.descriptionHint') }}</p>
                    <p class="shrink-0">{{ form.description.length }}/{{ DESCRIPTION_MAX }}</p>
                </div>
            </div>

            <div class="space-y-1">
                <Label for="features">{{ t('admin.services.form.fields.features') }}</Label>
                <Textarea id="features" v-model="form.features" :maxlength="FEATURES_MAX" rows="5" />
                <p v-if="form.errors.features" class="text-xs text-destructive">{{ form.errors.features }}</p>
                <div class="flex justify-between gap-4 text-xs text-muted-foreground">
                    <p>{{ t('admin.services.form.fields.featuresHint') }}</p>
                    <p class="shrink-0">{{ form.features.length }}/{{ FEATURES_MAX }}</p>
                </div>
            </div>
        </div>
    </form>
</template>
