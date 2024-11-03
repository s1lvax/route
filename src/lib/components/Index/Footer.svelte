<script>
	import { IconBrandGithub, IconMessage } from '@tabler/icons-svelte';
</script>

<footer class="border-t">
	<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
		<div class="flex justify-center space-x-6 md:order-2">
			<a href="https://github.com/s1lvax/route" class="text-gray-400 hover:text-gray-500">
				<svelte:component this={IconBrandGithub} />
			</a>
			<a href="mailto:silva@cfsilva.com" class="text-gray-400 hover:text-gray-500">
				<svelte:component this={IconMessage} />
			</a>
			<a href="/privacy-policy" class="text-gray-400 hover:text-gray-500">
				<p>Privacy Policy</p>
			</a>
		</div>
		<div class="mt-8 md:order-1 md:mt-0">
			<p class="text-center text-xs leading-5 text-gray-500">&copy; 2024 Route</p>
		</div>
	</div>
</footer>
