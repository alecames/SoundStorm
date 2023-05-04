<script lang="ts">
	import { fade } from 'svelte/transition';
	import { user, signOut, changeUsername, changeName } from '$lib/auth';
	import { title } from '$lib/state';
	import Meta from '$lib/components/Meta.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	$title = 'My Account';

	let username = '';
	let name = '';

	let fetched = false;

	$: if ($user && $user.id && !fetched) {
		username = $user.username;
		name = $user.name;
		fetched = true;
	}

	const response = writable({});

	const handleUsernameChange = async () => {
		const result = await changeUsername($user.id, username);
		response.set(result);
		if (result.type == 'success') {
			$user.username = username;
		}
	};

	const handleDisplayNameChange = async () => {
		const result = await changeName($user.id, name);
		response.set(result);
		if (result.type == 'success') {
			$user.name = name;
		}
	};
</script>

<Meta title={$title} />

<section class="main">
	{#if $user && $user.id}
		<div class="account-container">
			<div class="row">
				<p>
					Currently logged in as <span class="accent">{$user.email}</span>
				</p>
				<button on:click={signOut}>Sign Out</button>
			</div>
			{#key $response}
				<p in:fade class={$response.type}>
					{$response.message ? $response.message : ''}
				</p>
			{/key}
			<form on:submit|preventDefault={handleUsernameChange}>
				<div>
					<input type="text" bind:value={username} id="username" />
					<label for="username">Username</label>
				</div>
				<button type="submit">Change Username</button>
			</form>
			<gap-sm />
			<form on:submit|preventDefault={handleDisplayNameChange}>
				<div>
					<input type="text" bind:value={name} id="display-name" />
					<label for="display-name">Display Name</label>
				</div>
				<button type="submit">Change Display Name</button>
			</form>
		</div>
	{:else}
		<div class="account-container">
			<p>Not logged in</p>
		</div>
	{/if}
</section>

<style lang="sass">

.account-container
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	gap: 1rem
	padding: 1rem
	margin: 1rem
	border-radius: 1rem
	background: var(--background)
	box-shadow: var(--shadow)

	

	form
		width: 100%
		max-width: 40rem
		gap: 1rem

p
	font-size: clamp(1rem, 1vw, 1.5rem)


</style>
