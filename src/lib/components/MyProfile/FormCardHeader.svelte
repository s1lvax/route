<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let title: string;
	export let description: string;

	let showForm: boolean = false;
	let wrapper: HTMLDivElement | null;

	// Transitioning from a fixed height (0px) to a variable height with CSS is not exactly possible with most browsers
	// at the moment of writing this.
	// There is an experimental CSS property (interpolate-size) that aims to fix this but it's not available on many
	// browsers. For now I have implemented this using JS (https://stackoverflow.com/a/3149710)
	const toggleVisibility = () => {
		if (!wrapper) return;

		showForm = !showForm;
		if (showForm) {
			wrapper.style.height = wrapper.scrollHeight + 'px';
		} else {
			wrapper.style.height = '0';
		}
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
	<div class="flex flex-col">
		<div bind:this={wrapper} class="h-0 overflow-hidden transition-all">
			<slot></slot>
		</div>
	</div>
</Card.Header>
