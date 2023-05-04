<script lang="ts">
	import { title } from '$lib/state';
	import Meta from '$lib/components/Meta.svelte';
	$title = 'My Profile';
</script>

<Meta title={$title} />
