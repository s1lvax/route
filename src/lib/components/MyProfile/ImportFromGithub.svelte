<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import GitHub from 'lucide-svelte/icons/github';
	import type { PageData } from '../../../routes/profile/$types';
	import type { Repository } from '$lib/types/GithubData';
	import ImportFromGithubModal from '$lib/components/MyProfile/ImportFromGithubModal.svelte';

	export let data: PageData;

	$: isLimitReached = data.links.length >= 15;
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

<Button
	disabled={isLimitReached}
	class="mt-5 flex align-bottom"
	on:click={() => fetchGithubRepos(data.userData.username)}
>
	<GitHub /> Import from GitHub
</Button>

{#if isModalVisible}
	<ImportFromGithubModal {repos} {isModalVisible} {closeModal} />
{/if}
