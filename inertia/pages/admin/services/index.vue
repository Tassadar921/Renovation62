<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue';
import { useAdminLayout } from '~/composables/use_admin_layout';
import { useI18n } from 'vue-i18n';
import { router } from '@inertiajs/vue3';
import { Link } from '@adonisjs/inertia/vue';
import { urlFor } from '~/client';
import { Button } from '~/components/ui/button';
import DeleteButton from '~/components/ui/DeleteButton.vue';
import { ArrowDown, ArrowUp, FileText, Pencil, Plus } from '@lucide/vue';
import { serviceIcon } from '~/lib/service-icons';

defineOptions({ layout: AdminLayout });

const { t } = useI18n();
const { pageTitle } = useAdminLayout();

defineProps<{
    services: { id: string; title: string; icon: string; summary: string }[];
}>();

pageTitle.value = t('admin.services.title');

function move(id: string, direction: 'up' | 'down') {
    router.post(urlFor('admin.services.move', { id }), { direction }, { preserveScroll: true });
}

function destroy(id: string) {
    router.delete(urlFor('admin.services.destroy', { id }), { preserveScroll: true });
}
</script>

<template>
    <div class="space-y-4 max-w-4xl">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" size="sm" class="gap-2" as-child>
                <Link :href="urlFor('admin.pages.edit', { slug: 'services' })">
                    <FileText class="size-4" />
                    {{ t('admin.services.editHeader') }}
                </Link>
            </Button>
            <Button class="gap-2" as-child>
                <Link route="admin.services.create">
                    <Plus class="size-4" />
                    {{ t('admin.services.add') }}
                </Link>
            </Button>
        </div>

        <p class="text-sm text-muted-foreground">{{ t('admin.services.hint') }}</p>

        <ol v-if="services.length" class="rounded-md border divide-y list-none">
            <li v-for="(service, index) in services" :key="service.id" class="flex items-center gap-4 p-4">
                <div class="flex flex-col gap-1">
                    <Button variant="ghost" size="icon-sm" :disabled="index === 0" :aria-label="t('admin.services.moveUp')" @click="move(service.id, 'up')">
                        <ArrowUp class="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" :disabled="index === services.length - 1" :aria-label="t('admin.services.moveDown')" @click="move(service.id, 'down')">
                        <ArrowDown class="size-4" />
                    </Button>
                </div>
                <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <component :is="serviceIcon(service.icon)" class="size-5" aria-hidden="true" />
                </span>
                <div class="min-w-0 flex-1">
                    <p class="font-medium">{{ service.title }}</p>
                    <p class="text-sm text-muted-foreground truncate">{{ service.summary }}</p>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" class="gap-1" as-child>
                        <Link :href="urlFor('admin.services.edit', { id: service.id })">
                            <Pencil class="size-4" />
                            {{ t('admin.services.edit') }}
                        </Link>
                    </Button>
                    <DeleteButton
                        :label="t('admin.services.delete.label')"
                        :title="t('admin.services.delete.title', { title: service.title })"
                        :description="t('admin.services.delete.description')"
                        :cancel-label="t('admin.services.delete.cancel')"
                        :confirm-label="t('admin.services.delete.confirm')"
                        @confirm="destroy(service.id)"
                    />
                </div>
            </li>
        </ol>
        <p v-else class="rounded-md border p-8 text-center text-sm text-muted-foreground">{{ t('admin.services.empty') }}</p>
    </div>
</template>
