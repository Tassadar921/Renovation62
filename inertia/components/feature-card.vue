<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(
    defineProps<{
        icon?: Component;
        step?: number;
        title: string;
        description: string;
        headingTag?: 'h2' | 'h3';
    }>(),
    { headingTag: 'h3' }
);
</script>

<template>
    <div class="h-full rounded-xl border bg-card p-6 space-y-4 shadow-xs">
        <span v-if="step !== undefined" class="block font-serif text-5xl font-semibold leading-none text-orange-600 dark:text-secondary" aria-hidden="true">{{ step }}</span>
        <span v-else-if="icon" class="flex size-11 items-center justify-center rounded-full bg-secondary/15 text-secondary">
            <component :is="icon" class="size-5" aria-hidden="true" />
        </span>
        <component :is="headingTag" class="text-lg font-semibold leading-snug text-primary">{{ title }}</component>
        <p class="text-sm font-medium text-muted-foreground">{{ description }}</p>
    </div>
</template>
