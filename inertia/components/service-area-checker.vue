<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { urlFor } from '~/client';
import { CircleCheck, CircleX, LoaderCircle, Search } from '@lucide/vue';
import { MAX_DISTANCE_KM, distanceToServiceArea } from '~/lib/service-area';

export type Municipality = { name: string; postcode: string; department: string; lat: number; lon: number };

const emit = defineEmits<{
    // Municipality to show on the map, or null when it is too far (or the search is cleared)
    place: [municipality: Municipality | null];
}>();

const { t } = useI18n();

const query = ref('');
const suggestions = ref<Municipality[]>([]);
const isLoading = ref(false);
const isOpen = ref(false);
const hasError = ref(false);
const notFound = ref(false);
const result = ref<{ municipality: Municipality; distance: number } | null>(null);

const isReachable = computed(() => !!result.value && result.value.distance <= MAX_DISTANCE_KM);

let debounce: ReturnType<typeof setTimeout> | undefined;
let lastRequest = 0;

/**
 * Fetches matching municipalities. Returns null when the answer is outdated (a newer search was started) or failed.
 */
async function search(value: string, { openSuggestions = true } = {}): Promise<Municipality[] | null> {
    const requestId = ++lastRequest;
    isLoading.value = true;
    hasError.value = false;

    try {
        const response = await fetch(`${urlFor('service.area.municipalities')}?${new URLSearchParams({ q: value })}`, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const { municipalities } = (await response.json()) as { municipalities: Municipality[] };
        if (requestId !== lastRequest) return null;
        suggestions.value = municipalities;
        isOpen.value = openSuggestions;
        return municipalities;
    } catch {
        if (requestId === lastRequest) hasError.value = true;
        return null;
    } finally {
        if (requestId === lastRequest) isLoading.value = false;
    }
}

// "Saint-Omer", "saint omer" and "St Omer" compare equal
const normalize = (value: string): string =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\bst\b/g, 'saint')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

const byDistance = (municipalities: Municipality[]): { municipality: Municipality; distance: number }[] =>
    municipalities.map((municipality) => ({ municipality, distance: distanceToServiceArea([municipality.lat, municipality.lon]) })).sort((a, b) => a.distance - b.distance);

/**
 * Picks what the visitor most likely meant, in this order:
 * exact name within reach, name starting with the text within reach, exact name, name starting with the text, geocoder's best score.
 * "Lille" gives Lille (not Lillers), "Montreuil" gives Montreuil-sur-Mer, "Boulogne" gives Boulogne-sur-Mer.
 */
const bestMatch = (text: string, municipalities: Municipality[]): Municipality | undefined => {
    const wanted = normalize(text);
    const exact = byDistance(municipalities.filter((municipality) => normalize(municipality.name) === wanted));
    const prefix = byDistance(municipalities.filter((municipality) => normalize(municipality.name).startsWith(wanted)));
    const withinReach = (candidates: typeof exact) => candidates.find(({ distance }) => distance <= MAX_DISTANCE_KM)?.municipality;

    return withinReach(exact) ?? withinReach(prefix) ?? exact[0]?.municipality ?? prefix[0]?.municipality ?? municipalities[0];
};

watch(query, (value) => {
    clearTimeout(debounce);
    const trimmed = value.trim();
    if (trimmed.length < 2) {
        suggestions.value = [];
        isOpen.value = false;
        return;
    }
    debounce = setTimeout(() => search(trimmed), 250);
});

function select(municipality: Municipality) {
    notFound.value = false;
    const distance = distanceToServiceArea([municipality.lat, municipality.lon]);
    result.value = { municipality, distance };
    query.value = municipality.name;
    // Setting the query triggers a new search, cancel it
    clearTimeout(debounce);
    isOpen.value = false;
    emit('place', distance <= MAX_DISTANCE_KM ? municipality : null);
}

/**
 * Enter validates the text as typed: searches it right away (without waiting for the suggestions) and keeps the best match.
 */
async function validate() {
    const text = query.value.trim();
    if (text.length < 2) return;

    clearTimeout(debounce);
    notFound.value = false;

    const municipalities = await search(text, { openSuggestions: false });
    if (!municipalities) return;

    const municipality = bestMatch(text, municipalities);
    if (municipality) {
        select(municipality);
    } else {
        result.value = null;
        notFound.value = true;
        emit('place', null);
    }
}
</script>

<template>
    <div class="space-y-3">
        <div class="relative" role="search">
            <label for="municipality" class="block text-sm font-semibold text-foreground mb-2">{{ t('pages.serviceArea.checker.label') }}</label>
            <div class="relative">
                <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                    id="municipality"
                    v-model="query"
                    type="text"
                    autocomplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls="municipality-suggestions"
                    :aria-expanded="isOpen && suggestions.length > 0"
                    :placeholder="t('pages.serviceArea.checker.placeholder')"
                    maxlength="100"
                    class="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-10 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    @focus="isOpen = suggestions.length > 0"
                    @keydown.enter.prevent="validate"
                    @keydown.escape="isOpen = false"
                />
                <LoaderCircle v-if="isLoading" class="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" aria-hidden="true" />
            </div>

            <ul v-if="isOpen && suggestions.length" id="municipality-suggestions" role="listbox" class="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border bg-popover shadow-lg list-none">
                <li v-for="municipality in suggestions" :key="`${municipality.name}-${municipality.postcode}`" role="option" :aria-selected="false">
                    <button
                        type="button"
                        class="flex w-full items-baseline justify-between gap-4 px-4 py-2.5 text-left hover:bg-accent focus-visible:bg-accent outline-none"
                        @click="select(municipality)"
                    >
                        <span class="font-medium text-foreground">{{ municipality.name }}</span>
                        <span class="text-xs text-muted-foreground shrink-0">{{ municipality.postcode }} · {{ municipality.department }}</span>
                    </button>
                </li>
            </ul>
            <p v-else-if="isOpen && !isLoading && !hasError" class="absolute z-20 mt-2 w-full rounded-xl border bg-popover px-4 py-3 text-sm text-muted-foreground shadow-lg">
                {{ t('pages.serviceArea.checker.noResult') }}
            </p>
        </div>

        <p v-if="notFound" role="status" class="text-sm text-destructive">{{ t('pages.serviceArea.checker.notFound', { query }) }}</p>
        <p v-if="hasError" class="text-sm text-destructive">{{ t('pages.serviceArea.checker.error') }}</p>

        <p
            v-if="result"
            role="status"
            class="flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium"
            :class="isReachable ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'"
        >
            <CircleCheck v-if="isReachable" class="size-5 shrink-0" aria-hidden="true" />
            <CircleX v-else class="size-5 shrink-0" aria-hidden="true" />
            <span v-if="isReachable && result.distance === 0">{{ t('pages.serviceArea.checker.inside', { name: result.municipality.name }) }}</span>
            <span v-else-if="isReachable">{{ t('pages.serviceArea.checker.near', { name: result.municipality.name, distance: Math.round(result.distance) }) }}</span>
            <span v-else>{{ t('pages.serviceArea.checker.tooFar', { name: result.municipality.name, distance: Math.round(result.distance) }) }}</span>
        </p>
    </div>
</template>
