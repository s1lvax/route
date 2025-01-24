<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import FormCardHeader from '$lib/components/MyProfile/FormCardHeader.svelte';
	import LinkForm from '$lib/components/MyProfile/LinkForm.svelte';
	import UserLinks from '$lib/components/MyProfile/UserLinks.svelte';
	import type { PageData } from '../$types';
	import { AudioLines } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import MusicPlayer from '$lib/components/Shared/MusicPlayer.svelte';
	import ChessComForm from '$lib/components/MyProfile/ChessComForm.svelte';
	import { IconChess, IconLink } from '@tabler/icons-svelte';
	import { Braces } from 'lucide-svelte';
	import ChessComStats from '$lib/components/MyProfile/ChessComStats.svelte';
	import LeetCodeForm from '$lib/components/MyProfile/LeetCodeForm.svelte';
	import LeetCodeStats from '$lib/components/MyProfile/LeetCodeStats.svelte';
	import CodewarsForm from '$lib/components/MyProfile/CodewarsForm.svelte';
	import CodewarsStats from '$lib/components/MyProfile/CodewarsStats.svelte';

	export let data: PageData;
</script>

<h1
	class="mb-5 flex flex-row items-center space-x-2 text-2xl font-bold text-muted-foreground md:mb-10 md:text-6xl"
>
	Integrations
</h1>

<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
	<div class="custom-links">
		<Card.Root class="max-h-[500px] overflow-y-auto xl:col-span-2">
			<FormCardHeader
				description="The links visible on your profile. You can drag links around to modify the order"
				title="Links"
			>
				<div class="flex flex-row items-stretch gap-4">
					<LinkForm
						username={data.userData.username}
						data={data.form}
						linksLength={data.links.length}
						links={data.links}
					/>
				</div>
			</FormCardHeader>
			<Card.Content>
				<UserLinks links={data.links} />
			</Card.Content>
		</Card.Root>
	</div>
	<div class="chess.com">
		<Card.Root class="max-h-[500px] overflow-y-auto xl:col-span-2">
			{#if data.chessComUsername}
				<Card.Header>
					<Card.Title class="flex flex-row items-center space-x-2">
						<IconChess /> Chess.com</Card.Title
					>
					<Card.Description>
						You can unlink your Chess.com account here to showcase your stats.
					</Card.Description>
					<Card.Content>
						<div class="flex flex-col space-y-4">
							<form action="?/deleteChessCom" method="POST" use:enhance>
								<Button variant="destructive" type="submit" class="flex items-center">
									<IconChess />
									<span>Unlink Chess.com</span>
								</Button>
							</form>
							<ChessComStats chessComUsername={data.chessComUsername.username} />
						</div>
					</Card.Content>
				</Card.Header>
			{:else}
				<FormCardHeader
					description="You can link your Chess.com account here to showcase your stats."
					title="Chess.com"
				>
					<div class="flex flex-row items-stretch gap-4 pb-6">
						<ChessComForm data={data.chessComForm} />
					</div>
				</FormCardHeader>
			{/if}
		</Card.Root>
	</div>
	<div class="spotify">
		<Card.Root class="pointer-events-none max-h-[500px] overflow-y-auto opacity-70 xl:col-span-2">
			<Card.Header>
				<Card.Title class="flex flex-row items-center space-x-2">
					<IconLink /> Spotify (Coming Soon)</Card.Title
				>
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
					<Button href="/api/spotify/login" aria-disabled>
						<AudioLines class="mr-2 text-green-700" />
						<span>Link Spotify</span>
					</Button>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
	<div class="leetcode">
		<Card.Root class="max-h-[500px] overflow-y-auto xl:col-span-2">
		  {#if data.leetCodeUsername}
				<div class="flex flex-col space-y-4">
				  <form action="?/deleteLeetCode" method="POST" use:enhance>
					<LeetCodeStats leetCodeUsername={data.leetCodeUsername.username} />
					<Button variant="destructive" type="submit">
					  Unlink LeetCode
					</Button>
				  </form>
				</div>
		  {:else}
			<FormCardHeader
			  description="Link your LeetCode account to showcase your stats."
			  title="LeetCode"
			>
			  <LeetCodeForm data={data.leetCodeForm} />
			</FormCardHeader>
		  {/if}
		</Card.Root>
	  </div>

	  <div class="codewars">
		<Card.Root class="max-h-[500px] overflow-y-auto xl:col-span-2">
			{#if data.codewarsUsername}
					<div class="flex flex-col space-y-4">
						<form action="?/deleteCodewars" method="POST" use:enhance>
							<CodewarsStats codewarsUsername={data.codewarsUsername.username} />
							<Button variant="destructive" type="submit">
							Unlink Codewars
							</Button>
						</form>
					</div>
			{:else}
				<FormCardHeader
					description="Link your Codewars account to showcase your stats."
					title="Codewars"
					>
					<CodewarsForm data={data.leetCodeForm} />
				</FormCardHeader>
			{/if}
		</Card.Root>
	</div>
</div>
