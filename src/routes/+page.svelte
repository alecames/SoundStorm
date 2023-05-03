<script>
	import supabase from '$lib/supabase';
	import Card from '$lib/Card.svelte';
	import Meta from '$lib/Meta.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import { onMount } from 'svelte';

	let tracks = [];

	onMount(async () => {
		const { data, error } = await supabase.from('tracks').select('*');
		if (error) {
		} else {
			tracks = data;
		}
	});
</script>

<Meta />

<div class="main">
	<Sidebar />
	<div class="header">
		<h1>Home</h1>
	</div>
	<div class="card-container">
		{#each tracks as track}
			<Card {track} />
		{/each}
	</div>
</div>

<style lang="sass">
@use '/src/variables.sass' as *
.card-container
	width: 100%
	display: flex
	flex-wrap: wrap
	margin-top: 5rem
	gap: 2rem
	padding: 3rem
	justify-content: center
</style>
