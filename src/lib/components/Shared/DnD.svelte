<script lang="ts">
    import { dndzone } from 'svelte-dnd-action';
    import type { Options, DndEvent, Item } from 'svelte-dnd-action';

    export let items: any[];
    export let updateNewItems: (newItems: any[]) => void;
    export let onDrop: ((e: CustomEvent<DndEvent<Item>>) => void) | undefined = undefined;
    export let containerTag: string = 'div';
    export let dndOptions: Omit<Options<Item>, 'items'> = {};
    dndOptions.type = dndOptions.type || crypto.randomUUID(); // By default DnD will have different types, to prevent dragging between DnD zones.

    function handleDndConsider(e: CustomEvent<DndEvent<Item>>) {
        updateNewItems(e.detail.items)
    }
    function handleDndFinalize(e: CustomEvent<DndEvent<Item>>) {
        updateNewItems(e.detail.items)
        onDrop && onDrop(e);
    }
</script>

<svelte:element this="{containerTag}" use:dndzone="{{ ...dndOptions, items }}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" {...$$restProps}>
    <slot></slot>
</svelte:element>