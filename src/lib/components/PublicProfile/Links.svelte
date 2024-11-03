<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import type { PublicProfile } from '$lib/types/PublicProfile';

	export let userData: PublicProfile;
</script>

<!-- Links Section -->
<Card.Root class="max-h-[400px] overflow-y-auto">
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
						<Table.Row class="space-x-4 border-b-0 hover:cursor-pointer">
							<Table.Cell class="p-0 font-medium">
								<a class="block p-4" href={link.url} target="_blank">
									<span>{link.title}</span>
								</a>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<p class="text-muted-foreground">No links available</p>
		{/if}
	</Card.Content>
</Card.Root>
