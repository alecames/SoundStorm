<script>
	// @ts-nocheck

	import { formatNumber, formatTime } from '$lib/utils';
	import { playing } from '$lib/state';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { user } from '$lib/auth';

	export let track = {
		id: 0,
		title: '',
		author: '',
		likes: 0,
		plays: 0,
		duration: 0
	};

	/**
	 * @type {string | any[]}
	 */
	let comments = [];
	let comment = '';
	let liked = 0;

	const submitComment = async (e) => {
		e.preventDefault();

		if (comment.length > 0) {
			const { data, error } = await supabase.from('comments').insert([
				{
					author: $user.username,
					content: comment,
					related_track: track.id,
					created_at: new Date().toISOString()
				}
			]);

			if (error) {
				console.error('Error submitting comment:', error);
				comment = '';
			} else {
				comment = '';
				comments = [...comments, data];
			}
		}
	};

	const likeTrack = async () => {
		liked = !liked ? 1 : 0;
		const { data, error } = await supabase
			.from('tracks')
			.update({ likes: track.likes + liked })
			.eq('id', track.id);

		if (error) {
			console.error('Error liking track:', error);
		} else {
			track = data;
		}
	};

	onMount(async () => {
		const { data, error } = await supabase
			.from('comments')
			.select('author, content, created_at')
			.eq('related_track', track.id);

		if (error) {
		} else {
			comments = data;
		}
	});
</script>

<div class="card">
	<div class="content">
		<div class="top-container">
			<div class="play-button">
				{#if true}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span on:click={() => ($playing = true)} class="material-symbols-outlined icon play-icon"
						>play_circle</span
					>
				{:else}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span on:click={() => ($playing = false)} class="material-symbols-outlined icon play-icon"
						>pause_circle</span
					>
				{/if}
			</div>
			<div>
				<h2 class={`title ${playing ? 'playing' : ''}`}>
					{track.author ? track.author : 'anonymous'} - {track.title}
				</h2>
			</div>
		</div>
		{#if track.description}
			<p class="desc">{track.description}</p>
		{/if}

		<form class="interactions" on:submit={submitComment}>
			<div class="comment-section">
				{#if comments && comments.length > 0}
					<hr class="track-divider" />
					<div class="comment-list">
						{#each comments as comment}
							<div class="comment" in:slide>
								<p class="comment-author">{comment.author}</p>
								<p class="comment-text">{comment.content}</p>
								<p class="comment-date">&nbsp;•&nbsp;{formatTime(comment.created_at)}</p>
							</div>
						{/each}
					</div>
				{:else}
					<p class="no-comments">No comments yet. Be the first to comment on this track!</p>
				{/if}

				<input
					name="comment"
					bind:value={comment}
					disabled={!$user || !$user.id}
					class="comment-textfield"
					type="text"
					autoCorrect="off"
					placeholder={$user && $user.id
						? 'Write a comment...'
						: 'You must be logged in to comment'}
				/>
			</div>
			<div class="stats">
				<div class="views">
					<span class="material-symbols-rounded icon">play_arrow</span>
					<span>{formatNumber(track.views)}</span>
				</div>
				<div class="likes" on:click={likeTrack} on:keydown>
					<span class={`material-symbols-rounded icon ${liked ? 'active' : ''}`}> favorite </span>
					<span>{formatNumber(track.likes)}</span>
				</div>
				<span class="material-symbols-rounded icon">repeat</span>
				<span class="material-symbols-rounded icon">share</span>
				<span class="material-symbols-rounded icon">more_vert</span>
			</div>
		</form>
	</div>
</div>

<style lang="sass">
@use '/src/variables.sass' as *

.card
	display: flex
	flex-flow: column
	justify-content: left
	align-items: center
	flex: 0 0 auto
	width: 100%
	padding: 1rem
	background-color: $primary
	border: 1px solid $border
	border-radius: 12px
	transition: background-color 0.3s $curve

	.top-container
		display: flex
		flex-flow: row wrap
		justify-content: left
		align-items: center
		gap: 2rem

		h2
			margin: 0.5rem 0 
			padding: 0

	.content
		width: 100%

		.title
			font-size: 1.5rem
			margin-bottom: 0.5rem
			padding: 0
			color: $accent

		.desc
			margin-bottom: 0.5rem
			color: $text

	.track-divider
		border: none
		margin: 1rem 0
		border-top: 1px solid $border

	.interactions
		display: flex
		gap: 1rem
		flex-flow: row wrap
		justify-content: space-between
		align-items: flex-end

		.comment-section
			display: flex
			flex-direction: column
			gap: 0.5rem
			flex: 1 1 50%

			p
				margin-bottom: 0
				padding-bottom: 0

		.stats
			display: flex
			gap: 1rem
			align-items: center
			margin-bottom: 0.25rem
			flex: 0.5

	.comment-list
		margin-bottom: 1rem
		display: flex
		flex-direction: column

	.no-comments
		color: fade-out($text,0.4)

	.comment
		padding: 3px 10px
		margin: 0
		background: none
		display: flex
		flex-direction: row
		justify-content: left
		align-items: center
		border-radius: $radius
		gap: 0.5rem

		&-author
			color: $accent-lighter
			font-weight: 600

		p
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis

		p:nth-child(3)
			flex:1
			font-size: 0.8rem
			opacity: 0.5

		&:hover
			background: mix($primary, $invert, 90%)

		p
			margin: 0
			padding: 0

	.comment-textfield
		color: $text
		display: flex
		background: $background
		padding: 1rem
		border-radius: $radius
		flex-direction: row
		justify-content: left
		align-items: center
		outline: none
		border: 1px solid $border

		&::disabled
			background: darken($background, 50%)
			color: darken($text, 50%)
			border: 1px solid darken($border, 50%)

	.likes
		display: flex
		flex-direction: row
		gap: 0.5rem
		align-items: center
		padding: 0.5rem
		border-radius: $radius
		transition: all 0.3s $curve

		&:hover
			background: $hover-accent

		&:active
			background: $click-accent

	.views
		display: flex
		flex-direction: row
		gap: 0.5rem
		align-items: center
		padding: 0.5rem

	&:hover
		background-color: $secondary

	&:hover .comment-textfield
		background-color: $primary

	.like-thumb
		font-size: 1rem
		color: $text

	.like-container
		display: flex
		flex-direction: row
		align-items: center
		justify-content: center
		gap: 0.5rem

.play-icon
	font-size: 3rem
	&:active
		scale: 1

.playing
	color: $accent-light
</style>
