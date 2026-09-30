<script setup lang="ts">
import { computed } from 'vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import { Link } from '@adonisjs/inertia/vue';
import PageHeader from '~/components/page-header.vue';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Mail, Phone, Send } from '@lucide/vue';
import { formatPhone, isValidFrenchPhone, phoneHref } from '~/lib/phone';
import { urlFor } from '~/client';
import type { Data } from '@generated/data';

const { t } = useI18n();
const page = usePage<Data.SharedProps>();

defineProps<{
    content: { title: string; description: string };
    projectTypes: { id: string; label: string }[];
}>();

// Constraints mirror app/validators/contact.ts
const form = useForm({
    name: '',
    phone: '',
    email: '',
    postalCode: '',
    projectType: '',
});

function submit() {
    if (!isValid.value) return;
    form.post(urlFor('contact.store'), { preserveScroll: true, onSuccess: () => form.reset() });
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValid = computed(() => {
    const name = form.name.trim();
    return name.length >= 2 && name.length <= 100 && isValidFrenchPhone(form.phone) && EMAIL_REGEX.test(form.email.trim()) && /^\d{5}$/.test(form.postalCode.trim()) && form.projectType !== '';
});
</script>

<template>
    <Head :title="t('pages.contact.title')">
        <meta head-key="description" name="description" :content="content.title" />
    </Head>

    <section class="px-4 sm:px-6 min-[1080px]:px-12 pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div class="w-full max-w-7xl mx-auto">
            <PageHeader :label="t('pages.contact.title')" :title="content.title" :description="content.description" />

            <div class="mt-16 lg:mt-20 grid gap-10 lg:grid-cols-3 lg:gap-16">
                <form class="lg:col-span-2 rounded-2xl border bg-card px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 shadow-xs" novalidate @submit.prevent="submit">
                    <div class="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                        <Input id="name" v-model="form.name" name="name" type="text" :label="t('pages.contact.form.name')" :max="100" :error="form.errors.name" autocomplete="name" required />
                        <Input
                            id="phone"
                            v-model="form.phone"
                            name="phone"
                            type="tel"
                            :label="t('pages.contact.form.phone')"
                            :placeholder="t('pages.contact.form.phonePlaceholder')"
                            pattern="0-9+ .\-"
                            :max="20"
                            :error="form.errors.phone"
                            autocomplete="tel"
                            inputmode="tel"
                            required
                        />
                        <Input
                            id="email"
                            v-model="form.email"
                            name="email"
                            type="email"
                            :label="t('pages.contact.form.email')"
                            :max="255"
                            :error="form.errors.email"
                            autocomplete="email"
                            inputmode="email"
                            required
                        />
                        <Input
                            id="postalCode"
                            v-model="form.postalCode"
                            name="postalCode"
                            type="text"
                            :label="t('pages.contact.form.postalCode')"
                            :placeholder="t('pages.contact.form.postalCodePlaceholder')"
                            pattern="0-9"
                            :max="5"
                            :error="form.errors.postalCode"
                            autocomplete="postal-code"
                            inputmode="numeric"
                            required
                        />
                        <div class="sm:col-span-2 space-y-1.5">
                            <Label for="projectType">
                                {{ t('pages.contact.form.projectType') }}
                                <span class="text-destructive">*</span>
                            </Label>
                            <Select v-model="form.projectType" name="projectType" required>
                                <SelectTrigger id="projectType" class="w-full" :aria-invalid="!!form.errors.projectType">
                                    <SelectValue :placeholder="t('pages.contact.form.projectTypePlaceholder')" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="projectType in projectTypes" :key="projectType.id" :value="projectType.id">{{ projectType.label }}</SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="form.errors.projectType" class="text-sm text-destructive">{{ form.errors.projectType }}</p>
                        </div>
                    </div>

                    <p class="mt-10 text-xs text-muted-foreground text-pretty">
                        {{ t('pages.contact.form.notice') }}

                        <Link route="privacy.show" class="underline underline-offset-2 hover:text-primary transition-colors">{{ t('pages.contact.form.noticeLink') }}</Link>
                    </p>

                    <div class="mt-6 flex justify-end">
                        <Button type="submit" size="lg" class="gap-2 w-full sm:w-auto" :disabled="!isValid || form.processing">
                            <Send class="size-4" aria-hidden="true" />
                            {{ t('pages.contact.form.submit') }}
                        </Button>
                    </div>
                </form>

                <aside class="self-start rounded-2xl border bg-card px-6 py-10 sm:px-8 sm:py-12 shadow-xs space-y-8">
                    <div class="space-y-3">
                        <h2 class="text-xl font-semibold leading-snug text-primary">{{ t('pages.contact.details.title') }}</h2>
                        <p class="font-medium text-muted-foreground">{{ t('pages.contact.details.description') }}</p>
                    </div>
                    <ul class="space-y-6 list-none">
                        <li v-if="page.props.settings.phone">
                            <a
                                :href="phoneHref(page.props.settings.phone)"
                                :aria-label="t('homePage.call', { phone: formatPhone(page.props.settings.phone) })"
                                class="inline-flex items-center gap-3 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                            >
                                <Phone class="size-5 text-secondary" aria-hidden="true" />
                                {{ formatPhone(page.props.settings.phone) }}
                            </a>
                        </li>
                        <li v-if="page.props.settings.email">
                            <a :href="`mailto:${page.props.settings.email}`" class="inline-flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors break-all">
                                <Mail class="size-5 shrink-0 text-secondary" aria-hidden="true" />
                                {{ page.props.settings.email }}
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    </section>
</template>
