<script lang="ts">
	import Timeline from '$lib/components/MyProfile/Timeline.svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import UserStats from '$lib/components/MyProfile/UserStats.svelte';
	import { getGithubData } from '$lib/utils/getGithubData';
	import type { GithubData } from '$lib/types/GithubData';
	import { onMount } from 'svelte';
	import type { PrivateProfileData } from '$lib/types/PrivateProfileData';

	let githubData: GithubData | null = null;
	let privateProfileData: PrivateProfileData | null = null;
	export let data: PageData;

	// Fetch GitHub data on component mount
	onMount(async () => {
		try {
			githubData = await getGithubData(data.userData.username);

			// Now that githubData is available, assign to privateProfileData
			if (githubData) {
				privateProfileData = {
					views: data.userData.views,
					followers: githubData.followers,
					repoCount: githubData.repoCount,
					contributionsCount: githubData.contributionsCount
				};
			}
		} catch (error) {
			console.error('Error fetching GitHub data:', error);
		}
	});
</script>

<UserStats {privateProfileData} />

<div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
	<Card.Root class="col-span-4">
		<Card.Header>
			<Card.Title>Recent Activity</Card.Title>
		</Card.Header>
		<Card.Content>
			<Timeline recentActivity={data.recentActivity} />
		</Card.Content>
	</Card.Root>
	<Card.Root class="col-span-3">
		<Card.Header>
			<Card.Title>We need something here</Card.Title>
			<Card.Description>You made 265 sales this month.</Card.Description>
		</Card.Header>
		<Card.Content>ddddd</Card.Content>
	</Card.Root>
</div>
