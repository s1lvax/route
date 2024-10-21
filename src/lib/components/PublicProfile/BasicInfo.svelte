<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { IdCard, Twitter } from 'lucide-svelte';
	import GitHub from 'lucide-svelte/icons/github';

	import type { GithubData } from '$lib/types/GithubData';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	export let githubData: GithubData;
	export let userData: PublicProfile;
</script>

<!-- User Avatar and Basic Info -->
<div class="flex items-center justify-center space-x-4">
	<Avatar.Root class="h-24 w-24 rounded-full">
		<Avatar.Image src={githubData.avatarUrl} alt="User Avatar" />
		<Avatar.Fallback>?</Avatar.Fallback>
	</Avatar.Root>
	<div class="flex flex-col space-y-4 text-center">
		{#if githubData.name}
			<p class="text-2xl font-bold">{githubData.name}</p>
		{:else}
			<p class="text-xl font-bold">{userData.username}</p>
		{/if}

		{#if githubData.bio}
			<p class="text-muted-foreground">{githubData.bio}</p>
		{:else}
			<p class="text-muted-foreground">Public Developer Profile</p>
		{/if}

		{#if githubData.company}
			<p class="text-muted-foreground">Currently at {githubData.company}</p>
		{/if}
		<div class="flex flex-row items-center justify-center gap-4">
			<div>
				<Button
					href={githubData.url}
					target="_blank"
					class="mt-2 flex justify-center rounded-full"
					variant="outline"
				>
					<GitHub />
				</Button>
			</div>
			{#if githubData.blog}
				<div>
					<Button
						href={githubData.blog}
						target="_blank"
						class="mt-2 flex justify-center rounded-full"
						variant="outline"
					>
						<IdCard />
					</Button>
				</div>
			{/if}
			{#if githubData.twitter}
				<div>
					<Button
						href="https://x.com/{githubData.twitter}"
						target="_blank"
						class="mt-2 flex justify-center rounded-full"
						variant="outline"
					>
						<Twitter />
					</Button>
				</div>
			{/if}
		</div>
	</div>
</div>
