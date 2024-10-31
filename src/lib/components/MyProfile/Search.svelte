<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Loader2 } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import type { SearchResults } from '$lib/types/SearchResults';

	let searchText = '';
	let searchResults: SearchResults[] = [];
	let typingTimer: ReturnType<typeof setTimeout>;
	const typingInterval = 1500;
	let isModalVisible = false;
	let noResults = false;
	let loading = false;

	const handleSearch = async () => {
		if (!searchText) {
			searchResults = [];
			isModalVisible = false;
			noResults = false;
			loading = false;
			return;
		}
		loading = true;
		await fetch(`/api/search?searchText=${searchText}`)
			.then((response) => response.json())
			.then((data) => {
				searchResults = data;
				isModalVisible = searchResults.length > 0;
				noResults = searchResults.length === 0;
			})
			.catch((error) => {
				console.error('Error:', error);
			})
			.finally(() => {
				loading = false;
			});
	};

	const handleInput = (event: InputEvent) => {
		searchText = (event.target as HTMLInputElement).value;
		clearTimeout(typingTimer);
		typingTimer = setTimeout(handleSearch, typingInterval);
	};

	const closeModal = () => {
		isModalVisible = false;
		searchText = '';
		searchResults = [];
		noResults = false;
	};
</script>

<form class="relative flex flex-1 flex-col" action="#" method="GET">
	<label for="search-field" class="sr-only">Search</label>
	<div class="flex items-center space-x-2">
		{#if loading}
			<div class="animate-spin text-gray-500">
				<Loader2 />
			</div>
		{/if}
		<Input
			id="search-field"
			placeholder="Search..."
			type="search"
			name="search"
			bind:value={searchText}
			class={`border ${noResults ? 'border-red-500' : ''}`}
			on:input={handleInput}
			disabled={loading}
		/>
	</div>
</form>

{#if isModalVisible}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="relative w-full max-w-2xl overflow-y-auto rounded-lg p-6 shadow-lg">
			<div class="flex justify-end">
				<button on:click={closeModal} class="text-gray-500 hover:text-gray-700 focus:outline-none">
					&times;
				</button>
			</div>

			<div class="grid grid-cols-1 gap-4">
				{#each searchResults as userData}
					<a href="/{userData.githubUsername}">
						<Card.Root
							class="grid grid-cols-1 gap-4 rounded-lg p-4 shadow-lg hover:cursor-pointer hover:border hover:border-gray-400 md:grid-cols-2"
						>
							<div
								class="flex items-center space-x-4 md:flex-col md:items-center md:space-x-0 md:space-y-2 md:text-center"
							>
								<img
									src={`https://github.com/${userData.githubUsername}.png`}
									alt={`${userData.githubUsername}'s profile picture`}
									class="h-16 w-16 rounded-full object-cover"
								/>
								<div class="flex flex-col items-start space-y-1 md:items-center md:text-center">
									<Card.Header class="flex flex-col items-start md:items-center">
										<Card.Title class="text-lg font-semibold">{userData.githubUsername}</Card.Title>
										{#if userData.openToCollaborating}
											<span
												class="rounded-full border border-green-700 px-2 py-1 text-xs font-medium"
											>
												Open to Collaborating
											</span>
										{:else}
											<span
												class="rounded-full border border-red-700 px-2 py-1 text-xs font-medium"
											>
												Not Open to Collaborating
											</span>
										{/if}
									</Card.Header>
								</div>
							</div>

							<div class="skills-hobbies">
								<div class="flex flex-col items-start space-y-2">
									{#if userData.Skill.length > 0}
										<div>
											<h3 class="text-sm font-medium">Skills</h3>
											<ul class="mt-1 flex flex-wrap gap-2">
												{#each userData.Skill.slice(0, 3) as skill}
													<li
														class="rounded-full border border-gray-800 px-3 py-1 text-xs font-medium"
													>
														{skill.title} (Lvl {skill.level})
													</li>
												{/each}
												{#if userData.Skill.length > 3}
													<li class="text-xs font-medium">...</li>
												{/if}
											</ul>
										</div>
									{/if}

									{#if userData.Hobby.length > 0}
										<div>
											<h3 class="text-sm font-medium">Hobbies</h3>
											<ul class="mt-1 flex flex-wrap gap-2">
												{#each userData.Hobby.slice(0, 3) as hobby}
													<li
														class="rounded-full border border-gray-800 px-3 py-1 text-xs font-medium"
													>
														{hobby.hobby}
													</li>
												{/each}
												{#if userData.Hobby.length > 3}
													<li class="text-xs font-medium">...</li>
												{/if}
											</ul>
										</div>
									{/if}
								</div>
							</div>
						</Card.Root>
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}
