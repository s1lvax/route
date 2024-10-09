<script>
	import NewSection from '$lib/components/NewSection.svelte';
	import { Button } from '$lib/components/ui/button';
	import { UserPen, Github } from 'lucide-svelte';
</script>

<NewSection>
	<h1 class="mb-8 text-center text-3xl font-bold md:text-6xl">
		Build, Connect, and Showcase with Connekt.dev
	</h1>
	<p class="mb-2 text-center md:text-lg">
		Keep your GitHub activity live, showcase your tools, and create a portfolio that highlights your
		skills—all in one dynamic platform.
	</p>
	<div class="mt-10 flex w-auto items-center justify-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
		<Button href="/auth" class="flex items-center space-x-2"
			><UserPen /> <span>My Profile</span></Button
		>
		<Button href="https://github.com" variant="secondary" class="flex items-center space-x-2"
			><Github /> <span>Contribute</span></Button
		>
	</div>
</NewSection>
