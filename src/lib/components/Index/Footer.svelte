<script>
	import { socials } from '$lib/constants/socials';
	import { findSocialIcon } from '$lib/utils/findSocialIcon';
</script>

<footer class="border-t">
	<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
		<div class="flex justify-center space-x-6 md:order-2">
			{#each socials as social}
				<a href={social.link} class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">{social.name}</span>
					<svelte:component this={findSocialIcon(social.name)} />
				</a>
			{/each}
		</div>
		<div class="mt-8 md:order-1 md:mt-0">
			<p class="text-center text-xs leading-5 text-gray-500">&copy; 2024 Route</p>
		</div>
	</div>
</footer>
