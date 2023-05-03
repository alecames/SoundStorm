<script lang="ts">
	import {
		windowWidth,
		windowHeight,
		mouseX,
		mouseY,
		scrollX,
		scrollY,
		isMobile,
		isTouch
	} from '$lib/window';
	import '/src/global.sass';
	import { user, getSessionUser } from '$lib/auth';
	import { onMount } from 'svelte';

	$: $isMobile = $windowWidth < 768;

	onMount(async () => {
		await getSessionUser();
	});
</script>

<svelte:window
	bind:innerWidth={$windowWidth}
	bind:innerHeight={$windowHeight}
	bind:scrollX={$scrollX}
	bind:scrollY={$scrollY}
	on:mousemove={(e) => {
		$mouseX = e.clientX;
		$mouseY = e.clientY;
	}}
	on:touchmove={(e) => {
		$mouseX = e.touches[0].clientX;
		$mouseY = e.touches[0].clientY;
	}}
/>

<main class="light">
	<slot />
</main>

<style lang="sass">
@use '/src/variables.sass' as *
main 
	width: 100%
</style>
