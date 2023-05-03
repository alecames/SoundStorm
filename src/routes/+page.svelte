<script lang="ts">
	import { scrollY } from '$lib/window';
	import supabase from '$lib/supabase';
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/auth';

	let tracks: any[] = [];

	let scrolled = false;
	$: scrolled = $scrollY > 30;

	function addTrack() {
		console.log('add track');
	}

	onMount(async () => {
		const { data, error } = await supabase
			.from('tracks')
			.select('*')
			.order('created_at', { ascending: false });
		if (error) {
		} else {
			tracks = data;
		}
	});
</script>

<Meta title="Home • SoundStorm" />

<div class="main">
	<Sidebar />
	<div class={`header ${scrolled ? 'scrolled' : ''}`}>
		<h1>Home</h1>
	</div>
	<div class="card-container">
		{#each tracks as track}
			<Card {track} />
		{/each}
	</div>
	{#if $user && $user.id}
		<button class="fab" on:click={addTrack}>
			<span class="material-symbols-outlined icon">add</span>
		</button>
	{/if}
</div>

<style lang="sass">
@use '/src/variables.sass' as *
.card-container
	display: flex
	flex-wrap: wrap
	margin-top: 5rem
	gap: 2rem
	padding: 3rem
	justify-content: center

	@media (max-width: 768px)
		padding: 1rem

.fab
	position: fixed
	bottom: 2rem
	right: 2rem
	width: 4rem
	height: 4rem
	border-radius: 50%
</style>
