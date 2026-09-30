import type { Component } from 'vue';
import type { useI18n } from 'vue-i18n';
import type { urlFor } from '~/client';
import { BarChart2, ExternalLink, Inbox, House, Info, KeyRound, ListOrdered, Mail, MapPin, Settings, Wrench } from '@lucide/vue';

type RouteName = Parameters<typeof urlFor>[0];

export type MenuItem = {
    title: string;
    route: RouteName;
    params?: Record<string, string>;
    icon: Component;
    exact?: boolean;
};

export const getItems = (t: ReturnType<typeof useI18n>['t']): MenuItem[] => [
    { title: t('admin.layout.menu.dashboard'), route: 'admin.dashboard', icon: BarChart2, exact: true },
    { title: t('admin.layout.menu.contactRequests'), route: 'admin.contactRequests.index', icon: Inbox },
    { title: t('admin.layout.menu.landing'), route: 'admin.pages.edit', params: { slug: 'home' }, icon: House },
    { title: t('admin.layout.menu.services'), route: 'admin.services.index', icon: Wrench },
    { title: t('admin.layout.menu.rentalPermit'), route: 'admin.pages.edit', params: { slug: 'rental-permit' }, icon: KeyRound },
    { title: t('admin.layout.menu.serviceArea'), route: 'admin.pages.edit', params: { slug: 'service-area' }, icon: MapPin },
    { title: t('admin.layout.menu.about'), route: 'admin.pages.edit', params: { slug: 'about' }, icon: Info },
    { title: t('admin.layout.menu.contact'), route: 'admin.pages.edit', params: { slug: 'contact' }, icon: Mail },
    { title: t('admin.layout.menu.projectTypes'), route: 'admin.projectTypes.index', icon: ListOrdered },
    { title: t('admin.layout.menu.settings'), route: 'admin.settings.edit', icon: Settings },
];

export const getFooterItems = (t: ReturnType<typeof useI18n>['t']): MenuItem[] => [{ title: t('admin.layout.menu.home'), route: 'home', icon: ExternalLink }];
