<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue';
import { useAdminLayout } from '~/composables/use_admin_layout';
import { useI18n } from 'vue-i18n';
import { router } from '@inertiajs/vue3';
import { urlFor } from '~/client';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import DeleteButton from '~/components/ui/DeleteButton.vue';
import { Check, Mail, MapPin, Phone, RotateCcw } from '@lucide/vue';
import { formatPhone, phoneHref } from '~/lib/phone';

defineOptions({ layout: AdminLayout });

const { t } = useI18n();
const { pageTitle } = useAdminLayout();

defineProps<{
    contactRequests: {
        id: string;
        name: string;
        phone: string;
        email: string;
        postalCode: string;
        projectTypeLabel: string;
        processedAt: string | null;
        createdAt: string;
    }[];
}>();

pageTitle.value = t('admin.contactRequests.title');

const formatDate = (iso: string): string => new Date(iso).toLocaleString('fr', { dateStyle: 'medium', timeStyle: 'short' });

function setProcessed(id: string, processed: boolean) {
    router.patch(urlFor('admin.contactRequests.process', { id }), { processed }, { preserveScroll: true });
}

function destroy(id: string) {
    router.delete(urlFor('admin.contactRequests.destroy', { id }), { preserveScroll: true });
}
</script>

<template>
    <div class="space-y-4 max-w-4xl">
        <ul v-if="contactRequests.length" class="space-y-3 list-none">
            <li v-for="request in contactRequests" :key="request.id" class="rounded-md border p-4 space-y-3" :class="{ 'opacity-60': request.processedAt }">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <p class="font-semibold">{{ request.name }}</p>
                        <Badge :variant="request.processedAt ? 'outline' : 'secondary'">
                            {{ request.processedAt ? t('admin.contactRequests.processed') : t('admin.contactRequests.new') }}
                        </Badge>
                    </div>
                    <p class="text-xs text-muted-foreground">{{ formatDate(request.createdAt) }}</p>
                </div>

                <p class="text-sm font-medium text-primary">{{ request.projectTypeLabel }}</p>

                <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <a :href="phoneHref(request.phone)" class="inline-flex items-center gap-1.5 hover:text-primary">
                        <Phone class="size-4 text-muted-foreground" />
                        {{ formatPhone(request.phone) }}
                    </a>
                    <a :href="`mailto:${request.email}`" class="inline-flex items-center gap-1.5 hover:text-primary break-all">
                        <Mail class="size-4 text-muted-foreground" />
                        {{ request.email }}
                    </a>
                    <span class="inline-flex items-center gap-1.5">
                        <MapPin class="size-4 text-muted-foreground" />
                        {{ request.postalCode }}
                    </span>
                </div>

                <div class="flex flex-wrap items-center justify-end gap-2">
                    <Button v-if="!request.processedAt" size="sm" class="gap-1" @click="setProcessed(request.id, true)">
                        <Check class="size-4" />
                        {{ t('admin.contactRequests.markProcessed') }}
                    </Button>
                    <Button v-else variant="outline" size="sm" class="gap-1" @click="setProcessed(request.id, false)">
                        <RotateCcw class="size-4" />
                        {{ t('admin.contactRequests.markNew') }}
                    </Button>
                    <DeleteButton
                        :label="t('admin.contactRequests.delete.label')"
                        :title="t('admin.contactRequests.delete.title', { name: request.name })"
                        :description="t('admin.contactRequests.delete.description')"
                        :cancel-label="t('admin.contactRequests.delete.cancel')"
                        :confirm-label="t('admin.contactRequests.delete.confirm')"
                        @confirm="destroy(request.id)"
                    />
                </div>
            </li>
        </ul>
        <p v-else class="rounded-md border p-8 text-center text-sm text-muted-foreground">{{ t('admin.contactRequests.empty') }}</p>
    </div>
</template>
