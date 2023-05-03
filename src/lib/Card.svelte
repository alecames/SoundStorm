<script>
	import { formatNumber, formatTime } from '$lib/utils';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';

	export let track = {
		id: 0,
		title: 'Track Title',
		author: 'Track Author',
		description: 'Track Description',
		likes: 0,
		views: 0
	};

	const playing = false;
	let comments = [];
	let comment = '';

	const submitComment = async (e) => {
		e.preventDefault();

		if (comment.length > 0) {
			const { data, error } = await supabase.from('comments').insert([
				{
					author: 'alec', // Replace with the current user's username
					content: comment,
					related_track: track.id, // Replace with the current track's ID
					created_at: new Date().toISOString()
				}
			]);

			if (error) {
				console.error('Error submitting comment:', error);
			} else {
				comment = '';
				comments = [...comments, data[0]];
			}
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
	<div class="play-button">
		<span class="material-symbols-rounded icon play-icon">play_circle</span>
	</div>
	<div class="content">
		<h2 class={`title ${playing ? 'playing' : ''}`}>
			{track.author ? track.author : 'anonymous'} - {track.title}
		</h2>
		<p class="desc">{track.description}</p>

		<form class="interactions" on:submit={submitComment}>
			<div class="comment-section">
				<p>Comments</p>
				{#if comments.length > 0}
					<hr class="track-divider" />
					<div class="comment-list">
						{#each comments as comment}
							<div class="comment">
								<p class="comment-author">{comment.author}</p>
								<p class="comment-text">{comment.content}</p>
								<p class="comment-date">&nbsp;•&nbsp;{formatTime(comment.created_at)}</p>
							</div>
						{/each}
					</div>
				{/if}

				<input
					name="comment"
					bind:value={comment}
					class="comment-textfield"
					type="text"
					autoCorrect="off"
					placeholder="Write a comment..."
				/>
			</div>
			<div class="stats">
				<div class="views">
					<span class="material-symbols-rounded icon">visibility</span>
					<span>{formatNumber(track.views)}</span>
				</div>
				<div class="likes">
					<span>{formatNumber(track.likes)}</span>
					<span class={`material-symbols-rounded icon ${track.likes > 0 ? 'active' : ''}`}>
						favorite
					</span>
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
	flex-direction: row
	justify-content: left
	gap: 2rem
	align-items: center
	flex: 0 0 auto
	width: 100%
	padding: 1rem
	background-color: $primary
	border: 1px solid $border
	border-radius: 12px
	transition: background-color 0.3s $curve

	.content
		width: 100%

		.title
			font-size: 1.5rem
			margin-bottom: 0.5rem
			padding: 0

		.desc
			margin-bottom: 0.5rem
			color: $text

	.track-divider
		border: none
		margin: 1rem 0
		border-top: 1px solid $border

	.interactions
		width: 100%
		display: flex
		gap: 1rem
		flex-flow: row wrap
		justify-content: space-between
		align-items: flex-end

		.comment-section
			display: flex
			flex-direction: column
			flex: 1 1 50%

			p
				margin-bottom: 0
				padding-bottom: 0

		.stats
			display: flex
			gap: 1rem
			align-items: center
			margin-bottom: 0.25rem
			flex: .5

	.comment-list
		margin-bottom: 1rem
		display: flex
		flex-direction: column

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

		// second child
		p:nth-child(3)
			flex:1
			font-size: 0.8rem
			opacity: 0.5

		&:hover

			background: mix($primary, transparent, 50%)
			p
				color: white

		p
			margin: 0
			padding: 0

	.comment-textfield
		color: $text
		display: flex
		width: calc(100% - 2rem)
		background: $background
		padding: 1rem
		border-radius: $radius
		flex-direction: row
		justify-content: left
		align-items: center
		outline: none
		border: 1px solid $border

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

.play-icon
	font-size: 3rem
	&:active
		scale: 1

.play-button
	align-self: start
	padding-top: 1rem

.playing
	color: $accent-light

.like-thumb
	font-size: 1rem
	color: $text

.like-container
	display: flex
	flex-direction: row
	align-items: center
	justify-content: center
	gap: 0.5rem
</style>
