<script setup lang="ts">
import { useTheme } from '~/lib/useTheme';
import { useI18n } from 'vue-i18n';
import { Moon, Sun } from '@lucide/vue';

const { theme, toggleTheme } = useTheme();
const { t } = useI18n();
</script>

<template>
    <button
        type="button"
        role="switch"
        :aria-checked="theme === 'dark'"
        :aria-label="t('layout.theme.label')"
        :title="theme === 'dark' ? t('layout.theme.enableLight') : t('layout.theme.enableDark')"
        class="relative inline-flex h-8 w-15 shrink-0 items-center rounded-full border bg-muted transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        @click="toggleTheme"
    >
        <Sun class="absolute left-2 size-3.5 text-secondary" aria-hidden="true" />
        <Moon class="absolute right-2 size-3.5 text-muted-foreground" aria-hidden="true" />
        <span
            class="relative z-10 flex size-6 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border transition-transform duration-300"
            :class="theme === 'dark' ? 'translate-x-8' : 'translate-x-0.5'"
        >
            <Moon v-if="theme === 'dark'" class="size-3.5 text-primary" aria-hidden="true" />
            <Sun v-else class="size-3.5 text-secondary" aria-hidden="true" />
        </span>
    </button>
</template>
