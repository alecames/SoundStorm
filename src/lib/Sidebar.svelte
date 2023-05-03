<script lang="ts">
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
			label: 'Playlists',
			href: '/playlists',
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
					<div class="sidebar-item">
						<a href={item.href}>{item.label}</a>
					</div>
				{/each}
			{:else}
				<div class="sidebar-item">
					<a href={item.href}>{item.label}</a>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="sass">
@use '/src/variables.sass' as v
.sidebar
	z-index: 2
	width: 200px
	height: 100%
	position: fixed
	left: 0
	top: 0
	background-color: v.$background
	display: flex
	flex-direction: column
	padding: 20px
	border-right: 1px solid v.$border
	transform: translateX(0)
	transition: transform 0.5s v.$curve

	@media (max-width: 768px)
		transform: translateX(-100%)

	&-item
		padding: 10px
		margin-bottom: 10px
		cursor: pointer
		border-radius: v.$radius
		transition: background-color 0.5s v.$curve

	&-item:hover
		background-color: v.$hover-accent

	&-item:active
		background-color: v.$click-accent

	&-subitem
		padding: 5px 10px 5px 30px
		margin-bottom: v.$radius
		cursor: pointer
		transition: background-color 0.2s v.$curve
		border-radius: v.$radius

	&-subitem:hover
		background-color: v.$hover-accent

	&-subitem:active
		background-color: v.$click-accent

</style>
