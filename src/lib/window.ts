import { writable } from 'svelte/store';

export const windowWidth = writable(0);
export const windowHeight = writable(0);

export const mouseX = writable(0);
export const mouseY = writable(0);

export const scrollX = writable(0);
export const scrollY = writable(0);

export const isTouch = writable(false);

export const isMobile = writable(false);
