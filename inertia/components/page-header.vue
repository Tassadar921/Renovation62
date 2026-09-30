<script setup lang="ts">
defineProps<{
    label: string;
    title: string;
    description?: string;
    // Takes the full width of its container instead of 2/3 (when placed in a narrower column)
    fullWidth?: boolean;
}>();
</script>

<template>
    <header class="space-y-4" :class="{ 'lg:w-2/3': !fullWidth }">
        <p class="text-sm font-semibold uppercase tracking-wider text-orange-700 dark:text-secondary">{{ label }}</p>
        <h1 class="font-serif text-4xl sm:text-5xl font-semibold leading-tight text-primary text-balance">{{ title }}</h1>
        <p v-if="description" class="text-lg font-medium text-muted-foreground text-pretty">{{ description }}</p>
        <slot />
    </header>
</template>
