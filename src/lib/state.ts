import { writable } from 'svelte/store';

export const playing = writable(false);

export const showLoginModal = writable(false);

export const title = writable('');
