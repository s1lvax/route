<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import { getProgressValue } from '$lib/utils/getProgressValue';
	import { onMount } from 'svelte';

	export let userData: PublicProfile;

	let progressValues: { [key: string]: number } = {};

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
		<Card.Title>Skills & Tools</Card.Title>
		<Card.Description>Explore the developer's skills and expertise</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if userData.skills.length > 0}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Skill</Table.Head>
						<Table.Head>Proficiency</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each userData.skills as skill}
						<Table.Row>
							<Table.Cell>{skill.title}</Table.Cell>
							<Table.Cell class="w-[60%]">
								<Progress
									value={progressValues[skill.title]}
									max={100}
									class="w-full transition-all ease-in-out"
									style="transition-duration: 3000ms;"
								/>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<p class="text-muted-foreground">No skills available</p>
		{/if}
	</Card.Content>
</Card.Root>
