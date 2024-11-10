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

<style>
	.icon { width: 24px; height: 24px; margin-right: 8px; color: orange; }
	.badge-grid { display: grid; grid-template-columns: repeat(auto-fill, 50px); gap: 8px; }
	.badge { position: relative; width: 50px; height: 50px; }
	.badge img { width: 100%; height: auto; }
	.badge:hover .tooltip { display: block; }
	.tooltip {
		display: none;
		position: absolute;
		bottom: -24px;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(0, 0, 0, 0.75);
		color: #fff;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.75em;
		white-space: nowrap;
		z-index: 10;
	}
</style>

<Card.Root class="max-h-[400px] overflow-y-auto">
	<Card.Header>
		<Card.Title>LeetCode</Card.Title>
		<Card.Description>{leetCodeUsername}'s LeetCode stats</Card.Description>
	</Card.Header>
	
	<Card.Content>
		{#if loading}
			<p>Loading...</p>
		{:else if data}
			<!-- Streak, Active Days, Ranking -->
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Metric</Table.Head>
						<Table.Head>Value</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell><Flame class="icon" />Streak</Table.Cell>
						<Table.Cell>{data.userCalendar.streak} days</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell><Calendar class="icon" />Active Days</Table.Cell>
						<Table.Cell>{data.userCalendar.totalActiveDays}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell><Medal class="icon" />Ranking</Table.Cell>
						<Table.Cell>{data.profile.ranking}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>

			<!-- Badges -->
			{#if data.userCalendar.dccBadges.length > 0}
				<h4>Badges</h4>
				<div class="badge-grid">
					{#each data.userCalendar.dccBadges as badge}
						<div class="badge">
							<img src={`https://leetcode.com/${badge.badge.icon}`} alt={badge.badge.name} />
							<div class="tooltip">{badge.badge.name}</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Problem Solving Summary -->
			<h4>Problem Solving Summary</h4>
			<Table.Root>
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
		{:else}
			<p>No data available.</p>
		{/if}
	</Card.Content>
</Card.Root>
