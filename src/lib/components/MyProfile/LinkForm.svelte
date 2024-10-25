<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { linksSchema, type LinksSchema } from '$lib/schemas/links';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Link } from '@prisma/client';

	export let data: SuperValidated<Infer<LinksSchema>>;
	export let linksLength: number;
	export let links: Link[] = [];
	let isLimitReached = false;
	$: isLimitReached = links.length >= 15;

	const form = superForm(data, {
		validators: zodClient(linksSchema)
	});

	const { form: formData, enhance, message } = form;

	$: $formData.order = linksLength;
</script>

<form
	method="POST"
	use:enhance
	action="?/createLink"
	class="flex w-full max-w-lg items-start justify-start space-x-4"
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

	<div class="space-y-2">
		<span class="invisible block">a</span>
		<Form.Button disabled={isLimitReached} class="mt-5 flex align-bottom">Add</Form.Button>
	</div>

	<Form.Field {form} name="order">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.order} type="hidden" />
		</Form.Control>
	</Form.Field>
</form>

{#if isLimitReached}
	<p class="mt-2 text-center text-red-500">You have reached the maximum limit of 15 links.</p>
{:else if $message}
	<p class="mt-2 text-center text-red-500">{$message}</p>
{/if}
