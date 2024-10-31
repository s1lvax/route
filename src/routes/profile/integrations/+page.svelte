<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import FormCardHeader from '$lib/components/MyProfile/FormCardHeader.svelte';
	import LinkForm from '$lib/components/MyProfile/LinkForm.svelte';
	import UserLinks from '$lib/components/MyProfile/UserLinks.svelte';
	import ImportFromGithub from '$lib/components/MyProfile/ImportFromGithub.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<h1
	class="mb-5 flex flex-row items-center space-x-2 text-2xl font-bold text-muted-foreground md:mb-10 md:text-6xl"
>
	Integrations
</h1>

<Card.Root class="xl:col-span-2">
	<FormCardHeader
		description="The links visible on your profile. You can drag links around to modify the order"
		title="Links"
	>
		<div class="flex flex-row items-stretch gap-4">
			<LinkForm data={data.form} linksLength={data.links.length} links={data.links} />
			<ImportFromGithub {data} />
		</div>
	</FormCardHeader>
	<Card.Content>
		<UserLinks links={data.links} />
	</Card.Content>
</Card.Root>
