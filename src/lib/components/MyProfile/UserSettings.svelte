<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { copyToClipboard } from '$lib/utils/copyToClipboard';
	import { confirmDelete } from '$lib/utils/confirmDelete';
	import { ArrowUpRight, Trash2, CircleChevronDown, Copy, AudioLines } from 'lucide-svelte';

	import { enhance } from '$app/forms';
	import type { PageData } from '../../../routes/profile/$types';
	import { IconBrandGithub } from '@tabler/icons-svelte';

	export let data: PageData;
</script>

<div class="flex w-full justify-end space-x-2">
	<div class="flex flex-row space-x-2">
		{#if data.spotifyToken}
			<form action="?/unlinkSpotify" method="POST" use:enhance>
				<Button variant="destructive" type="submit"
					><AudioLines class="mr-2" /> Unlink Spotify</Button
				>
			</form>
		{:else}
			<Button href="/api/spotify/login"
				><AudioLines class="mr-2 text-green-700" /> Link Spotify</Button
			>
		{/if}
		<form action="?/updateOpenToCollaborating" method="POST" use:enhance>
			{#if data.userData.openToCollaborating}
				<Button variant="destructive" type="submit"
					><IconBrandGithub class="mr-2" /> Disallow Collaborations</Button
				>
			{:else}
				<Button type="submit"><IconBrandGithub class="mr-2" /> Allow Collaborations</Button>
			{/if}
		</form>
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="default">
				<CircleChevronDown class="mr-2 h-4 w-4 text-sm" /> Your Profile
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Profile Settings</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<a
						href="/{data.userData.username}"
						target="_blank"
						class="flex flex-row items-center space-x-2"
					>
						<ArrowUpRight class="text-sm" /> View Public Profile
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item
					on:click={() => copyToClipboard(`${window.location.origin}/${data.userData.username}`)}
				>
					<div class="flex flex-row items-center space-x-2 hover:cursor-pointer">
						<Copy class="text-sm" /> Copy Profile's URL
					</div>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<form action="?/deleteAccount&id={data.userId}" method="POST" use:enhance>
						<button
							type="submit"
							class="flex flex-row items-center space-x-2 text-red-500"
							on:click={confirmDelete}
						>
							<Trash2 class="text-sm" /> Delete Account
						</button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
