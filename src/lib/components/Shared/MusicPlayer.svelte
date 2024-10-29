<script lang="ts">
	import { AudioLines } from 'lucide-svelte'; // For the music icon
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import type { Artist, CurrentlyPlaying } from '$lib/types/Spotify';
	export let githubUsername;
	let currentlyPlaying: CurrentlyPlaying | null = null;
	let isListening = false;
	// Fetch the currently playing song on mount
	onMount(async () => {
		try {
			const response = await fetch(`/api/spotify/currently-listening/${githubUsername}`);
			if (response.ok) {
				const data = await response.json();
				if (data?.item) {
					isListening = true;
					currentlyPlaying = {
						song: data.item.name,
						artist: data.item.artists.map((artist: Artist) => artist.name).join(', '),
						songUrl: data.item.external_urls.spotify, // Link to song on Spotify
						artistUrl: data.item.artists[0].external_urls.spotify, // Link to the first artist on Spotify
						albumImageUrl: data.item.album.images[0]?.url ?? '' // Album image URL
					};
				} else {
					isListening = false;
				}
			}
		} catch (error) {
			console.error('Error fetching currently playing song:', error);
		}
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>
			<div class="flex flex-row items-center">
				<AudioLines class="mr-2 text-green-700" /> Now listening to..
			</div>
		</Card.Title>
	</Card.Header>

	<Card.Content>
		{#if isListening}
			<div class="flex flex-row items-center">
				<!-- Album Image -->
				{#if currentlyPlaying?.albumImageUrl}
					<img
						src={currentlyPlaying.albumImageUrl}
						alt="Album Art"
						class="mr-4 h-12 w-12 rounded-lg"
					/>
				{/if}

				<div class="flex flex-col">
					<!-- Song and Artist links -->
					<a
						href={currentlyPlaying?.songUrl}
						target="_blank"
						class="font-semibold hover:cursor-pointer hover:underline"
					>
						{currentlyPlaying?.song}
					</a>
					<a
						href={currentlyPlaying?.artistUrl}
						target="_blank"
						class=" text-sm hover:cursor-pointer hover:underline"
					>
						by {currentlyPlaying?.artist}
					</a>
				</div>
			</div>
		{:else}
			<div class="flex items-center">
				<p>N/A</p>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
