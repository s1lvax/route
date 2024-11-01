<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconBrandGithub } from '@tabler/icons-svelte';
	import type { Repository } from '$lib/types/GithubData';
	import ImportFromGithubModal from '$lib/components/MyProfile/ImportFromGithubModal.svelte';

	export let username: string;
	export let linksLength: number;

	$: isLimitReached = linksLength >= 15;
	let isModalVisible = false;
	let repos: Repository[] = [];

	const fetchGithubRepos = async (username: string) => {
		try {
			const response = await fetch(`https://api.github.com/users/${username}/repos`);
			repos = await response.json();
			isModalVisible = true;
		} catch (error) {
			console.error('Error fetching GitHub repos:', error);
		}
	};

	const closeModal = () => {
		isModalVisible = false;
	};
</script>

<div class="flex space-x-4">
	<Button
		disabled={isLimitReached}
		class="flex space-x-2"
		on:click={() => fetchGithubRepos(username)}
	>
		<IconBrandGithub />
		<span>Import from GitHub</span>
	</Button>
</div>

{#if isModalVisible}
	<ImportFromGithubModal {repos} {isModalVisible} {closeModal} {linksLength} />
{/if}
