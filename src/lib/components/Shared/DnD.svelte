<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { Options, DndEvent, Item } from 'svelte-dnd-action';

	type T = $$Generic<Item>;
	export let items: T[];
	export let updateNewItems: (newItems: T[]) => void;
	export let onDrop: ((e: CustomEvent<DndEvent<Item>>) => void) | undefined = undefined;
	export let containerTag: string = 'div';
	export let dndOptions: Omit<Options<Item>, 'items' | 'type'> = {};
	export let type: string = crypto.randomUUID(); // By default DnD will have different types, to prevent dragging between DnD zones.

	const handleDndConsider = (e: CustomEvent<DndEvent<T>>) => {
		updateNewItems(e.detail.items);
	};
	const handleDndFinalize = (e: CustomEvent<DndEvent<T>>) => {
		updateNewItems(e.detail.items);
		onDrop?.(e);
	};
</script>

<svelte:element
	this={containerTag}
	use:dndzone={{ ...dndOptions, items, type }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
	{...$$restProps}
>
	<slot></slot>
</svelte:element>

