import { writable } from 'svelte/store';

//export const bookings = writable([{id:99, status:"BOOKED", bg:"bg-danger"}]);
export const bookings = writable(new Set([]));