<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { dev } from '$app/environment';

	// Check if the current URL hostname is route2.dev
	const isRoute2Dev = !dev && window?.location.hostname === 'route2.dev';

	const tokenString = '"token": "c0d92e4dcb43400c89c094b727fe5026"';
</script>

<svelte:head>
	{#if isRoute2Dev}
		<!-- Cloudflare Web Analytics -->
		<script
			defer
			src="https://static.cloudflareinsights.com/beacon.min.js"
			data-cf-beacon={tokenString}
		></script>
	{/if}
</svelte:head>

<div class="flex h-screen flex-col">
	<Toaster />
	<ModeWatcher />
	<slot />
</div>
