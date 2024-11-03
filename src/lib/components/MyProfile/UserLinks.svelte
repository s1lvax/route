<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Trash2, Copy, AlignJustify } from 'lucide-svelte';
	import { copyToClipboard } from '$lib/utils/copyToClipboard';
	import { confirmDelete } from '$lib/utils/confirmDelete';
	import DnD from '$lib/components/Shared/DnD.svelte';
	import type { Link } from '@prisma/client';

	export let links: Link[]; // Use the Link type for the links prop
	let dragDisabled = false;

	const handleDrop = async () => {
		dragDisabled = true;
		await fetch('/profile/links/order', {
			method: 'PATCH',
			body: JSON.stringify({ links }),
			headers: {
				'content-type': 'application/json'
			}
		});
		dragDisabled = false;
	};
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head></Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<DnD
		items={links}
		dndOptions={{ dragDisabled }}
		updateNewItems={(newLinks) => (links = newLinks)}
		containerTag="tbody"
		class="[&_tr:last-child]:border-0"
		onDrop={handleDrop}
	>
		{#each links as link (link.id)}
			<Table.Row>
				<Table.Cell>
					<AlignJustify />
				</Table.Cell>
				<Table.Cell>
					<div class="flex flex-row items-center space-x-2 font-medium">
						{link.title}
						<Button variant="ghost" on:click={() => copyToClipboard(link.url)}>
							<Copy
								class="h-4 w-4 transform transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
							/>
						</Button>
					</div>
				</Table.Cell>
				<Table.Cell>
					<form action="?/deleteLink&id={link.id}" method="POST" use:enhance>
						<Button type="submit" id="deleteLink" variant="ghost" on:click={confirmDelete}>
							<Trash2 />
						</Button>
					</form>
				</Table.Cell>
			</Table.Row>
		{/each}
	</DnD>
</Table.Root>
