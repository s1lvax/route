<script lang="ts">
	import PublicProfile from '$lib/components/PublicProfile.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PublicProfile userData={data.userData} />
