<script lang="ts">
	import { onMount } from 'svelte';
	import type { LeetCodeStats } from '$lib/types/LeetCodeData';
	import { Flame, Calendar, Medal } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	export let leetCodeUsername: string;
	let data: LeetCodeStats | null = null;
	let loading = true;

	// Problem-solving counts by difficulty
	let easyCount = 0;
	let mediumCount = 0;
	let hardCount = 0;

	// Fetch data
	onMount(async () => {
		try {
			const response = await fetch(`/api/leetcode?leetCodeUsername=${leetCodeUsername}`);
			if (response.ok) {
				const result = await response.json();
				data = result.data.matchedUser;

				// Extract counts for each difficulty
				easyCount = data?.submitStatsGlobal.acSubmissionNum.find(item => item.difficulty === "Easy")?.count || 0;
				mediumCount = data?.submitStatsGlobal.acSubmissionNum.find(item => item.difficulty === "Medium")?.count || 0;
				hardCount = data?.submitStatsGlobal.acSubmissionNum.find(item => item.difficulty === "Hard")?.count || 0;
			}
		} catch (error) {
			console.error('Error fetching LeetCode stats:', error);
		} finally {
			loading = false;
		}
	});
</script>

<Card.Root class="max-h-[400px] overflow-y-auto">
	<Card.Header>
		<Card.Title>LeetCode</Card.Title>
		<Card.Description>{leetCodeUsername}'s LeetCode stats</Card.Description>
	</Card.Header>
	
	<Card.Content>
		{#if loading}
			<p>Loading...</p>
		{:else if data}
			<!-- Problem Solving Summary -->
			<h4 class="text-lg font-semibold mt-6 mb-4">Problem Solving Summary</h4>
			<Table.Root class="w-full mb-8">
				<Table.Header>
					<Table.Row>
						<Table.Head>Difficulty</Table.Head>
						<Table.Head>Count</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Easy</Table.Cell>
						<Table.Cell>{easyCount}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Medium</Table.Cell>
						<Table.Cell>{mediumCount}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Hard</Table.Cell>
						<Table.Cell>{hardCount}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>

			<!-- Badges -->
			{#if data.userCalendar.dccBadges.length > 0}
				<h4 class="text-lg font-semibold mb-4">Badges</h4>
				<div class="badge-grid grid grid-cols-3 gap-4 mb-8">
					{#each data.userCalendar.dccBadges as badge}
						<div class="badge relative w-12 h-12">
							<img src={`https://leetcode.com/${badge.badge.icon}`} alt={badge.badge.name} class="w-full h-auto" />
							<div class="tooltip absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 hidden group-hover:block">
								{badge.badge.name}
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Metrics -->
			<h4 class="text-lg font-semibold mb-4">Metrics</h4>
			<Table.Root class="w-full">
				<Table.Body>
					<Table.Row class="flex items-center space-x-4 mb-2">
						<Flame class="text-orange-500 w-6 h-6" />
						<Table.Cell class="font-medium">Longest Streak:</Table.Cell>
						<Table.Cell>{data.userCalendar.streak} days</Table.Cell>
					</Table.Row>
					<Table.Row class="flex items-center space-x-4 mb-2">
						<Calendar class="text-blue-500 w-6 h-6" />
						<Table.Cell class="font-medium">Active Days:</Table.Cell>
						<Table.Cell>{data.userCalendar.totalActiveDays}</Table.Cell>
					</Table.Row>
					<Table.Row class="flex items-center space-x-4">
						<Medal class="text-yellow-500 w-6 h-6" />
						<Table.Cell class="font-medium">Ranking:</Table.Cell>
						<Table.Cell>{data.profile.ranking}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		{:else}
			<p>No data available.</p>
		{/if}
	</Card.Content>
</Card.Root>

<style>
	.badge-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
	}
</style>
