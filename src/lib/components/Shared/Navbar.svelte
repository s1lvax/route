<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { LogOut } from 'lucide-svelte';
	import { signOut } from '@auth/sveltekit/client';

	import { page } from '$app/stores';

	import * as Avatar from '$lib/components/ui/avatar';
	import LightDarkMode from '$lib/components/Shared/LightDarkMode.svelte';
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
		<div class="flex w-auto items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<LightDarkMode />
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
