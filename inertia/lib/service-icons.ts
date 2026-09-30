import type { Component } from 'vue';
import { Accessibility, BrickWall, DoorOpen, Droplets, Hammer, House, KeyRound, LayoutGrid, PaintRoller, Ruler, Wrench, Zap } from '@lucide/vue';

/**
 * Icons available for services, keyed like ServiceIconEnum on the server.
 */
export const serviceIcons: Record<string, Component> = {
    'brick-wall': BrickWall,
    zap: Zap,
    'paint-roller': PaintRoller,
    'layout-grid': LayoutGrid,
    hammer: Hammer,
    wrench: Wrench,
    ruler: Ruler,
    droplets: Droplets,
    'door-open': DoorOpen,
    house: House,
    accessibility: Accessibility,
    'key-round': KeyRound,
};

export const serviceIcon = (key: string): Component => serviceIcons[key] ?? Wrench;
