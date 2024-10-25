<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { type Selected } from 'bits-ui';
	import { Input } from '$lib/components/ui/input';
	import { skillsSchema, type SkillsSchema } from '$lib/schemas/skills';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Skill } from '@prisma/client';
	import { masteryLevels } from '$lib/constants/masteryLevel';
	import { getMasteryLevelFromLabel, getMasteryLevelFromLevel } from '$lib/utils/getMasteryLevel';

	export let data: SuperValidated<Infer<SkillsSchema>>;
	export let skillsLength: number;
	export let skills: Skill[] = [];
	let isLimitReached = false;
	$: isLimitReached = skills.length >= 15;

	const form = superForm(data, {
		validators: zodClient(skillsSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				// Only reset the title, that way the user doesn't have to specify level of mastery every single time
				$formData.title = '';
			}
		}
	});

	const { form: formData, enhance, message } = form;

	$: $formData.order = skillsLength;
	$: selectedLevel = {
		value: '',
		label: ''
	};

	const onSelectedChange = (selected: Selected<string> | undefined) => {
		if (selected) {
			const level = getMasteryLevelFromLabel(selected.value);
			if (level) {
				$formData.level = level.value;
			}
		}
	};

	formData.subscribe((current) => {
		if (!selectedLevel) selectedLevel = { label: '', value: '' };
		selectedLevel.label = getMasteryLevelFromLevel(current.level)?.label ?? '';
		selectedLevel.value = current.level;
	});
</script>

<form
	method="POST"
	use:enhance
	action="?/createSkill"
	class="flex items-center justify-center space-x-4"
>
	<div class="flex flex-grow items-end space-x-2">
		<Form.Field {form} name="title">
			<Form.Control let:attrs>
				<Form.Label>Title</Form.Label>
				<Input {...attrs} bind:value={$formData.title} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="level" class="w-3/5">
			<Form.Control let:attrs>
				<Form.Label>Level of mastery</Form.Label>
				<Select.Root selected={selectedLevel} {onSelectedChange}>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select the level of your skill" />
					</Select.Trigger>
					<Select.Content>
						{#each masteryLevels as mastery}
							<Select.Item value={mastery.label} label={mastery.label} />
						{/each}
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.level} name={attrs.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="order">
			<Form.Control let:attrs>
				<Input {...attrs} bind:value={$formData.order} type="hidden" />
			</Form.Control>
		</Form.Field>

		<Form.Button class="mb-2" disabled={isLimitReached}>Add</Form.Button>
	</div>
</form>

{#if isLimitReached}
	<p class="mt-2 text-center text-red-500">You have reached the maximum limit of 15 skills.</p>
{:else if $message}
	<p class="mt-2 text-center text-red-500">{$message}</p>
{/if}
