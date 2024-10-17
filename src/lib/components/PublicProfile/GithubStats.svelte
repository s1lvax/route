<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { GithubData } from '$lib/types/GithubData';
	import { Folder } from 'lucide-svelte';
	import GitHub from 'lucide-svelte/icons/github';

	export let githubData: GithubData;
</script>

<!-- GitHub Stats Cards -->
<div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
	<!-- Total Projects (Repo Count) Card -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<Folder class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium">Projects on GitHub</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{githubData.repoCount}</div>
		</Card.Content>
	</Card.Root>

	<!-- GitHub Contributions Card -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<GitHub class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium">GitHub Contributions (Past 30 Days)</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{githubData.contributionsCount}</div>
		</Card.Content>
	</Card.Root>

	<!-- Praise Received Card -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<div class="flex items-center space-x-2">
				<GitHub class="h-4 w-4 text-muted-foreground" />
				<Card.Title class="text-sm font-medium">Github Followers</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{githubData.followers}</div>
		</Card.Content>
	</Card.Root>
</div>
