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
	import { user, getSessionUser } from '$lib/auth';
	import { onMount } from 'svelte';
	import { title } from '$lib/state';
	import { slide } from 'svelte/transition';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '/src/global.sass';
	import PageTransition from '$lib/components/PageTransition.svelte';

	let scrolled = false;
	$: scrolled = $scrollY > 30;

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

<main>
	<Sidebar />
	<div class={`header ${scrolled ? 'scrolled' : ''}`}>
		{#key $title}
			<h1 in:slide={{ duration: 250, delay: 251 }} out:slide={{ duration: 250 }}>
				{$title}
			</h1>
		{/key}
	</div>
	{#key $title}
		<PageTransition>
			<slot />
		</PageTransition>
	{/key}
</main>

<style lang="sass">
@use '/src/variables.sass' as *
main 
	width: 100%
</style>
