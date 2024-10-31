<script lang="ts">
	import Timeline from '$lib/components/MyProfile/Timeline.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="timeline flex justify-center">
		<Timeline recentActivity={data.recentActivity} />
	</div>
	<div class="idk">ddddd</div>
</div>
