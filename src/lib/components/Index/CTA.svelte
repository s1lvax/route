<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { UserPen } from 'lucide-svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { IconBrandGithub, IconBrandDiscordFilled } from '@tabler/icons-svelte';
</script>

<div>
	<div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
				Ready to Showcase Your Developer Profile?
			</h2>
			<p class="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-muted-foreground">
				Start building a custom, developer-driven profile today. Share your projects, skills, and
				GitHub stats with the world in just a few clicks.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				{#if $page.data.session}
					<Button href="/profile" class="flex items-center space-x-2">
						<UserPen />
						<span>My Profile</span>
					</Button>
				{:else}
					<Button on:click={() => signIn('github')} class="flex items-center space-x-2">
						<IconBrandGithub />
						<span>Sign in with Github</span>
					</Button>
				{/if}
				<Button
					href="https://discord.gg/UJPrgQvrUv"
					target="_blank"
					class="flex items-center space-x-2"
					variant="secondary"
				>
					<IconBrandDiscordFilled />
					<span>Join the Community</span>
				</Button>
			</div>
		</div>
	</div>
</div>
