<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import { Form } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

const { t } = useI18n();

const form = useForm({
    email: '',
    password: '',
});

const handleSubmit = () => {
    form.post('/login');
};
</script>

<template>
    <Head :title="$t('auth.login.title')">
        <meta name="robots" content="noindex" />
    </Head>
    <div class="min-h-screen flex items-center justify-center">
        <Form :is-loading="form.processing" class="relative flex items-center justify-center border rounded-lg px-15 py-8 m-auto" @submit="handleSubmit">
            <div class="flex flex-col gap-8">
                <h1 class="text-2xl font-semibold">{{ $t('auth.login.title') }}</h1>
                <p class="text-sm text-muted-foreground">{{ $t('auth.login.subtitle') }}</p>

                <div class="mt-3 flex flex-col gap-8">
                    <Input v-model="form.email" name="email" type="email" :label="t('auth.login.email')" :error="form.errors.email" autocomplete="username" required />
                    <Input v-model="form.password" name="password" type="password" :label="t('auth.login.password')" :error="form.errors.password" autocomplete="password" required />

                    <a href="/forgot-password" class="text-xs text-muted-foreground underline-offset-4 hover:underline -mt-4 self-end">
                        {{ $t('auth.login.forgotPassword') }}
                    </a>

                    <Button type="submit" :disabled="form.processing">
                        {{ $t('auth.login.submit') }}
                    </Button>
                </div>
            </div>
        </Form>
    </div>
</template>
