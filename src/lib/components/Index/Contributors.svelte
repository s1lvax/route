<script lang="ts">
	import { onMount } from 'svelte';
	import type { Contributor } from '$lib/types/GithubData';

	let contributors: Contributor[] = [];

	onMount(async () => {
		const response = await fetch('https://api.github.com/repos/s1lvax/route/contributors');
		contributors = await response.json();
	});
</script>

<div class="mt-12 py-32 sm:py-24">
	<div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
		<ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
			{#each contributors as contributor}
				<a href={contributor.html_url}>
					<li>
						<div class="flex items-center gap-x-6">
							<img
								class="h-16 w-16 rounded-full"
								src={contributor.avatar_url}
								alt="{contributor.login}'s avatar"
							/>
							<div>
								<h3 class="text-base font-semibold leading-7 tracking-tight">
									{contributor.login}
								</h3>
								<p class="text-sm font-semibold leading-6 text-muted-foreground">
									{contributor.contributions} contributions
								</p>
							</div>
						</div>
					</li>
				</a>
			{/each}
		</ul>
		<div class="max-w-xl">
			<div class="flex flex-col space-y-4">
				<h2 class="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
					Meet our contributors
				</h2>
			</div>
			<p class="mt-6 text-lg leading-8 text-muted-foreground">
				Built by developers, for developers. Meet the contributors who make this project possible.
			</p>
		</div>
	</div>
</div>
