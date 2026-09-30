<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue';
import { useAdminLayout } from '~/composables/use_admin_layout';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { urlFor } from '~/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { ExternalLink, ImagePlus, Trash2 } from '@lucide/vue';

defineOptions({ layout: AdminLayout });

const TITLE_MAX = 70;
const DESCRIPTION_MAX = 320;
const BODY_MAX = 3000;

const { t } = useI18n();
const { pageTitle } = useAdminLayout();

const props = defineProps<{
    content: { slug: string; title: string; description: string; body: string | null; image: string | null; updatedAt: string | null };
}>();

const pageConfigs = {
    home: { label: 'admin.layout.menu.landing', eyebrow: 'homePage.eyebrow', route: 'home', hasImage: true, hasBody: false },
    services: { label: 'admin.layout.menu.services', eyebrow: 'pages.services.label', route: 'services', hasImage: false, hasBody: false },
    'rental-permit': { label: 'admin.layout.menu.rentalPermit', eyebrow: 'pages.rentalPermit.title', route: 'rental.permit', hasImage: false, hasBody: false },
    'service-area': { label: 'admin.layout.menu.serviceArea', eyebrow: 'pages.serviceArea.title', route: 'service.area', hasImage: false, hasBody: false },
    contact: { label: 'admin.layout.menu.contact', eyebrow: 'pages.contact.title', route: 'contact', hasImage: false, hasBody: false },
    about: { label: 'admin.layout.menu.about', eyebrow: 'pages.about.title', route: 'about', hasImage: false, hasBody: true },
} as const;

const config = pageConfigs[props.content.slug as keyof typeof pageConfigs];

pageTitle.value = t(config.label);

// Meta title = orange eyebrow + site name; meta description = blue title
const metaTitle = `${t(config.eyebrow)} - ${t('title')}`;

const form = useForm<{ title: string; description: string; body: string; image: File | null; removeImage: boolean }>({
    title: props.content.title,
    description: props.content.description,
    body: props.content.body ?? '',
    image: null,
    removeImage: false,
});

const fileInput = ref<HTMLInputElement | null>(null);
const localPreview = ref<string | null>(null);
const imagePreview = computed(() => localPreview.value ?? (form.removeImage ? null : props.content.image));

function onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (localPreview.value) URL.revokeObjectURL(localPreview.value);
    form.image = file;
    form.removeImage = false;
    localPreview.value = file ? URL.createObjectURL(file) : null;
}

function removeImage() {
    if (localPreview.value) URL.revokeObjectURL(localPreview.value);
    localPreview.value = null;
    form.image = null;
    form.removeImage = true;
    if (fileInput.value) fileInput.value.value = '';
}

function submit() {
    form.post(urlFor('admin.pages.update', { slug: props.content.slug }), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            if (localPreview.value) URL.revokeObjectURL(localPreview.value);
            localPreview.value = null;
            form.image = null;
            form.removeImage = false;
            if (fileInput.value) fileInput.value.value = '';
        },
    });
}
</script>

<template>
    <form class="space-y-4 max-w-3xl" @submit.prevent="submit">
        <div class="flex items-center justify-end gap-4">
            <Button variant="outline" size="sm" class="gap-2" as-child>
                <a :href="urlFor(config.route)" target="_blank">
                    <ExternalLink class="size-4" />
                    {{ t('admin.pages.edit.view') }}
                </a>
            </Button>
            <Button type="submit" :disabled="form.processing">
                {{ t('admin.pages.edit.save') }}
            </Button>
        </div>

        <div class="rounded-md border p-5 space-y-6">
            <div class="space-y-1">
                <Label for="title">{{ t('admin.pages.edit.fields.title') }}</Label>
                <Input id="title" v-model="form.title" type="text" :max="TITLE_MAX" :error="form.errors.title" />
                <div class="flex justify-between gap-4 text-xs text-muted-foreground">
                    <p>{{ t('admin.pages.edit.fields.titleHint') }}</p>
                    <p class="shrink-0">{{ form.title.length }}/{{ TITLE_MAX }}</p>
                </div>
            </div>

            <div class="space-y-1">
                <Label for="description">{{ t('admin.pages.edit.fields.description') }}</Label>
                <Textarea id="description" v-model="form.description" :maxlength="DESCRIPTION_MAX" rows="3" :aria-invalid="!!form.errors.description" />
                <p v-if="form.errors.description" class="text-xs text-destructive">{{ form.errors.description }}</p>
                <div class="flex justify-between gap-4 text-xs text-muted-foreground">
                    <p>{{ t('admin.pages.edit.fields.descriptionHint') }}</p>
                    <p class="shrink-0">{{ form.description.length }}/{{ DESCRIPTION_MAX }}</p>
                </div>
            </div>
        </div>

        <div v-if="config.hasBody" class="rounded-md border p-5 space-y-1">
            <Label for="body">{{ t('admin.pages.edit.fields.body') }}</Label>
            <Textarea id="body" v-model="form.body" :maxlength="BODY_MAX" rows="6" :aria-invalid="!!form.errors.body" />
            <p v-if="form.errors.body" class="text-xs text-destructive">{{ form.errors.body }}</p>
            <div class="flex justify-between gap-4 text-xs text-muted-foreground">
                <p>{{ t('admin.pages.edit.fields.bodyHint') }}</p>
                <p class="shrink-0">{{ form.body.length }}/{{ BODY_MAX }}</p>
            </div>
        </div>

        <div v-if="config.hasImage" class="rounded-md border p-5 space-y-3">
            <Label for="image">{{ t('admin.pages.edit.fields.image') }}</Label>
            <div class="flex flex-col sm:flex-row gap-4 items-start">
                <div class="w-40 aspect-4/5 shrink-0 overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                    <img v-if="imagePreview" :src="imagePreview" alt="" class="size-full object-cover" />
                    <ImagePlus v-else class="size-8 text-muted-foreground" aria-hidden="true" />
                </div>
                <div class="space-y-3">
                    <input id="image" ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" @change="onImageChange" />
                    <div class="flex flex-wrap gap-2">
                        <Button type="button" variant="outline" size="sm" class="gap-2" @click="fileInput?.click()">
                            <ImagePlus class="size-4" />
                            {{ imagePreview ? t('admin.pages.edit.fields.imageReplace') : t('admin.pages.edit.fields.imageAdd') }}
                        </Button>
                        <Button v-if="imagePreview" type="button" variant="outline" size="sm" class="gap-2 text-destructive" @click="removeImage">
                            <Trash2 class="size-4" />
                            {{ t('admin.pages.edit.fields.imageRemove') }}
                        </Button>
                    </div>
                    <p class="text-xs text-muted-foreground">{{ t('admin.pages.edit.fields.imageHint') }}</p>
                    <p v-if="form.errors.image" class="text-xs text-destructive">{{ form.errors.image }}</p>
                </div>
            </div>
        </div>

        <div class="rounded-md border p-5 space-y-1">
            <p class="text-xs font-medium text-muted-foreground mb-2">{{ t('admin.pages.edit.preview') }}</p>
            <p class="text-lg text-primary truncate">{{ metaTitle }}</p>
            <p class="text-sm text-muted-foreground line-clamp-2">{{ form.title }}</p>
            <p class="pt-2 text-xs text-muted-foreground">{{ t('admin.pages.edit.previewHint') }}</p>
        </div>

        <p v-if="content.updatedAt" class="text-xs text-muted-foreground px-1">{{ t('admin.pages.edit.updatedAt') }} : {{ new Date(content.updatedAt).toLocaleString() }}</p>
    </form>
</template>
