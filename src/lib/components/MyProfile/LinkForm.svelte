<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { linksSchema, type LinksSchema } from '$lib/schemas/links';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<LinksSchema>>;
	export let linksLength: number;

	const form = superForm(data, {
		validators: zodClient(linksSchema)
	});

	const { form: formData, enhance } = form;

	$: $formData.order = linksLength;
</script>

<form
	method="POST"
	use:enhance
	action="?/createLink"
	class="flex w-full max-w-lg items-center justify-start space-x-4"
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
		<Form.Field {form} name="url">
			<Form.Control let:attrs>
				<Form.Label>URL</Form.Label>
				<Input {...attrs} bind:value={$formData.url} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Field {form} name="order">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.order} type="hidden" />
		</Form.Control>
	</Form.Field>

	<Form.Button class="mt-5 flex align-bottom">Add</Form.Button>
</form>
