<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Repository } from '$lib/types/GithubData';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Star, Github } from 'lucide-svelte';

	export let repos: Repository[] = [];
	export let isModalVisible: boolean;
	export let closeModal: () => void;
	export let linksLength: number;

	// set to track selected repositories
	let selectedRepos = new Set<Repository>();

	// check if limit is reached
	$: isLimitReached = linksLength + selectedRepos.size > 15;

	// toggle repository on set
	const toggleSelection = (repo: Repository) => {
		if (selectedRepos.has(repo)) {
			selectedRepos.delete(repo);
		} else {
			selectedRepos.add(repo);
		}
		// Create a new instance to trigger reactivity
		selectedRepos = new Set(selectedRepos);
	};

	// handler for clickbox events
	const handleCheckboxClick = (e: Event, repo: Repository) => {
		toggleSelection(repo);
	};

	// sort
	$: sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);

	const importSelectedRepos = async () => {
		const selectedData = Array.from(selectedRepos).map((repo) => ({
			name: `GitHub - ${repo.name}`,
			url: repo.html_url
		}));

		try {
			const response = await fetch('/api/github/import-repos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ links: selectedData })
			});

			console.log(response);

			if (response.ok) {
				// close the modal on successful import
				closeModal();
				// refresh the page to see the new links
				window.location.reload();
			} else {
				console.error('Failed to save links:', await response.json());
			}
		} catch (error) {
			console.error('Error importing links:', error);
		}
	};
</script>

{#if isModalVisible}
	<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div
			class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
			aria-hidden="true"
		></div>

		<div class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
			<div
				class="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-md"
			>
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex flex-row items-center gap-2">
							<Github /> Import From Github
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head></Table.Head>
									<Table.Head>Name</Table.Head>
									<Table.Head>Stars</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body class="max-h-28 overflow-y-scroll">
								{#each sortedRepos as repo}
									<Table.Row>
										<Table.Cell>
											<Checkbox
												checked={selectedRepos.has(repo)}
												on:click={(e) => handleCheckboxClick(e, repo)}
											/>
										</Table.Cell>
										<Table.Cell class="font-medium">{repo.name}</Table.Cell>
										<Table.Cell class="flex flex-row items-center gap-2">
											<Star class="text-sm" />
											{repo.stargazers_count}
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</Card.Content>
					<div class="flex flex-row items-center gap-2 p-4">
						<Button type="button" on:click={importSelectedRepos} disabled={isLimitReached}
							>Import</Button
						>
						<Button type="button" variant="secondary" on:click={closeModal}>Cancel</Button>
					</div>
					{#if isLimitReached}
						<p class="p-4 text-sm text-red-500">You have reached the maximum number of 15 links.</p>
					{/if}
				</Card.Root>
			</div>
		</div>
	</div>
{/if}
