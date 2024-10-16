<script lang="ts">
	import GitHub from 'lucide-svelte/icons/github';
	import Users from 'lucide-svelte/icons/users';
	import Folder from 'lucide-svelte/icons/folder';
	import * as Card from '$lib/components/ui/card';
	import type { PrivateProfileData } from '$lib/types/PrivateProfileData';

	export let privateProfileData: PrivateProfileData | null;
</script>

{#if privateProfileData}
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<div class="flex items-center space-x-2">
					<Users class="h-4 w-4 text-muted-foreground" />
					<Card.Title class="text-sm font-medium">Total Profile Views</Card.Title>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{privateProfileData.views}</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<div class="flex items-center space-x-2">
					<Folder class="h-4 w-4 text-muted-foreground" />
					<Card.Title class="text-sm font-medium">Projects on Github</Card.Title>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{privateProfileData.repoCount}</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<div class="flex items-center space-x-2">
					<GitHub class="h-4 w-4 text-muted-foreground" />
					<Card.Title class="text-sm font-medium">GitHub Contributions (Past 30 Days)</Card.Title>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{privateProfileData.contributionsCount}</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<div class="flex items-center space-x-2">
					<GitHub class="h-4 w-4 text-muted-foreground" />
					<Card.Title class="text-sm font-medium">Github Followers</Card.Title>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{privateProfileData.followers}</div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
