<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Loader2, UserPen, Github, LogOut } from 'lucide-svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getReleaseVersion } from '$lib/utils/getReleaseVersion';

	// undefined means that we haven't received the result from getReleaseVersion
	// null means that getReleaseVersion couldn't find the release version
	let releaseVersion: string | null | undefined = undefined;
	onMount(async () => {
		releaseVersion = await getReleaseVersion();
	});
</script>

<div class="relative isolate overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
		<div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:pt-8">
			<div class="mt-24 sm:mt-32 lg:mt-16">
				<a href="https://github.com/s1lvax/route" class="inline-flex space-x-6">
					<span
						class="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-indigo-500/20"
						>What's new</span
					>
					{#if releaseVersion !== null}
						<span class="inline-flex items-center space-x-2 text-sm font-medium leading-6">
							<span>Just shipped</span>
							{#if releaseVersion === undefined}
								<div class="animate-spin">
									<Loader2 />
								</div>
							{:else}
								<span>{releaseVersion}</span>
							{/if}
							<svg
								class="h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								data-slot="icon"
							>
								<path
									fill-rule="evenodd"
									d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
					{/if}
				</a>
			</div>
			<h1 class="mt-10 text-pretty text-5xl font-semibold tracking-tight sm:text-7xl">
				Your Developer Identity, Streamlined and Simplified
			</h1>
			<p class="text-md mt-8 text-pretty text-muted-foreground sm:text-xl/8">
				Create a profile that highlights your GitHub stats and key projects—simple, clean, and
				yours.
			</p>
			<div class="mt-10 flex items-center gap-x-6">
				{#if $page.data.session}
					<Button href="/profile" class="flex items-center space-x-2"
						><UserPen /> <span>My Profile</span></Button
					>
					<Button
						href="https://discord.gg/9XuRcaZR"
						target="_blank"
						class="flex items-center space-x-2"
						variant="secondary"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="icon icon-tabler icons-tabler-filled icon-tabler-brand-discord"
							><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
								d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"
							/></svg
						> <span>Join the Community</span></Button
					>
				{:else}
					<Button on:click={() => signIn('github')} class="flex items-center space-x-2"
						><Github /> <span>Sign in with Github</span></Button
					>
					<Button
						href="https://discord.gg/9XuRcaZR"
						target="_blank"
						class="flex items-center space-x-2"
						variant="secondary"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="icon icon-tabler icons-tabler-filled icon-tabler-brand-discord"
							><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
								d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"
							/></svg
						> <span>Join the Community</span></Button
					>
				{/if}
			</div>
		</div>
		<div
			class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
		>
			<div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
				<img
					src="https://i.imgur.com/mSXJ4E3.png"
					alt="App screenshot"
					width="2432"
					height="1442"
					class="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
				/>
			</div>
		</div>
	</div>
</div>
