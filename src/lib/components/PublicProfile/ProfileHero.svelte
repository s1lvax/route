<script lang="ts">
	import type { GithubData } from '$lib/types/GithubData';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import GithubStats from '$lib/components/PublicProfile/GithubStats.svelte';
	import UserInfo from '$lib/components/PublicProfile/UserInfo.svelte';

	export let githubData: GithubData | null;
	export let userData: PublicProfile;
</script>

<!-- User Avatar and Basic Info -->
<div class="grid items-center gap-4 sm:grid-cols-1 md:grid-cols-[70%_30%]">
	<div class="user-info h-full">
		<UserInfo {githubData} {userData} />
	</div>
	<div class="stats h-full">
		<GithubStats {githubData} />
	</div>
</div>
