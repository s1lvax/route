<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import FormCardHeader from '$lib/components/MyProfile/FormCardHeader.svelte';
	import LinkForm from '$lib/components/MyProfile/LinkForm.svelte';
	import UserLinks from '$lib/components/MyProfile/UserLinks.svelte';
	import ImportFromGithub from '$lib/components/MyProfile/ImportFromGithub.svelte';
	import type { PageData } from '../$types';
	import { AudioLines } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import MusicPlayer from '$lib/components/Shared/MusicPlayer.svelte';

	export let data: PageData;
</script>

<h1
	class="mb-5 flex flex-row items-center space-x-2 text-2xl font-bold text-muted-foreground md:mb-10 md:text-6xl"
>
	Integrations
</h1>

<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
	<div class="custom-links">
		<Card.Root class="max-h-[300px] overflow-y-auto xl:col-span-2">
			<FormCardHeader
				description="The links visible on your profile. You can drag links around to modify the order"
				title="Links"
			>
				<div class="flex flex-row items-stretch gap-4">
					<LinkForm data={data.form} linksLength={data.links.length} links={data.links} />
					<ImportFromGithub {data} />
				</div>
			</FormCardHeader>
			<Card.Content>
				<UserLinks links={data.links} />
			</Card.Content>
		</Card.Root>
	</div>
	<div class="spotify">
		<Card.Root class="max-h-[300px] overflow-y-auto xl:col-span-2">
			<Card.Header>
				<Card.Title>Spotify</Card.Title>
				<Card.Description>
					Connect your Spotify account to display your currently playing song
				</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if data.spotifyToken}
					<div class="flex flex-col space-y-4">
						<form action="?/unlinkSpotify" method="POST" use:enhance>
							<Button variant="destructive" type="submit" class="flex items-center">
								<AudioLines class="mr-2" />
								<span>Unlink Spotify</span>
							</Button>
						</form>

						<MusicPlayer githubUsername={data.userData.username} />
					</div>
				{:else}
					<Button href="/api/spotify/login">
						<AudioLines class="mr-2 text-green-700" />
						<span>Link Spotify</span>
					</Button>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
