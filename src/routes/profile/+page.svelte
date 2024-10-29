<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	import LinkForm from '$lib/components/MyProfile/LinkForm.svelte';
	import UserStats from '$lib/components/MyProfile/UserStats.svelte';
	import UserLinks from '$lib/components/MyProfile/UserLinks.svelte';
	import SkillsForm from '$lib/components/MyProfile/SkillsForm.svelte';
	import UserSkills from '$lib/components/MyProfile/UserSkills.svelte';

	import { getGithubData } from '$lib/utils/getGithubData';
	import type { GithubData } from '$lib/types/GithubData';
	import { onMount } from 'svelte';
	import type { PrivateProfileData } from '$lib/types/PrivateProfileData';
	import UserSettings from '$lib/components/MyProfile/UserSettings.svelte';
	import HobbyForm from '$lib/components/MyProfile/HobbyForm.svelte';
	import UserHobbies from '$lib/components/MyProfile/UserHobbies.svelte';
	import SocialsForm from '$lib/components/MyProfile/SocialsForm.svelte';
	import UserSocials from '$lib/components/MyProfile/UserSocials.svelte';
	import FormCardHeader from '$lib/components/MyProfile/FormCardHeader.svelte';
	import ImportFromGithub from '$lib/components/MyProfile/ImportFromGithub.svelte';

	let githubData: GithubData | null = null;
	let privateProfileData: PrivateProfileData | null = null;
	export let data: PageData;

	// Fetch GitHub data on component mount
	onMount(async () => {
		try {
			githubData = await getGithubData(data.userData.username);

			// Now that githubData is available, assign to privateProfileData
			if (githubData) {
				privateProfileData = {
					views: data.userData.views,
					followers: githubData.followers,
					repoCount: githubData.repoCount,
					contributionsCount: githubData.contributionsCount
				};
			}
		} catch (error) {
			console.error('Error fetching GitHub data:', error);
		}
	});
</script>

<div class="flex min-h-screen w-full flex-col">
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<UserSettings {data} />
		<UserStats {privateProfileData} />

		<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Card.Root class="xl:col-span-2">
				<FormCardHeader
					description="The links visible on your profile. You can drag links around to modify the order"
					title="Links"
				>
					<div class="flex flex-row items-center gap-4">
						<LinkForm data={data.form} linksLength={data.links.length} links={data.links} />
						<ImportFromGithub {data} />
					</div>
				</FormCardHeader>
				<Card.Content>
					<UserLinks links={data.links} />
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<FormCardHeader
					description="You can drag skills around to modify the order"
					title="Skills & Tools"
				>
					<SkillsForm
						data={data.skillsForm}
						skillsLength={data.skills.length}
						skills={data.skills}
					/>
				</FormCardHeader>
				<Card.Content class="grid gap-8">
					<UserSkills skills={data.skills} />
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<FormCardHeader title="Hobbies" description="You can add your hobbies here">
					<HobbyForm data={data.hobbiesForm} />
				</FormCardHeader>
				<Card.Content class="grid gap-8">
					<UserHobbies hobbies={data.hobbies} />
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<FormCardHeader title="Socials" description="You can add your social media presence here">
					<SocialsForm data={data.socialsForm} />
				</FormCardHeader>
				<Card.Content class="grid gap-8">
					<UserSocials socials={data.socials} />
				</Card.Content>
			</Card.Root>
		</div>
	</main>
</div>
