<script>
	export let title = 'SoundStorm';
	export let desc = 'Share and stream your music';
	export let image = 'meta.png';

	if (title == 'SoundStorm') {
		title = 'SoundStorm • Share and stream your music';
	} else {
		title = title + ' • SoundStorm';
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:image" content={image} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:card" content={image} />
</svelte:head>
