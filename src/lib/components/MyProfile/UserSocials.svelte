<script lang="ts">
	import { Trash2, Copy } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import { confirmDelete } from '$lib/utils/confirmDelete';

	import type { Social } from '@prisma/client';
	import { copyToClipboard } from '$lib/utils/copyToClipboard';
	import { findSocialSvg } from '$lib/utils/findSocialSvg';

	export let socials: Social[];
</script>

<div class="grid gap-4">
	{#each socials as social}
		<div class="flex items-center gap-4">
			<span class="flex items-center">{@html findSocialSvg(social.social)}</span>

			<div class="flex flex-row items-center gap-4">
				<p class="text-sm font-medium leading-none">{social.social}</p>
				<Button variant="ghost" on:click={() => copyToClipboard(social.socialURL)}>
					<Copy
						class="h-4 w-4 transform transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
					/>
				</Button>
			</div>
			<div class="ml-auto font-medium">
				<form action="?/deleteSocial&id={social.id}" method="POST" use:enhance>
					<Button type="submit" variant="ghost" on:click={confirmDelete}>
						<Trash2 />
					</Button>
				</form>
			</div>
		</div>
	{/each}
</div>
