<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { formatDate } from '$lib/utils/formatDate';
	import { Button } from '$lib/components/ui/button';
	import { Trash2, Copy } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let links; // Use the Link type for the links prop

	const copyToClipboard = (url: string) => {
		navigator.clipboard
			.writeText(url)
			.then(() => {
				console.log('Link copied to clipboard!');
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});

		toast.success('Link has been copied.', {
			description: url,
			action: {
				label: 'Undo',
				onClick: () => console.info('Undo')
			}
		});
	};
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
					<Table.Head>Actions</Table.Head>
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

							<Button variant="ghost" on:click={() => copyToClipboard(link.url)}>
								<Copy
									class="h-4 w-4 transform transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
								/>
							</Button>
						</Table.Cell>
						<Table.Cell>{formatDate(link.createdAt)}</Table.Cell>
						<Table.Cell>
							<form action="?/deleteLink&id={link.id}" method="POST" use:enhance>
								<Button type="submit" id="deleteLink" variant="ghost"><Trash2 /></Button>
							</form>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
