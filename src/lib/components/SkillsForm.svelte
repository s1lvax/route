<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { skillsSchema, type SkillsSchema } from '$lib/schemas/skills';
	import { Select } from 'bits-ui';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SkillsSchema>>;

	const form = superForm(data, {
		validators: zodClient(skillsSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				// Only reset the title, that way the user doesn't have to specify level of mastery every single time
				form.data.title = '';
			}
		}
	});

	const { form: formData, enhance } = form;

	$: selectedLevel = $formData.level
		? {
				label: $formData.level,
				value: $formData.level
			}
		: undefined;
</script>

<form
	method="POST"
	use:enhance
	action="?/createSkill"
	class="flex items-center justify-center space-x-4"
>
	<div class="flex flex-col">
		<Form.Field {form} name="title">
			<Form.Control let:attrs>
				<Form.Label>Title</Form.Label>
				<Input {...attrs} bind:value={$formData.title} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div class="flex flex-col">
		<Form.Field {form} name="level">
			<Form.Control let:attrs>
				<Form.Label>Level of mastery</Form.Label>
				<Select.Root
					selected={selectedLevel}
					onSelectedChange={(v) => {
						v && ($formData.level = v.value);
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select the level of your skill" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="1" label="Novice" />
						<Select.Item value="2" label="Intermediate" />
						<Select.Item value="3" label="Competent" />
						<Select.Item value="4" label="Proficient" />
						<Select.Item value="5" label="Expert" />
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.level} name={attrs.name} />
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Button>Add</Form.Button>
</form>
