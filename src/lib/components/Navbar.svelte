<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { LogOut } from 'lucide-svelte';
	import { signOut } from '@auth/sveltekit/client';

	import { toggleMode } from 'mode-watcher';
	import { page } from '$app/stores';

	import * as Avatar from '$lib/components/ui/avatar';
</script>

<header class="sticky top-0 z-10 items-center border-b bg-background">
	<div class="container flex h-16 items-center justify-between gap-4">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base"
				><span>CONNEKT.DEV</span></a
			>
		</nav>
		<a href="/"
			><svg
				width="71"
				height="71"
				viewBox="0 0 71 71"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="h-auto w-5 sm:hidden"
				><path d="M25.5284 70.664H70.5509L48.0386 31.6714L25.5284 70.664Z" fill="#121212"
				></path><path
					d="M19.1436 38.4004C29.7162 38.4004 38.2871 29.8295 38.2871 19.2568C38.2871 8.68414 29.7162 0.113281 19.1436 0.113281C8.57086 0.113281 0 8.68414 0 19.2568C0 29.8295 8.57086 38.4004 19.1436 38.4004Z"
					fill="#121212"
				></path></svg
			></a
		>
		<div class="flex w-auto items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>

			{#if $page.data.session}
				{#if $page.data.session.user}
					<a href="/profile">
						<Avatar.Root>
							<Avatar.Image src={$page.data.session.user.image} alt="@github.user" />
							<Avatar.Fallback>X</Avatar.Fallback>
						</Avatar.Root>
					</a>
				{/if}
				<Button on:click={() => signOut()} variant="destructive" class="flex items-center space-x-2"
					><LogOut /> <span>Logout</span></Button
				>
			{/if}
		</div>
	</div>
</header>
