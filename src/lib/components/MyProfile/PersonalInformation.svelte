<script lang="ts">
	import type { PersonalInformation } from '@prisma/client';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Trash2, Copy } from 'lucide-svelte';
	import { confirmDelete } from '$lib/utils/confirmDelete';
	import { enhance } from '$app/forms';
	import { copyToClipboard } from '$lib/utils/copyToClipboard';

	export let data: PersonalInformation;

	$: isDataAvailable =
		data != null &&
		Object.entries(data)
			.filter((entry) => !['userId', 'id'].includes(entry[0]))
			.some((entry) => {
				return entry[1] != '' && entry[1] != null;
			});
	$: rows = [
		{ field: 'email', label: 'Email Address', value: () => data.email },
		{ field: 'fullName', label: 'Full Name', value: () => data.fullName }
	];
</script>

{#if isDataAvailable}
	<Table.Root>
		<Table.Header>
			<Table.Row></Table.Row>
		</Table.Header>
		<Table.Body>
			{#each rows as row}
				{#if row.value()}
					<Table.Row>
						<Table.Head>
							<Table.Cell>{row.label}</Table.Cell>
						</Table.Head>
						<Table.Cell>
							<div class="flex w-full items-center space-x-2">
								<span>{row.value()}</span>
								<Button
									variant="ghost"
									on:click={() => {
										const val = row.value();
										if (val) copyToClipboard(val);
									}}
								>
									<Copy
										class="h-4 w-4 transform transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
									/>
								</Button>
							</div>
						</Table.Cell>
						<Table.Cell>
							<div class="float-right">
								<form
									action="?/resetPersonalInformation&field={row.field}"
									method="POST"
									use:enhance
								>
									<Button type="submit" variant="ghost" on:click={confirmDelete}>
										<Trash2 />
									</Button>
								</form>
							</div>
						</Table.Cell>
					</Table.Row>
				{/if}
			{/each}
		</Table.Body>
	</Table.Root>
{:else}
	<p>No data yet</p>
{/if}
