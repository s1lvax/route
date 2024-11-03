<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChessStats } from '$lib/types/ChessComData';
	import { IconChess } from '@tabler/icons-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

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
		<Card.Description>{chessComUsername}'s chess stats</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if loading}
			<p>Loading...</p>
		{:else}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Game Type</Table.Head>
						<Table.Head>Current Rating</Table.Head>
						<Table.Head>Record (W-D-L)</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<!-- FIDE Rating -->
					{#if data.fide > 0}
						<Table.Row>
							<Table.Cell>FIDE</Table.Cell>
							<Table.Cell>{data.fide}</Table.Cell>
							<Table.Cell>-</Table.Cell>
						</Table.Row>
					{/if}

					<!-- Chess Blitz Stats -->
					{#if data.chess_blitz}
						<Table.Row>
							<Table.Cell>Blitz</Table.Cell>
							<Table.Cell>{data.chess_blitz.last.rating || 'N/A'}</Table.Cell>
							<Table.Cell>
								{data.chess_blitz.record.win || 0}
								{data.chess_blitz.record.draw || 0}
								{data.chess_blitz.record.loss || 0}
							</Table.Cell>
						</Table.Row>
					{/if}

					<!-- Chess Bullet Stats -->
					{#if data.chess_bullet}
						<Table.Row>
							<Table.Cell>Bullet</Table.Cell>
							<Table.Cell>{data.chess_bullet.last.rating || 'N/A'}</Table.Cell>
							<Table.Cell>
								{data.chess_bullet.record.win || 0}
								{data.chess_bullet.record.draw || 0}
								{data.chess_bullet.record.loss || 0}
							</Table.Cell>
						</Table.Row>
					{/if}

					<!-- Chess Rapid Stats -->
					{#if data.chess_rapid}
						<Table.Row>
							<Table.Cell>Rapid</Table.Cell>
							<Table.Cell>{data.chess_rapid.last.rating || 'N/A'}</Table.Cell>
							<Table.Cell>
								{data.chess_rapid.record.win || 0}
								{data.chess_rapid.record.draw || 0}
								{data.chess_rapid.record.loss || 0}
							</Table.Cell>
						</Table.Row>
					{/if}
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
</Card.Root>
