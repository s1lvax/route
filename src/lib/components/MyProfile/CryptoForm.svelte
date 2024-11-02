<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { cryptoSchema, type CryptoSchema } from '$lib/schemas/crypto';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import * as Select from '$lib/components/ui/select';
	import { cryptoChoices } from '$lib/constants/cryptoChoices';
	import { findCryptoIcon } from '$lib/utils/findCryptoIcon';

	export let data: SuperValidated<Infer<CryptoSchema>>;

	const form = superForm(data, {
		validators: zodClient(cryptoSchema),
		resetForm: true
	});

	const { form: formData, enhance } = form;

	$: selectedCrypto = $formData.cryptoName
		? {
				label: $formData.cryptoName,
				value: $formData.cryptoName
			}
		: undefined;
</script>

<form
	method="POST"
	use:enhance
	action="?/createCrypto"
	class="flex items-center justify-between space-x-4"
>
	<div class="flex flex-grow items-start space-x-2">
		<Form.Field {form} name="cryptoName" class="w-1/2">
			<Form.Control let:attrs>
				<Form.Label>Crypto</Form.Label>
				<Select.Root
					selected={selectedCrypto}
					onSelectedChange={(v) => {
						if (v) $formData.cryptoName = v.value;
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select a crypto coin from the list" />
					</Select.Trigger>
					<Select.Content>
						{#each cryptoChoices as crypto}
							<Select.Item value={crypto.name}>
								<div class="flex flex-col gap-2">
									<div class="flex flex-row items-center justify-center gap-4">
										<!-- Use findCryptoIcon to dynamically get the icon for each crypto -->
										<svelte:component this={findCryptoIcon(crypto.name)} />
										<span>{crypto.name}</span>
									</div>
								</div>
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.cryptoName} name={attrs.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="wallet">
			<Form.Control let:attrs>
				<Form.Label>Crypto Wallet</Form.Label>
				<Input {...attrs} bind:value={$formData.wallet} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="space-y-2">
			<span class="invisible block">a</span>
			<Form.Button class="mb-2">Add</Form.Button>
		</div>
	</div>
</form>
