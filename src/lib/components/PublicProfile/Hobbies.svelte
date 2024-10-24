<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { PublicProfile } from '$lib/types/PublicProfile';

	export let userData: PublicProfile;
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Hobbies</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body class="block max-h-28 overflow-y-scroll [&>*]:border-b-0">
		{#if userData.hobbies.length > 0}
			{#each userData.hobbies as hobby}
				<Table.Row class="flex flex-row space-x-4 hover:cursor-pointer">
					<Table.Cell class="font-medium">{hobby.hobby}</Table.Cell>
				</Table.Row>
			{/each}
		{:else}
			<Table.Row class="flex flex-row space-x-4 hover:cursor-pointer">
				<Table.Cell class="font-medium">
					<p class="text-muted-foreground">No hobbies available</p></Table.Cell
				>
			</Table.Row>
		{/if}
	</Table.Body>
</Table.Root>
