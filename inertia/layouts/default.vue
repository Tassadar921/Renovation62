<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Head, usePage, router } from '@inertiajs/vue3';
import { toast, Toaster } from 'vue-sonner';
import type { Data } from '@generated/data';
import { Link } from '@adonisjs/inertia/vue';
import { useI18n } from 'vue-i18n';
import UserToolbar from '~/partials/layout/user-toolbar.vue';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { Mail, Menu, Phone } from '@lucide/vue';
import { formatPhone, phoneHref } from '~/lib/phone';
import { urlFor } from '~/client';
import { useTheme } from '~/lib/useTheme';

const page = usePage<Data.SharedProps>();
const { t } = useI18n();
const { theme } = useTheme();

const navLinks = [
    { route: 'home', label: 'layout.nav.links.home' },
    { route: 'services', label: 'layout.nav.links.services' },
    { route: 'rental.permit', label: 'layout.nav.links.rentalPermit' },
    { route: 'service.area', label: 'layout.nav.links.serviceArea' },
    { route: 'about', label: 'layout.nav.links.about' },
    { route: 'contact', label: 'layout.nav.links.contact' },
] as const;

const legalLinks = [
    { route: 'legal.show', label: 'layout.footer.legal' },
    { route: 'privacy.show', label: 'layout.footer.privacy' },
] as const;

const mobileMenuOpen = ref(false);
const year = new Date().getFullYear();

const isActive = (route: (typeof navLinks)[number]['route'] | (typeof legalLinks)[number]['route']): boolean => {
    const path = page.url.split('?')[0];
    return path === urlFor(route);
};

onMounted(() => {
    if (page.props.flash.error) toast.error(page.props.flash.error);
    if (page.props.flash.success) toast.success(page.props.flash.success);
});

let lastUrl = page.url;
const removeSuccessListener = router.on('success', (event) => {
    mobileMenuOpen.value = false;
    const flash = (event.detail.page.props as { flash?: { success?: string; error?: string } }).flash;
    if (page.url !== lastUrl) toast.dismiss();
    lastUrl = page.url;
    if (flash?.error) toast.error(flash.error);
    if (flash?.success) toast.success(flash.success);
});
onUnmounted(removeSuccessListener);
</script>

<template>
    <Head>
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <meta name="theme-color" content="#1a57ad" />
    </Head>
    <div class="min-h-screen flex flex-col w-full">
        <nav :aria-label="$t('layout.nav.label')" class="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 sm:px-6 min-[1080px]:px-12 h-18">
                <Link route="home" :aria-label="$t('layout.nav.home')" class="shrink-0 justify-self-start">
                    <img :src="'/logo.svg'" alt="Solutions de Travaux et de Bricolage" class="size-12" fetchpriority="high" />
                </Link>

                <ul class="hidden lg:flex items-center gap-1 list-none">
                    <li v-for="link in navLinks" :key="link.route">
                        <Link
                            :route="link.route"
                            :aria-current="isActive(link.route) ? 'page' : undefined"
                            class="relative px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-secondary after:transition-transform after:duration-300 after:origin-left"
                            :class="isActive(link.route) ? 'text-primary after:scale-x-100' : 'text-muted-foreground after:scale-x-0'"
                        >
                            {{ t(link.label) }}
                        </Link>
                    </li>
                </ul>

                <div class="col-start-3 justify-self-end flex items-center gap-2">
                    <UserToolbar />

                    <Sheet v-model:open="mobileMenuOpen">
                        <SheetTrigger as-child>
                            <Button variant="ghost" size="icon" class="lg:hidden" :aria-label="t('layout.nav.openMenu')">
                                <Menu class="size-5" aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" class="pt-16 px-4">
                            <SheetTitle class="sr-only">{{ t('layout.nav.menu') }}</SheetTitle>
                            <ul class="flex flex-col gap-1 list-none">
                                <li v-for="link in navLinks" :key="link.route">
                                    <Link
                                        :route="link.route"
                                        :aria-current="isActive(link.route) ? 'page' : undefined"
                                        class="block rounded-md border-l-2 px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent"
                                        :class="isActive(link.route) ? 'border-secondary bg-accent text-primary' : 'border-transparent text-foreground'"
                                    >
                                        {{ t(link.label) }}
                                    </Link>
                                </li>
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
        <main class="font-sans antialiased min-h-screen overflow-x-hidden">
            <slot />
        </main>
        <footer class="border-t bg-muted/30">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 min-[1080px]:px-12 py-12 grid gap-10 md:grid-cols-3 text-center md:text-left">
                <div class="space-y-4">
                    <Link route="home" :aria-label="t('layout.nav.home')" class="inline-block">
                        <img :src="'/logo.svg'" alt="" class="size-14" loading="lazy" />
                    </Link>
                    <p class="text-sm font-medium text-muted-foreground max-w-xs mx-auto md:mx-0">{{ t('layout.footer.tagline') }}</p>
                    <a
                        v-if="page.props.settings.facebook"
                        :href="page.props.settings.facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                        <svg class="size-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path
                                d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"
                            />
                        </svg>
                        {{ t('layout.footer.facebook') }}
                    </a>
                    <p class="hidden md:block text-xs text-muted-foreground">© {{ year }} {{ t('layout.footer.copyright') }}</p>
                </div>

                <nav :aria-label="t('layout.footer.navigation')" class="space-y-4">
                    <h2 class="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('layout.footer.navigation') }}</h2>
                    <ul class="space-y-2.5 list-none">
                        <li v-for="link in navLinks" :key="link.route">
                            <Link
                                :route="link.route"
                                :aria-current="isActive(link.route) ? 'page' : undefined"
                                class="text-sm font-medium transition-colors hover:text-primary"
                                :class="isActive(link.route) ? 'text-primary' : 'text-muted-foreground'"
                            >
                                {{ t(link.label) }}
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div class="space-y-4">
                    <h2 class="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ t('layout.footer.contact') }}</h2>
                    <ul class="space-y-3 list-none">
                        <li v-if="page.props.settings.phone">
                            <a :href="phoneHref(page.props.settings.phone)" class="inline-flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                                <Phone class="size-4 text-secondary" aria-hidden="true" />
                                {{ formatPhone(page.props.settings.phone) }}
                            </a>
                        </li>
                        <li v-if="page.props.settings.email">
                            <a
                                :href="`mailto:${page.props.settings.email}`"
                                class="inline-flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-primary transition-colors break-all"
                            >
                                <Mail class="size-4 shrink-0 text-secondary" aria-hidden="true" />
                                {{ page.props.settings.email }}
                            </a>
                        </li>
                    </ul>
                    <ul class="pt-4 space-y-2 list-none">
                        <li v-for="link in legalLinks" :key="link.route">
                            <Link
                                :route="link.route"
                                :aria-current="isActive(link.route) ? 'page' : undefined"
                                class="text-xs transition-colors hover:text-primary"
                                :class="isActive(link.route) ? 'text-primary' : 'text-muted-foreground'"
                            >
                                {{ t(link.label) }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!-- On mobile, the copyright closes the footer instead of sitting in the first column -->
                <p class="md:hidden text-xs text-muted-foreground">© {{ year }} {{ t('layout.footer.copyright') }}</p>
            </div>
        </footer>
    </div>

    <Toaster position="top-center" rich-colors :theme="theme" />
</template>
