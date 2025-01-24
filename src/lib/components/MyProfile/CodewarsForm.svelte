<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
    import { codewarsSchema, type CodewarsSchema } from '$lib/schemas/integration-codewars';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CodewarsSchema>>;

	const form = superForm(data, {
		validators: zodClient(codewarsSchema),
		resetForm: true
	});

	const { form: formData, enhance } = form;
</script>

<form
	method="POST"
	use:enhance
	action="?/createCodewars"
	class="flex items-center justify-between space-x-4"
>
	<div class="flex items-start space-x-2">
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input {...attrs} bind:value={$formData.username} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="space-y-2">
			<span class="invisible block">a</span>
			<Form.Button>Add</Form.Button>
		</div>
	</div>
</form>
