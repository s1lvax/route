<script>
	import NewSection from '$lib/components/Shared/NewSection.svelte';
	import { features } from '$lib/constants/features';
	import * as Card from '$lib/components/ui/card';
</script>

<NewSection>
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		{#each features as feature}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center space-x-2">
						<svelte:component this={feature.icon} />
						<span>{feature.name}</span>
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<Card.Description>{feature.description}</Card.Description>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</NewSection>
