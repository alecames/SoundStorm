<script lang="ts">
	import { slide } from 'svelte/transition';
	import { user, signInWithGoogle, logout } from '$lib/auth';

	const sidebarItems = [
		{
			label: 'Home',
			href: '/',
			subItems: []
		},
		{
			label: 'Explore',
			href: '/explore',
			subItems: []
		},
		{
			label: 'Library',
			href: '/library',
			subItems: []
		},
		{
			label: 'Liked',
			href: '/liked',
			subItems: []
		},
		{
			label: 'Settings',
			href: '/settings',
			subItems: []
		}
	];
</script>

<div class="sidebar">
	<a href="/" class="logo-container" data-home="true">
		<img src="icons/dark-logo.svg" alt="logo" class="logo" />
	</a>
	<hr class="logo-line" />
	<div>
		{#each sidebarItems as item}
			{#if item.subItems.length > 0}
				{#each item.subItems as subItem}
					<div class="sidebar-item button">
						<a href={item.href}>{item.label}</a>
					</div>
				{/each}
			{:else}
				<div class="sidebar-item button">
					<a href={item.href}>{item.label}</a>
				</div>
			{/if}
		{/each}
		<hr class="logo-line" />
		<div class="sidebar-item">
			{#if $user && $user.email}
				<span class="accent" style="display:flex;align-items:center;gap:0.5rem" in:slide>
					<span class="material-symbols-rounded">account_circle</span>
					{$user.username}
				</span>
				<button on:click={logout}> Log Out </button>
			{:else}
				<button on:click={signInWithGoogle}> Log In </button>
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
	flex-direction: column
	padding: 20px
	border-right: 1px solid $border
	transform: translateX(0)
	transition: transform 0.5s $curve

	@media (max-width: 768px)
		transform: translateX(-100%)

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
			padding: 7px
			width: 100%
			height: 100%

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
	transition: scale 0.5s $curve

	&:hover 
		scale: 1.1

.logo-line
	border: none
	width: 100%
	border-top: 1px solid $border
	margin: 20px 0

</style>
