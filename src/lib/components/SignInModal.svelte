<script lang="ts">
	import { signInWithGoogle, signInWithMagicLink } from '$lib/auth';
	import { showLoginModal } from '$lib/state';
	import { writable } from 'svelte/store';
	import { slide, fade } from 'svelte/transition';

	let dialog: HTMLDialogElement;
	let emailField = false;
	let email = '';
	const response = writable('');

	$: if (dialog && $showLoginModal) {
		dialog.showModal();
	}

	const showEmailField = () => {
		emailField = true;
	};

	const signIn = async () => {
		const res = await signInWithMagicLink(email);
		response.set(res);
	};

	const closeDialog = () => {
		dialog.close();
		emailField = false;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:click|self={closeDialog}
	on:close|stopPropagation={() => ($showLoginModal = false)}
>
	<div on:click|stopPropagation>
		<h2>Sign In</h2>
		<hr />
		<div class="content">
			{#if emailField}
				<form class="email-field" on:submit|preventDefault={signIn}>
					{#key $response}
						<p in:fade class={$response.type}>
							{$response.message ? $response.message : ''}
						</p>
					{/key}
					<input in:slide id="email" type="email" bind:value={email} data-value={email} />
					<label for="email">Email</label>
					<button in:slide on:click={signIn}>Sign in</button>
					<button in:slide class="alt" on:click={() => (emailField = !emailField)}>Back</button>
				</form>
			{:else}
				<button on:click={signInWithGoogle}>Sign in with Google</button>
				<button on:click={showEmailField}>Sign in with Email</button>
				<button class="alt" on:click={closeDialog}>Cancel</button>
			{/if}
		</div>
	</div>
</dialog>

<style lang="sass">
@use 'src/variables' as *
dialog 
	width: 30rem
	max-width: 50rem
	background: $background
	color: $text
	border-radius: $radius * 2
	border: 1px solid $border
	padding: 0

dialog::backdrop 
	background: rgba(0, 0, 0, 0.3)
	backdrop-filter: blur(5px)
	transition: all 0.5s $curve

h2, p
	text-align: center

.email-field
	padding: 1rem

button 
	width:100%
	margin: 0.5rem 0
	padding: 1rem 0

hr 
	border: none
	border-top: 1px solid $text
	opacity: 0.33

dialog > div 
	padding: 1.5em

.content 
	max-height: 30rem
	// padding: 1rem
	overflow-y: scroll

dialog[open] 
	animation: zoom 0.5s $curve

@keyframes zoom 
	from 
		transform: scale(0.8)
	
	to 
		transform: scale(1)

dialog[open]::backdrop 
	animation: fade 0.5s $curve

@keyframes fade 
	from 
		opacity: 0
	
	to 
		opacity: 1

.btn 
	display: flex
	justify-content: center

</style>
