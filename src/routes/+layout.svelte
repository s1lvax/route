<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	// Create a derived store to check if the hostname is route2.dev
	const isRoute2Dev = derived(page, ($page) => !dev && $page.url.hostname === 'route2.dev');

	const tokenString = '"token": "c0d92e4dcb43400c89c094b727fe5026"';
</script>

<svelte:head>
	{#if $isRoute2Dev}
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
