<script setup lang="ts">
import { usePage, router } from '@inertiajs/vue3';
import { urlFor } from '~/client';
import Theme from '~/partials/layout/theme.vue';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { CircleUser, LayoutDashboard, LogOut } from '@lucide/vue';
import { Link } from '@adonisjs/inertia/vue';
import type { Data } from '@generated/data';

const page = usePage<Data.SharedProps>();

const logout = () => {
    router.delete(urlFor('auth.logout'));
};
</script>

<template>
    <div class="flex gap-3 items-center">
        <Theme />
        <DropdownMenu v-if="page.props.user">
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" :aria-label="$t('layout.nav.account')">
                    <CircleUser class="size-5" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56" align="end">
                <DropdownMenuLabel class="font-normal">
                    <div class="text-sm text-muted-foreground">{{ page.props.user.email }}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem v-if="page.props.user.role === 'admin'" as-child class="cursor-pointer">
                        <Link route="admin.dashboard" class="gap-2">
                            <LayoutDashboard class="size-4" aria-hidden="true" />
                            {{ $t('admin.title') }}
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 cursor-pointer" @click="logout">
                    <LogOut class="size-4" aria-hidden="true" />
                    {{ $t('admin.layout.logout') }}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
