<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconBrandGithub } from '@tabler/icons-svelte';
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

<div class="flex w-full space-x-4">
	<div class="space-y-2">
		<span class="invisible block">a</span>
		<Button
			disabled={isLimitReached}
			class="flex space-x-2"
			on:click={() => fetchGithubRepos(data.userData.username)}
		>
			<IconBrandGithub />
			<span>Import from GitHub</span>
		</Button>
	</div>
</div>

{#if isModalVisible}
	<ImportFromGithubModal {repos} {isModalVisible} {closeModal} linksLength={data.links.length} />
{/if}
