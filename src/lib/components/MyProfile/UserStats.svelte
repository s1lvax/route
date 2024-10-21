<script lang="ts">
	import GitHub from 'lucide-svelte/icons/github';
	import Users from 'lucide-svelte/icons/users';
	import Folder from 'lucide-svelte/icons/folder';
	import * as Card from '$lib/components/ui/card';
	import type { PrivateProfileData } from '$lib/types/PrivateProfileData';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let privateProfileData: PrivateProfileData | null;

	// Each card has exactly the same structure, so we might aswell avoid writing the same HTML each time
	const cards = [
		{ icon: Users, title: 'Total Profile Views', data: (p: PrivateProfileData) => p.views },
		{ icon: Folder, title: 'Projects on Github', data: (p: PrivateProfileData) => p.repoCount },
		{
			icon: GitHub,
			title: 'GitHub Contributions (Past 30 Days)',
			data: (p: PrivateProfileData) => p.contributionsCount
		},
		{ icon: GitHub, title: 'Github Followers', data: (p: PrivateProfileData) => p.followers }
	];
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#if privateProfileData}
		{#each cards as card}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<svelte:component this={card.icon} class="h-4 w-4 text-muted-foreground"
						></svelte:component>
						<Card.Title class="text-sm font-medium">{card.title}</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{card.data(privateProfileData)}</div>
				</Card.Content>
			</Card.Root>
		{/each}
	{:else}
		{#each cards as _}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex w-full items-center space-x-2">
						<Skeleton class="h-5 w-[75%]"></Skeleton>
					</div>
				</Card.Header>
				<Card.Content>
					<Skeleton class="h-8 w-[40%]"></Skeleton>
				</Card.Content>
			</Card.Root>
		{/each}
	{/if}
</div>
