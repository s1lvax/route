<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChessStats } from '$lib/types/ChessComData';
	import StatsCard from '$lib/components/Shared/StatsCard.svelte';
	import StatsCardSkeleton from '$lib/components/Shared/StatsCardSkeleton.svelte';
	import { IconChess } from '@tabler/icons-svelte';
	import * as Card from '$lib/components/ui/card';

	export let chessComUsername: string;
	let data: ChessStats;
	let loading = true;

	onMount(async () => {
		const response = await fetch(`https://api.chess.com/pub/player/${chessComUsername}/stats`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		data = await response.json();
		loading = false;
	});
</script>

<Card.Root class="max-h-[400px] overflow-y-auto">
	<Card.Header>
		<Card.Title>Chess.com</Card.Title>
		<Card.Description>Chess stats</Card.Description>
	</Card.Header>
	<Card.Content>
		<dl class="mt-5 grid grid-cols-1 gap-2">
			<!-- FIDE Rating - Display only if greater than 0 -->
			{#if loading}
				<StatsCardSkeleton />
			{:else if data.fide > 0}
				<StatsCard title="FIDE Rating" data={`Rating: ${data.fide}`} icon={IconChess} />
			{/if}

			<!-- Chess Blitz Stats -->
			{#if loading}
				<StatsCardSkeleton />
			{:else if data.chess_blitz}
				<StatsCard
					title="Blitz"
					data={`${data.chess_blitz.last.rating || 'N/A'} / ${data.chess_blitz.best?.rating || 'N/A'}
					<br><br> <span class="font-normal text-sm">W: <span class="text-green-500">${data.chess_blitz.record.win || 0}</span> L: <span class="text-red-500">${data.chess_blitz.record.loss || 0}</span> D: <span class="text-gray-500">${data.chess_blitz.record.draw || 0}</span></span>`}
					icon={IconChess}
				/>
			{/if}

			<!-- Chess Bullet Stats -->
			{#if loading}
				<StatsCardSkeleton />
			{:else if data.chess_bullet}
				<StatsCard
					title="Bullet"
					data={`${data.chess_bullet.last.rating || 'N/A'} / ${data.chess_bullet.best?.rating || 'N/A'}
					<br><br> <span class="font-normal text-sm">W: <span class="text-green-500">${data.chess_bullet.record.win || 0}</span> L: <span class="text-red-500">${data.chess_bullet.record.loss || 0}</span> D: <span class="text-gray-500">${data.chess_bullet.record.draw || 0}</span></span>`}
					icon={IconChess}
				/>
			{/if}

			<!-- Chess Rapid Stats -->
			{#if loading}
				<StatsCardSkeleton />
			{:else if data.chess_rapid}
				<StatsCard
					title="Rapid"
					data={`${data.chess_rapid.last.rating || 'N/A'} / ${data.chess_rapid.best?.rating || 'N/A'}
					<br><br> <span class="font-normal text-sm">W: <span class="text-green-500">${data.chess_rapid.record.win || 0}</span> L: <span class="text-red-500">${data.chess_rapid.record.loss || 0}</span> D: <span class="text-gray-500">${data.chess_rapid.record.draw || 0}</span></span>`}
					icon={IconChess}
				/>
			{/if}

			<!-- Chess Tactics Stats (Combined Highest and Lowest) -->
			{#if loading}
				<StatsCardSkeleton />
			{:else if data.tactics}
				<StatsCard
					title="Tactics"
					data={`Highest: ${data.tactics.highest?.rating || 'N/A'}
					<br> Date: ${data.tactics.highest ? new Date(data.tactics.highest.date * 1000).toLocaleDateString() : 'N/A'}
					<br><br> Lowest: ${data.tactics.lowest?.rating || 'N/A'}
					<br> Date: ${data.tactics.lowest ? new Date(data.tactics.lowest.date * 1000).toLocaleDateString() : 'N/A'}`}
					icon={IconChess}
				/>
			{/if}
		</dl>
	</Card.Content>
</Card.Root>
