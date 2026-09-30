<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue';
import { useAdminLayout } from '~/composables/use_admin_layout';
import { useI18n } from 'vue-i18n';
import { useForm } from '@inertiajs/vue3';
import { urlFor } from '~/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

defineOptions({ layout: AdminLayout });

const { t } = useI18n();
const { pageTitle } = useAdminLayout();

const props = defineProps<{
    settings: { phone: string | null; email: string | null; facebook: string | null };
}>();

pageTitle.value = t('admin.settings.title');

const form = useForm({
    phone: props.settings.phone ?? '',
    email: props.settings.email ?? '',
    facebook: props.settings.facebook ?? '',
});

function submit() {
    form.put(urlFor('admin.settings.update'), { preserveScroll: true });
}
</script>

<template>
    <form class="space-y-4 max-w-3xl" @submit.prevent="submit">
        <div class="flex items-center justify-end">
            <Button type="submit" :disabled="form.processing">
                {{ t('admin.settings.save') }}
            </Button>
        </div>

        <div class="rounded-md border p-5 space-y-6">
            <div class="space-y-1">
                <Label for="phone">{{ t('admin.settings.fields.phone') }}</Label>
                <Input id="phone" v-model="form.phone" type="tel" :max="20" :placeholder="t('admin.settings.fields.phonePlaceholder')" autocomplete="off" />
                <p v-if="form.errors.phone" class="text-xs text-destructive">{{ form.errors.phone }}</p>
                <p class="text-xs text-muted-foreground">{{ t('admin.settings.fields.phoneHint') }}</p>
            </div>

            <div class="space-y-1">
                <Label for="email">{{ t('admin.settings.fields.email') }}</Label>
                <Input id="email" v-model="form.email" type="email" :max="255" :placeholder="t('admin.settings.fields.emailPlaceholder')" autocomplete="off" />
                <p v-if="form.errors.email" class="text-xs text-destructive">{{ form.errors.email }}</p>
                <p class="text-xs text-muted-foreground">{{ t('admin.settings.fields.emailHint') }}</p>
            </div>

            <div class="space-y-1">
                <Label for="facebook">{{ t('admin.settings.fields.facebook') }}</Label>
                <Input id="facebook" v-model="form.facebook" type="url" :max="255" :placeholder="t('admin.settings.fields.facebookPlaceholder')" autocomplete="off" />
                <p v-if="form.errors.facebook" class="text-xs text-destructive">{{ form.errors.facebook }}</p>
                <p class="text-xs text-muted-foreground">{{ t('admin.settings.fields.facebookHint') }}</p>
            </div>
        </div>
    </form>
</template>
