<script lang="ts">
	import type { GithubData } from '$lib/types/GithubData';
	import { Folder } from 'lucide-svelte';
	import GitHub from 'lucide-svelte/icons/github';
	import StatsCard from '$lib/components/Shared/StatsCard.svelte';
	import StatsCardSkeleton from '$lib/components/Shared/StatsCardSkeleton.svelte';

	export let githubData: GithubData | null;
</script>

<!-- GitHub Stats Cards -->
<div class="flex flex-col space-y-4">
	{#if githubData}
		<StatsCard icon={Folder} title="Projects on Github" data={githubData.repoCount.toString()} />
		<StatsCard
			icon={GitHub}
			title="GitHub Contributions (Past 30 Days)"
			data={githubData.contributionsCount.toString()}
		/>
		<StatsCard icon={GitHub} title="GitHub Followers" data={githubData.followers.toString()} />
	{:else}
		{#each { length: 3 } as _}
			<StatsCardSkeleton />
		{/each}
	{/if}
</div>
