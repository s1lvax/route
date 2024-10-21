<script lang="ts">
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import type { GithubData } from '$lib/types/GithubData';

	import BasicInfo from '$lib/components/PublicProfile/BasicInfo.svelte';
	import GithubStats from '$lib/components/PublicProfile/GithubStats.svelte';
	import Links from '$lib/components/PublicProfile/Links.svelte';
	import TechStack from '$lib/components/PublicProfile/TechStack.svelte';
	import ProfileFooter from '$lib/components/PublicProfile/ProfileFooter.svelte';

	// Accept userData as a prop
	export let userData: PublicProfile;

	//Accept githubData as a prop
	export let githubData: GithubData | null;
</script>

<!-- Main Profile Content -->
<div class="flex min-h-screen w-full flex-col items-center">
	<main class="flex w-full max-w-6xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<BasicInfo {githubData} {userData} />
		<GithubStats {githubData} />

		<!-- Links and Skills Side by Side -->
		<div class="mt-8 grid gap-4 md:grid-cols-2">
			<Links {userData} />
			<TechStack {userData} />
		</div>
		<div class="flex flex-col items-center justify-center gap-4">
			<ProfileFooter />
		</div>
	</main>
</div>
