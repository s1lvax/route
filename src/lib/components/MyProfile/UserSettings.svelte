<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { copyToClipboard } from '$lib/utils/copyToClipboard';
	import { confirmDelete } from '$lib/utils/confirmDelete';
	import { ArrowUpRight, Trash2, CircleChevronDown, Github, Copy } from 'lucide-svelte';

	import { enhance } from '$app/forms';
	import type { PageData } from '../../../routes/profile/$types';

	export let data: PageData;
</script>

<div class="flex w-full justify-end space-x-2">
	<div class="flex flex-row space-x-2">
		<form action="?/updateOpenToCollaborating" method="POST" use:enhance>
			{#if data.userData.openToCollaborating}
				<Button variant="destructive" type="submit">
					<Github class="mr-2" />
					<span>Disallow Collaborations</span>
				</Button>
			{:else}
				<Button type="submit">
					<Github class="mr-2" />
					<span>Allow Collaborations</span>
				</Button>
			{/if}
		</form>
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="default">
				<CircleChevronDown class="mr-2 h-4 w-4 text-sm" />
				<span>Your Profile</span>
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
						<ArrowUpRight class="text-sm" />
						<span>View Public Profile</span>
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item
					on:click={() => copyToClipboard(`${window.location.origin}/${data.userData.username}`)}
				>
					<div class="flex flex-row items-center space-x-2 hover:cursor-pointer">
						<Copy class="text-sm" />
						<span>Copy Profile's URL</span>
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
							<Trash2 class="text-sm" />
							<span>Delete Account</span>
						</button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
