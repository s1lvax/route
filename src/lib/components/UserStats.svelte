<script lang="ts">
	import GitHub from 'lucide-svelte/icons/github'; // For GitHub contributions
	import Users from 'lucide-svelte/icons/users'; // For profile views
	import Folder from 'lucide-svelte/icons/folder'; // For total projects
	import { ThumbsUp, FolderSync } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';

	export let userStats;
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<Users class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium">Total Profile Views</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{userStats.views}</div>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<Folder class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium">Total Projects</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{userStats.repoCount}</div>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<GitHub class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium">GitHub Contributions</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{userStats.contributionsCount}</div>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<ThumbsUp class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium">Praise Received</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{userStats.praises}</div>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<FolderSync class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium"
					>Last Updated (Available every 10min on refresh)</Card.Title
				>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{userStats.lastUpdatedAt}</div>
		</Card.Content>
	</Card.Root>
</div>
