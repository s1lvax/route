<script lang="ts">
	import { IdCard } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	import type { GithubData } from '$lib/types/GithubData';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { Social } from '@prisma/client';
	import { findSocialIcon } from '$lib/utils/findSocialIcon';
	import { handleSocialClick } from '$lib/utils/handleSocialClick';
	import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-svelte';

	export let githubData: GithubData | null;
	export let socials: Social[] = [];
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
						<IconBrandGithub />
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
							<IconBrandTwitter />
							<span>Twitter Profile</span>
						</a>
					</Table.Cell>
				</Table.Row>
			{/if}
			{#each socials as social}
				<Table.Row>
					<Table.Cell class="p-0 hover:cursor-pointer" on:click={() => handleSocialClick(social)}>
						<span class="flex items-center space-x-8 p-4">
							<svelte:component this={findSocialIcon(social.social)} />
							<span>{social.social}</span>
						</span>
					</Table.Cell>
				</Table.Row>
			{/each}
		{:else}
			{#each { length: 3 } as _}
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
