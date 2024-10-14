<script lang="ts">
	import { BriefcaseBusiness, Trash2 } from 'lucide-svelte';

	export let skills;

	import { masteryLevels } from '$lib/constants/masteryLevel';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { confirmDelete } from '$lib/utils/confirmDelete';
</script>

<div class="grid gap-4">
	{#each skills as skill}
		<div class="flex items-center gap-4">
			<BriefcaseBusiness />
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">{skill.title}</p>
				<p class="text-sm text-muted-foreground">
					{masteryLevels.find((level) => level.value === String(skill.level))?.label}
				</p>
			</div>
			<div class="ml-auto font-medium">
				<form action="?/deleteSkill&id={skill.id}" method="POST" use:enhance>
					<Button type="submit" id="deleteLink" variant="ghost" on:click={confirmDelete}
						><Trash2 /></Button
					>
				</form>
			</div>
		</div>
	{/each}
</div>
