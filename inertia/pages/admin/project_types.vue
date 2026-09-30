<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue';
import { useAdminLayout } from '~/composables/use_admin_layout';
import { useI18n } from 'vue-i18n';
import { reactive, watch } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import { urlFor } from '~/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import DeleteButton from '~/components/ui/DeleteButton.vue';
import { ArrowDown, ArrowUp, Check, Plus } from '@lucide/vue';

defineOptions({ layout: AdminLayout });

const LABEL_MAX = 80;

const { t } = useI18n();
const { pageTitle } = useAdminLayout();

const props = defineProps<{
    projectTypes: { id: string; label: string }[];
}>();

pageTitle.value = t('admin.projectTypes.title');

// Labels being edited, keyed by id; reset whenever the list comes back from the server
const labels = reactive<Record<string, string>>({});
watch(
    () => props.projectTypes,
    (projectTypes) => {
        for (const key of Object.keys(labels)) delete labels[key];
        for (const projectType of projectTypes) labels[projectType.id] = projectType.label;
    },
    { immediate: true }
);

const createForm = useForm({ label: '' });

function create() {
    createForm.post(urlFor('admin.projectTypes.store'), { preserveScroll: true, onSuccess: () => createForm.reset() });
}

function save(id: string) {
    router.put(urlFor('admin.projectTypes.update', { id }), { label: labels[id] }, { preserveScroll: true });
}

function move(id: string, direction: 'up' | 'down') {
    router.post(urlFor('admin.projectTypes.move', { id }), { direction }, { preserveScroll: true });
}

function destroy(id: string) {
    router.delete(urlFor('admin.projectTypes.destroy', { id }), { preserveScroll: true });
}
</script>

<template>
    <div class="space-y-4 max-w-3xl">
        <p class="text-sm text-muted-foreground">{{ t('admin.projectTypes.hint') }}</p>

        <ol v-if="projectTypes.length" class="rounded-md border divide-y list-none">
            <li v-for="(projectType, index) in projectTypes" :key="projectType.id" class="flex items-center gap-3 p-3">
                <div class="flex flex-col">
                    <Button variant="ghost" size="icon-sm" :disabled="index === 0" :aria-label="t('admin.projectTypes.moveUp')" @click="move(projectType.id, 'up')">
                        <ArrowUp class="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" :disabled="index === projectTypes.length - 1" :aria-label="t('admin.projectTypes.moveDown')" @click="move(projectType.id, 'down')">
                        <ArrowDown class="size-4" />
                    </Button>
                </div>
                <form class="flex flex-1 items-center gap-2" @submit.prevent="save(projectType.id)">
                    <Input :id="`label-${projectType.id}`" v-model="labels[projectType.id]" type="text" :max="LABEL_MAX" />
                    <Button type="submit" size="sm" class="gap-1 shrink-0" :disabled="!labels[projectType.id]?.trim() || labels[projectType.id] === projectType.label">
                        <Check class="size-4" />
                        {{ t('admin.projectTypes.save') }}
                    </Button>
                </form>
                <DeleteButton
                    :label="t('admin.projectTypes.delete.label')"
                    :title="t('admin.projectTypes.delete.title', { label: projectType.label })"
                    :description="t('admin.projectTypes.delete.description')"
                    :cancel-label="t('admin.projectTypes.delete.cancel')"
                    :confirm-label="t('admin.projectTypes.delete.confirm')"
                    @confirm="destroy(projectType.id)"
                />
            </li>
        </ol>
        <p v-else class="rounded-md border p-8 text-center text-sm text-muted-foreground">{{ t('admin.projectTypes.empty') }}</p>

        <form class="flex items-start gap-2 rounded-md border p-3" @submit.prevent="create">
            <div class="flex-1 space-y-1">
                <Input id="new-label" v-model="createForm.label" type="text" :max="LABEL_MAX" :placeholder="t('admin.projectTypes.newPlaceholder')" />
                <p v-if="createForm.errors.label" class="text-xs text-destructive">{{ createForm.errors.label }}</p>
            </div>
            <Button type="submit" class="gap-2 shrink-0" :disabled="createForm.processing || !createForm.label.trim()">
                <Plus class="size-4" />
                {{ t('admin.projectTypes.add') }}
            </Button>
        </form>
    </div>
</template>
