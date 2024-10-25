<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { socialsSchema, type SocialsSchema } from '$lib/schemas/socials';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import * as Select from '$lib/components/ui/select';
	import { socials } from '$lib/constants/socials';

	export let data: SuperValidated<Infer<SocialsSchema>>;

	const form = superForm(data, {
		validators: zodClient(socialsSchema),
		resetForm: true
	});

	const { form: formData, enhance } = form;

	$: selectedSocial = $formData.social
		? {
				label: $formData.social,
				value: $formData.social
			}
		: undefined;
</script>

<form
	method="POST"
	use:enhance
	action="?/createSocial"
	class="flex items-center justify-between space-x-4"
>
	<div class="flex flex-grow items-start space-x-2">
		<Form.Field {form} name="social" class="w-1/2">
			<Form.Control let:attrs>
				<Form.Label>Social Media</Form.Label>
				<Select.Root
					selected={selectedSocial}
					onSelectedChange={(v) => {
						if (v) $formData.social = v.value;
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select a social media from the list" />
					</Select.Trigger>
					<Select.Content>
						{#each socials as social}
							<Select.Item value={social.name}>
								<span class="flex flex-row items-center justify-center gap-4"
									>{@html social.svg}{social.name}</span
								>
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.social} name={attrs.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="socialURL">
			<Form.Control let:attrs>
				<Form.Label>Social URL</Form.Label>
				<Input {...attrs} bind:value={$formData.socialURL} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="space-y-2">
			<span class="invisible block">a</span>
			<Form.Button class="mb-2">Add</Form.Button>
		</div>
	</div>
</form>
