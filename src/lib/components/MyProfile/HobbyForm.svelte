<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { hobbiesSchema, type HobbiesSchema } from '$lib/schemas/hobbies';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<HobbiesSchema>>;

	const form = superForm(data, {
		validators: zodClient(hobbiesSchema),
		resetForm: true
	});

	const { form: formData, enhance } = form;
</script>

<form
	method="POST"
	use:enhance
	action="?/createHobby"
	class="flex items-center justify-between space-x-4"
>
	<div class="flex items-start space-x-2">
		<Form.Field {form} name="hobby">
			<Form.Control let:attrs>
				<Form.Label>Hobby</Form.Label>
				<Input {...attrs} bind:value={$formData.hobby} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="space-y-2">
			<span class="invisible block">a</span>
			<Form.Button>Add</Form.Button>
		</div>
	</div>
</form>
