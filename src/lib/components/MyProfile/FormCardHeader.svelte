<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let title: string;
	export let description: string;

	let showForm: boolean = false;

	const toggleVisibility = () => {
		showForm = !showForm;
	};
</script>

<Card.Header>
	<div class="flex items-center">
		<div class="flex-grow">
			<Card.Title>{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
		</div>
		<Button type="submit" variant="ghost" on:click={toggleVisibility}>
			<span class="text-xl">{showForm ? '-' : '+'}</span>
		</Button>
	</div>
	<div
		class="grid {showForm ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-[grid-template-rows]"
	>
		<div class="overflow-hidden">
			<slot></slot>
		</div>
	</div>
</Card.Header>
