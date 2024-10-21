<script lang="ts">
	import PublicProfile from '$lib/components/PublicProfile/PublicProfile.svelte';
	import type { GithubData } from '$lib/types/GithubData';
	import { getGithubData } from '$lib/utils/getGithubData';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let githubData: GithubData | null = null;

	onMount(async () => {
		githubData = await getGithubData(data.userData.username);
	});
</script>

<PublicProfile userData={data.userData} {githubData} />
