<script lang="ts">
	import UserSettings from '$lib/components/MyProfile/UserSettings.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<UserSettings {data} />
