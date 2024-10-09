<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<Navbar />
<div class="flex h-full flex-col">
	<ModeWatcher />
	<slot />
</div>
