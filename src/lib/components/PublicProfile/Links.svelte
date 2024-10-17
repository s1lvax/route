<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import type { PublicProfile } from '$lib/types/PublicProfile';

	export let userData: PublicProfile;
</script>

<!-- Links Section -->
<Card.Root>
	<Card.Header>
		<Card.Title>Links</Card.Title>
		<Card.Description>Discover the developer's projects and favorite resources</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if userData.links.length > 0}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Title</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each userData.links as link}
						<a href={link.url} target="_blank">
							<Table.Row class="flex flex-row space-x-4 hover:cursor-pointer">
								<Table.Cell class="font-medium">{link.title}</Table.Cell>
							</Table.Row>
						</a>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<p class="text-muted-foreground">No links available</p>
		{/if}
	</Card.Content>
</Card.Root>
