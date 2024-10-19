<script lang="ts">
	import { BriefcaseBusiness, Trash2 } from 'lucide-svelte';
	import { masteryLevels } from '$lib/constants/masteryLevel';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { confirmDelete } from '$lib/utils/confirmDelete';
	import DnD from '$lib/components/Shared/DnD.svelte';
	import type { Skill } from '@prisma/client/wasm';

	export let skills: Skill[];

	let dragDisabled = false;
	async function handleDrop() {
		dragDisabled = true;
		await fetch('/profile/skills/order', {
			method: 'PATCH',
			body: JSON.stringify({ skills }),
			headers: {
				'content-type': 'application/json'
			}
		});
		dragDisabled = false;
	}
</script>

<DnD
	items={skills}
	dndOptions={{ dragDisabled }}
	updateNewItems={(newSkills) => (skills = newSkills)}
	class="grid gap-4"
	onDrop={handleDrop}
>
	{#each skills as skill(skill.id)}
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
</DnD>
