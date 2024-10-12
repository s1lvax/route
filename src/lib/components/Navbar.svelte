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
				><img src="/logo.png" alt="logo" class="h-12 w-auto md:h-14 lg:h-16" /></a
			>
		</nav>
		<a href="/">
			<img src="/logo.png" alt="logo" class="h-8 w-auto md:h-6 lg:h-8" />
		</a>
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
