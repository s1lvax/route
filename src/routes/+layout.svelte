<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="flex h-screen flex-col">
	<ModeWatcher />
	<slot />
</div>
