<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import FormCardHeader from '$lib/components/MyProfile/FormCardHeader.svelte';
	import SkillsForm from '$lib/components/MyProfile/SkillsForm.svelte';
	import type { PageData } from '../$types';
	import UserSkills from '$lib/components/MyProfile/UserSkills.svelte';
	import FadeAnimation from '$lib/components/Shared/FadeAnimation.svelte';
	export let data: PageData;
</script>

<h1
	class="mb-5 flex flex-row items-center space-x-2 text-2xl font-bold text-muted-foreground md:mb-10 md:text-6xl"
>
	Skills&Tools
</h1>
<Card.Root>
	<FormCardHeader
		description="You can drag skills around to modify the order"
		title="Skills & Tools"
	>
		<SkillsForm data={data.skillsForm} skillsLength={data.skills.length} skills={data.skills} />
	</FormCardHeader>
	<Card.Content class="grid gap-8">
		<UserSkills skills={data.skills} />
	</Card.Content>
</Card.Root>
