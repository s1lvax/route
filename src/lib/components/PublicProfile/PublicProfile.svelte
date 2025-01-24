<script lang="ts">
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import type { GithubData } from '$lib/types/GithubData';

	import Links from '$lib/components/PublicProfile/Links.svelte';
	import TechStack from '$lib/components/PublicProfile/TechStack.svelte';
	import ProfileFooter from '$lib/components/PublicProfile/ProfileFooter.svelte';
	import ProfileHero from '$lib/components/PublicProfile/ProfileHero.svelte';
	import { Separator } from '$lib/components//ui/separator';
	import ChessComStats from '$lib/components/MyProfile/ChessComStats.svelte';
	import LeetCodeStats from '$lib/components/MyProfile/LeetCodeStats.svelte';
	import CodewarsStats from '$lib/components/MyProfile/CodewarsStats.svelte';

	// Accept userData as a prop
	export let userData: PublicProfile;
	//Accept githubData as a prop
	export let githubData: GithubData | null;
</script>

<!-- Main Profile Content -->
<div class="flex min-h-screen w-full flex-col items-center">
	<main class="flex w-full max-w-7xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<ProfileHero {githubData} {userData} />

		<Separator class="my-4" />

		<!-- Links, Tech Stack, and Chess Stats Side by Side -->
		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
			{#if userData.links.length > 0}
				<Links {userData} />
			{/if}

			{#if userData.skills.length > 0}
				<TechStack {userData} />
			{/if}

			<!-- Chess Stats Section -->
			{#if userData.chessComUsername != null}
				<ChessComStats chessComUsername={userData.chessComUsername} />
			{/if}

			<!-- LeetCode Stats Section -->
			{#if userData.leetCode != null}
				<LeetCodeStats leetCodeUsername={userData.leetCode.username} />
			{/if}

			<!-- Codewars Stats Section -->
			{#if userData.codewars != null}
				<CodewarsStats codewarsUsername={userData.codewars.username} />
			{/if}
		</div>

		<div class="flex flex-col items-center justify-center gap-4">
			<ProfileFooter crypto={userData.crypto} />
		</div>
	</main>
</div>
