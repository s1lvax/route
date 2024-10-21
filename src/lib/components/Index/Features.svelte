<script>
	import { features } from '$lib/constants/features';
</script>

<div class=" py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
				Unleash the Power of Your Developer Profile
			</h2>
			<p class="mt-6 text-lg leading-8 text-muted-foreground">
				Designed to showcase your skills, projects, and contributions effortlessly, Route empowers
				developers to tell their story with ease.
			</p>
		</div>
		<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
			<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
				{#each features as feature}
					<div class="flex flex-col">
						<dt class="text-base font-semibold leading-7">
							<div
								class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-transparent"
							>
								<svelte:component this={feature.icon} />
							</div>
							{feature.name}
						</dt>
						<dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
							<p class="flex-auto">
								{feature.description}
							</p>
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</div>
