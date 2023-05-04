<script lang="ts">
	import { showLoginModal } from '$lib/state';
	import { slide } from 'svelte/transition';
	import Modal from '$lib/components/SignInModal.svelte';
	import { user, signOut } from '$lib/auth';
	import { page } from '$app/stores';

	const sidebarItems = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Explore',
			href: '/explore'
		},
		{
			label: 'My Profile',
			href: '/profile'
		},
		{
			label: 'Liked',
			href: '/liked'
		},
		{
			label: 'Settings',
			href: '/settings'
		}
	];
</script>

<Modal />

<div class="sidebar">
	<a href="/" class="logo-container" data-home="true">
		<img src="icons/dark-logo.svg" alt="logo" class="logo" />
	</a>
	<hr class="logo-line" />
	<div>
		{#each sidebarItems as item}
			<div class="sidebar-item button">
				<a href={item.href} aria-current={$page.url.pathname === item.href ? 'page' : undefined}
					>{item.label}</a
				>
			</div>
		{/each}
		<hr class="logo-line" />
		<div class="sidebar-item">
			{#if $user && $user.aud}
				<div class="sidebar-item button">
					<a href="/account" aria-current={$page.url.pathname === '/account' ? 'page' : undefined}>
						<span class="accent" style="display:flex;align-items:center;gap:0.5rem" in:slide>
							<span class="material-symbols-rounded">account_circle</span>
							{$user.username}
						</span>
					</a>
				</div>
				<button on:click={signOut}
					>Sign Out<span class="material-symbols-rounded">logout</span></button
				>
			{:else}
				<button on:click={() => ($showLoginModal = true)}
					>Sign In<span class="material-symbols-rounded">login</span>
				</button>
			{/if}
		</div>
	</div>
</div>

<style lang="sass">
@use '/src/variables.sass' as *
.sidebar
	z-index: 2
	width: 200px
	height: 100%
	position: fixed
	left: 0
	top: 0
	background-color: $background
	display: flex
	overflow: hidden
	white-space: nowrap
	text-overflow: ellipsis
	flex-direction: column
	padding: 20px
	border-right: 1px solid $border
	transform: translateX(0)
	transition: transform 0.5s $curve

	@media (max-width: 768px)
		transform: translateX(-100%)


	button 
		display: flex
		align-items: center
		width: 100%
		justify-content: center
		gap: 0.5rem
		
		span
			font-size: 1rem

	&-item
		margin-bottom: 10px
		border-radius: $radius
		display: flex
		align-items: center
		justify-content: center
		flex-flow: row wrap
		gap: 1rem
		transition: background-color 0.5s $curve
	
		&:last-child
			padding: 10px

		a
			display: flex
			align-items: center
			justify-content: left
			border-radius: $radius
			padding: 7px
			width: 100%
			height: 100%
			transition: all 0.5s $curve

			&[aria-current="page"]
				color: $accent

		&.button:hover
			background-color: $hover-accent

		&.button:active
			background-color: $click-accent


.logo-container
	padding: 7px
	display: flex
	justify-content: center
	align-items: center
	scale: 1
	transition: filter 0.5s $curve

	&:hover 
		filter: brightness(0) invert(81%) sepia(9%) saturate(2107%) hue-rotate(109deg) brightness(92%) contrast(115%)

.logo-line
	border: none
	width: 100%
	border-top: 1px solid $border
	margin: 20px 0


</style>
