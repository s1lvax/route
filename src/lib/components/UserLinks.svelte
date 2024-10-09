<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { formatDate } from '$lib/utils/formatDate';

	export let links; // Use the Link type for the links prop
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Links</Card.Title>
		<Card.Description>The links visible on your profile</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Title</Table.Head>
					<Table.Head>URL</Table.Head>
					<Table.Head>Created At</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each links as link}
					<Table.Row>
						<Table.Cell>
							<div class="font-medium">{link.title}</div>
						</Table.Cell>
						<Table.Cell>
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-blue-600 hover:underline">Link is available here</a
							>
						</Table.Cell>
						<Table.Cell>{formatDate(link.createdAt)}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
