<script lang="ts">
	import supabase from '$lib/supabase';
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/auth';
	import { title } from '$lib/state';

	let tracks: any[] = [];

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

	$title = 'Home';
</script>

<Meta title={$title} />

<section class="main">
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
</section>

<style lang="sass">
@use '/src/variables.sass' as *
.card-container
	display: flex
	flex-wrap: wrap
	gap: 2rem
	padding: 0 3rem
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
