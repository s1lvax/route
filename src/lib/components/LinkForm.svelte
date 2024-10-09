<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { linksSchema, type LinksSchema } from '$lib/schemas/links';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<LinksSchema>>;

	const form = superForm(data, {
		validators: zodClient(linksSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex items-center justify-center space-x-4">
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="url">
		<Form.Control let:attrs>
			<Form.Label>URL</Form.Label>
			<Input {...attrs} bind:value={$formData.url} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Add</Form.Button>
</form>
