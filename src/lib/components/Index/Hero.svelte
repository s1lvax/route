<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { UserPen, Github, LogOut } from 'lucide-svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { version } from '$app/environment';

	export let releaseVersion: string | null;
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
					{#if releaseVersion}
						<span class="inline-flex items-center space-x-2 text-sm font-medium leading-6">
							<span>{'Just shipped ' + releaseVersion}</span>
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
						on:click={() => signOut()}
						variant="destructive"
						class="flex items-center space-x-2"><LogOut /> <span>Logout</span></Button
					>
				{:else}
					<Button on:click={() => signIn('github')} class="flex items-center space-x-2"
						><Github /> <span>Sign in with Github</span></Button
					>
				{/if}
			</div>
		</div>
		<div
			class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
		>
			<div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
				<img
					src="https://i.imgur.com/KtVWxtM.png"
					alt="App screenshot"
					width="2432"
					height="1442"
					class="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
				/>
			</div>
		</div>
	</div>
</div>
