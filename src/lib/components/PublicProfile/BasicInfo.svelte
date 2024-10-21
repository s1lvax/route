<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { IdCard, Twitter } from 'lucide-svelte';
	import GitHub from 'lucide-svelte/icons/github';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { GithubData } from '$lib/types/GithubData';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import { Badge } from '$lib/components/ui/badge';

	export let githubData: GithubData | null;
	export let userData: PublicProfile;
</script>

<!-- User Avatar and Basic Info -->
<div class="flex items-center justify-center space-x-4">
	<Avatar.Root class="h-24 w-24 rounded-full">
		{#if githubData}
			<Avatar.Image src={githubData.avatarUrl} alt="User Avatar" />
			<Avatar.Fallback>?</Avatar.Fallback>
		{:else}
			<Skeleton class="h-full w-full rounded-full"></Skeleton>
		{/if}
	</Avatar.Root>
	<div class="flex flex-col space-y-4 text-center">
		{#if githubData}
			{#if githubData.name}
				<div class="flex flex-col items-center justify-center gap-2">
					<p class="text-2xl font-bold">{githubData.name}</p>
					<div class="badge">
						{#if userData.isOpenToCollaborating}
							<Badge variant="outline" class="border-green-700 text-green-700"
								>Open to Collaborating</Badge
							>
						{:else}
							<Badge variant="outline" class="border-red-700 text-red-700"
								>Not Open to Collaborating</Badge
							>
						{/if}
					</div>
				</div>
			{:else}
				<p class="text-2xl font-bold">{userData.username}</p>
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
		{:else}
			<div class="flex w-[300px] justify-center">
				<Skeleton class="h-8 w-[75px]"></Skeleton>
			</div>
			<Skeleton class="h-6 w-[300px]"></Skeleton>

			<div class="flex flex-row items-center justify-center gap-4">
				{#each { length: 2 } as _}
					<Skeleton class="mt-2 h-[40px] w-[58px] rounded-full"></Skeleton>
				{/each}
			</div>
		{/if}
	</div>
</div>
