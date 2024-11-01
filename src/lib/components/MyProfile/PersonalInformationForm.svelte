<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import {
		personalInformationSchema,
		type PersonalInformationSchema
	} from '$lib/schemas/personal-information';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<PersonalInformationSchema>>;

	const form = superForm(data, {
		validators: zodClient(personalInformationSchema),
		resetForm: true,
		onSubmit: ({ formData, cancel }) => {
			// Don't make a request if there is nothing to update
			if (formData.values().every((val) => val == null || val == '')) {
				cancel();
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action="?/updatePersonalInformation" class="space-y-4">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="fullName">
		<Form.Control let:attrs>
			<Form.Label>Full Name</Form.Label>
			<Input {...attrs} bind:value={$formData.fullName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update Information</Form.Button>
</form>
