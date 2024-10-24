<script lang="ts">
	import { IdCard, Twitter } from 'lucide-svelte';
	import GitHub from 'lucide-svelte/icons/github';
	import * as Table from '$lib/components/ui/table';
	import type { GithubData } from '$lib/types/GithubData';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let githubData: GithubData | null;
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Socials</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body class="block max-h-28 overflow-y-scroll [&>*]:border-b-0">
		{#if githubData}
			<!-- GitHub Profile -->
			<Table.Row>
				<Table.Cell class="p-0">
					<a class="flex items-center space-x-8 p-4" href={githubData?.url ?? '#'} target="_blank">
						<GitHub />
						<span>GitHub Profile</span>
					</a>
				</Table.Cell>
			</Table.Row>

			<!-- Blog Profile -->
			{#if githubData?.blog}
				<Table.Row>
					<Table.Cell class="p-0">
						<a
							class="flex items-center space-x-8 p-4"
							href={githubData?.blog ?? '#'}
							target="_blank"
						>
							<IdCard />
							<span>Website</span>
						</a>
					</Table.Cell>
				</Table.Row>
			{/if}

			<!-- Twitter Profile -->
			{#if githubData?.twitter}
				<Table.Row>
					<Table.Cell class="p-0">
						<a
							class="flex items-center space-x-8 p-4"
							href={`https://x.com/${githubData?.twitter}`}
							target="_blank"
						>
							<Twitter />
							<span>Twitter Profile</span>
						</a>
					</Table.Cell>
				</Table.Row>
			{/if}
			<!-- Socials will be here when we implement it -->
		{:else}
			{#each { length: 2 } as _}
				<Table.Row class="block">
					<Table.Cell class="flex space-x-8">
						<Skeleton class="h-6 w-6 rounded-full" />
						<Skeleton class="h-6 flex-grow" />
					</Table.Cell>
				</Table.Row>
			{/each}
		{/if}
	</Table.Body>
</Table.Root>
