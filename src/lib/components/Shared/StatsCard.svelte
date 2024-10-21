<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import * as Card from '$lib/components/ui/card';

	export let icon: ComponentType<SvelteComponent>;
	export let title: string;
	export let data: string;
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<div class="flex items-center space-x-2">
			<svelte:component this={icon} class="h-4 w-4 text-muted-foreground"></svelte:component>
			<Card.Title class="text-sm font-medium">{title}</Card.Title>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">{data}</div>
	</Card.Content>
</Card.Root>
