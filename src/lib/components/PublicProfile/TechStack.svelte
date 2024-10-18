<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import { getProgressValue } from '$lib/utils/getProgressValue';
	import { onMount } from 'svelte';

	let progressValues: { [key: string]: number } = {};

	export let userData: PublicProfile;

	//for the progress bar animation
	onMount(() => {
		userData.skills.forEach((skill) => {
			progressValues[skill.title] = 0;
			setTimeout(() => {
				progressValues[skill.title] = getProgressValue(skill.level);
			}, 100);
		});
	});
</script>

<!-- Tech Stack Section -->
<Card.Root>
	<Card.Header>
		<Card.Title>Tech Stack</Card.Title>
		<Card.Description>Explore the developer's skills and expertise</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if userData.skills.length > 0}
			{#each userData.skills as skill}
				<div class="flex items-center justify-between">
					<span>{skill.title}</span>
					<Progress
						value={progressValues[skill.title]}
						max={100}
						class="w-[60%] transition-all ease-in-out"
						style="transition-duration: 3000ms;"
					/>
				</div>
			{/each}
		{:else}
			<p class="text-muted-foreground">No skills available</p>
		{/if}
	</Card.Content>
</Card.Root>
