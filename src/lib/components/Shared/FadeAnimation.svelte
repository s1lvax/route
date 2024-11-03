<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="animation" transition:fade>
	<slot />
</div>
