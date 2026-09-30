<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CircleMarker, LatLngBounds, Map as LeafletMap } from 'leaflet';
import type { Municipality } from '~/components/service-area-checker.vue';
import { BERCK, CALAIS, SAINT_OMER, SAMER, SERVICE_AREA } from '~/lib/service-area';
import 'leaflet/dist/leaflet.css';

const { t } = useI18n();

const props = defineProps<{
    // Municipality checked by the visitor, shown as a marker
    place?: Municipality | null;
}>();

// Same orange as the theme's secondary colour
const ORANGE = '#f58028';

const container = ref<HTMLDivElement | null>(null);
let map: LeafletMap | null = null;
let areaBounds: LatLngBounds | null = null;
let placeMarker: CircleMarker | null = null;
let leaflet: typeof import('leaflet') | null = null;

function showPlace(place: Municipality | null | undefined) {
    if (!map || !leaflet || !areaBounds) return;

    placeMarker?.remove();
    placeMarker = null;

    if (!place) {
        map.fitBounds(areaBounds, { padding: [32, 32] });
        return;
    }

    placeMarker = leaflet
        .circleMarker([place.lat, place.lon], { radius: 8, color: '#ffffff', weight: 3, fillColor: '#1a57ad', fillOpacity: 1 })
        .bindTooltip(place.name, { permanent: true, direction: 'top', offset: [0, -10], className: 'font-semibold' })
        .addTo(map);

    // Keep both the area and the municipality in view
    map.fitBounds(areaBounds.pad(0).extend([place.lat, place.lon]), { padding: [40, 40], maxZoom: 11 });
}

watch(() => props.place, showPlace);

onMounted(async () => {
    // Leaflet needs `window`, so it is only loaded in the browser (not during SSR)
    const L = await import('leaflet');
    leaflet = L;
    if (!container.value) return;

    map = L.map(container.value, { scrollWheelZoom: false });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const area = L.polygon(SERVICE_AREA, {
        color: ORANGE,
        weight: 2,
        fillColor: ORANGE,
        fillOpacity: 0.5,
    }).addTo(map);

    for (const [position, label] of [
        [CALAIS, 'Calais'],
        [SAINT_OMER, 'Saint-Omer'],
        [BERCK, 'Berck'],
    ] as const) {
        L.circleMarker(position, { radius: 5, color: ORANGE, weight: 2, fillColor: '#ffffff', fillOpacity: 1 })
            .bindTooltip(label, { permanent: true, direction: 'top', offset: [0, -6] })
            .addTo(map);
    }

    L.circleMarker(SAMER, { radius: 7, color: '#1a57ad', weight: 3, fillColor: '#ffffff', fillOpacity: 1 })
        .bindTooltip(t('pages.serviceArea.map.headquarters'), { permanent: true, direction: 'right', offset: [8, 0] })
        .addTo(map);

    areaBounds = area.getBounds();
    map.fitBounds(areaBounds, { padding: [32, 32] });
    showPlace(props.place);
});

onBeforeUnmount(() => {
    map?.remove();
    map = null;
});
</script>

<template>
    <!-- isolate keeps Leaflet's high z-indexes below the fixed navbar -->
    <div class="isolate overflow-hidden rounded-2xl border shadow-xs">
        <div ref="container" class="h-[26rem] sm:h-[32rem] w-full bg-muted" role="img" :aria-label="t('pages.serviceArea.map.label')"></div>
    </div>
</template>
