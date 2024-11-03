<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { copyToClipboard } from '$lib/utils/copyToClipboard';
	import { confirmDelete } from '$lib/utils/confirmDelete';
	import { enhance } from '$app/forms';
	import type { PageData } from '../../../routes/profile/$types';
	import { IconBrandGithub, IconTrash, IconCopy } from '@tabler/icons-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<div>
	<h1
		class="mb-5 flex flex-row items-center space-x-2 text-2xl font-bold text-muted-foreground md:mb-10 md:text-6xl"
	>
		Settings
	</h1>
	<div class="mt-6">
		<dl class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
			<div class="px-4 py-6 sm:col-span-1 sm:px-0">
				<dt class="text-lg">Collaboration Status</dt>
				<dd class="mt-2">
					<form action="?/updateOpenToCollaborating" method="POST" use:enhance>
						{#if data.userData.openToCollaborating}
							<Button variant="destructive" type="submit" class="flex items-center">
								<IconBrandGithub class="mr-2" />
								<span>Disallow Collaborations</span>
							</Button>
						{:else}
							<Button type="submit" class="flex items-center">
								<IconBrandGithub class="mr-2" />
								<span>Allow Collaborations</span>
							</Button>
						{/if}
					</form>
				</dd>
			</div>
		</dl>
		<div class="border-t px-4 py-6 sm:col-span-2 sm:px-0">
			<dt class="text-lg">Public Profile</dt>
			<dd class="mt-2 flex flex-row space-x-4">
				<Input value="{$page.url.origin}/{data.userData.username}" disabled class="w-full" />
				<Button
					class="flex cursor-pointer items-center"
					on:click={() => copyToClipboard(`${$page.url.origin}/${data.userData.username}`)}
				>
					<IconCopy />
				</Button>
			</dd>
		</div>
		<div class="border-t px-4 py-6 sm:col-span-2 sm:px-0">
			<dt class="text-lg">Account Actions</dt>
			<dd class="mt-2">
				<form action="?/deleteAccount&id={data.userId}" method="POST" use:enhance>
					<Button
						type="submit"
						variant="destructive"
						class="flex items-center "
						on:click={confirmDelete}
					>
						<IconTrash class="mr-2" />
						<span>Delete Account</span>
					</Button>
				</form>
			</dd>
		</div>
	</div>
</div>
