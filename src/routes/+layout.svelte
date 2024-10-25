<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<div class="flex h-screen flex-col">
	<Toaster />
	<ModeWatcher />
	<slot />
</div>
