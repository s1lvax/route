<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Loader2, UserPen, ChevronRight } from 'lucide-svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getReleaseVersion } from '$lib/utils/getReleaseVersion';
	import { IconBrandGithub, IconBrandDiscordFilled } from '@tabler/icons-svelte';

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
							<ChevronRight class="h-5 w-5 text-gray-500" />
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
				{:else}
					<Button on:click={() => signIn('github')} class="flex items-center space-x-2"
						><IconBrandGithub /> <span>Sign in with Github</span></Button
					>
				{/if}
				<Button
					href="https://discord.gg/9XuRcaZR"
					target="_blank"
					class="flex items-center space-x-2"
					variant="secondary"
				>
					<IconBrandDiscordFilled />
					<span>Join the Community</span>
				</Button>
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
