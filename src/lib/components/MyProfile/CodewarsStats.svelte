<script lang="ts">
	import { onMount } from 'svelte';
	import type { CodewarsStats } from '$lib/types/Codewars';
	import { Award, Medal, Hash, Code, Hammer } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	export let codewarsUsername: string;
	let data: CodewarsStats;
	let loading = true;

	onMount(async () => {
		const response = await fetch(`https://www.codewars.com/api/v1/users/${codewarsUsername}`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		data = await response.json();
		loading = false;
	});
</script>

<Card.Root class="max-h-[400px] overflow-y-auto">
	<Card.Header>
		<Card.Title>Codewars</Card.Title>
		<Card.Description>{codewarsUsername}'s Codewars stats</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if loading}
			<p>Loading...</p>
		{:else}
			<!-- Metrics -->
			<h4 class="text-lg font-semibold mb-4">Metrics</h4>
			<Table.Root class="w-full">
				<Table.Body>
					<Table.Row class="flex items-center space-x-4 mb-2">
						<Award class="text-red-500 w-6 h-6" />
						<Table.Cell class="font-medium">Rank:</Table.Cell>
						<Table.Cell class="text-{data.ranks.overall.color}-500">{data.ranks.overall.name}</Table.Cell>
					</Table.Row>
					<Table.Row class="flex items-center space-x-4 mb-2">
						<Hash class="text-blue-500 w-6 h-6" />
						<Table.Cell class="font-medium">Honor:</Table.Cell>
						<Table.Cell>{data.honor}</Table.Cell>
					</Table.Row>
					<Table.Row class="flex items-center space-x-4">
						<Medal class="text-yellow-500 w-6 h-6" />
						<Table.Cell class="font-medium">Ranking:</Table.Cell>
						<Table.Cell>{data.leaderboardPosition}</Table.Cell>
					</Table.Row>
					<Table.Row class="flex items-center space-x-4">
						<Code class="text-green-500 w-6 h-6" />
						<Table.Cell class="font-medium">Completed:</Table.Cell>
						<Table.Cell>{data.codeChallenges.totalCompleted}</Table.Cell>
					</Table.Row>
					<Table.Row class="flex items-center space-x-4">
						<Hammer class="text-purple-500 w-6 h-6" />
						<Table.Cell class="font-medium">Created:</Table.Cell>
						<Table.Cell>{data.codeChallenges.totalAuthored}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>

			<h4 class="text-lg font-semibold mb-4 mt-3">Languages</h4>
			<Table.Root class="w-full">
				<Table.Body>
					<Table.Row class="flex items-center space-x-4 mb-2">
						{#each Object.keys(data.ranks.languages) as language}
							<Table.Cell>{language.charAt(0).toUpperCase() + language.slice(1)}</Table.Cell>
							<Table.Cell class="text-{data.ranks.languages[language].color}-500">{data.ranks.languages[language].name}</Table.Cell>
						{/each}
					</Table.Row>
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
</Card.Root>
