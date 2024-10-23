<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import type { PublicProfile } from '$lib/types/PublicProfile';

	export let userData: PublicProfile;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Hobbies</Card.Title>
		<Card.Description>Discover the developer's hobbies</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if userData.hobbies.length > 0}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Hobby</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each userData.hobbies as hobby}
            <Table.Row class="flex flex-row space-x-4 hover:cursor-pointer">
                <Table.Cell class="font-medium">{hobby.hobby}</Table.Cell>
            </Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<p class="text-muted-foreground">No hobbies available</p>
		{/if}
	</Card.Content>
</Card.Root>

