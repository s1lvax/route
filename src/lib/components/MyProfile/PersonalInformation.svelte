<script lang="ts">
	import type { PersonalInformation } from '@prisma/client';
	import * as Table from '$lib/components/ui/table';

	export let data: PersonalInformation;
</script>

{#if data}
	<Table.Root>
		<Table.Header>
			<Table.Row></Table.Row>
		</Table.Header>
		<Table.Body>
			{#if data.email}
				<Table.Row>
					<Table.Head>
						<Table.Cell>Email Address</Table.Cell>
					</Table.Head>
					<Table.Cell>
						{data.email}
					</Table.Cell>
				</Table.Row>
			{/if}
			{#if data.fullName}
				<Table.Row>
					<Table.Head>
						<Table.Cell>Full Name</Table.Cell>
					</Table.Head>
					<Table.Cell>
						{data.fullName}
					</Table.Cell>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
{:else}
	<p>No data yet</p>
{/if}
