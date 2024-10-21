<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator/index.js';

	import LinkForm from '$lib/components/MyProfile/LinkForm.svelte';
	import UserStats from '$lib/components/MyProfile/UserStats.svelte';
	import UserLinks from '$lib/components/MyProfile/UserLinks.svelte';
	import SkillsForm from '$lib/components/MyProfile/SkillsForm.svelte';
	import UserSkills from '$lib/components/MyProfile/UserSkills.svelte';
	import { ArrowUpRight, Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { confirmDelete } from '$lib/utils/confirmDelete';
	import { getGithubData } from '$lib/utils/getGithubData';
	import type { GithubData } from '$lib/types/GithubData';
	import { onMount } from 'svelte';
	import type { PrivateProfileData } from '$lib/types/PrivateProfileData';

	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';

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
		<div class="flex w-full justify-end space-x-2">
			<div class="flex space-x-2">
				<form action="?/updateOpenToCollaborating" method="POST" use:enhance>
					<div class="flex flex-row items-center">
						<Button type="submit" variant="ghost">
							<Label for="open-to-collaborating" class="mr-2 hover:cursor-pointer"
								>Open to Collaborating</Label
							>
							<!-- The switch is disabled so that the user is forced to click the button to trigger the function -->
							<Switch
								id="open-to-collaborating"
								bind:checked={data.userData.openToCollaborating}
								name="openToCollaborating"
								includeInput
								disabled
							/>
						</Button>
					</div>
				</form>
			</div>
			<Separator orientation="vertical" />
			<div class="flex space-x-2">
				<form action="?/deleteAccount&id={data.userId}" method="POST" use:enhance>
					<Button variant="destructive" type="submit" on:click={confirmDelete}
						><Trash2 /> Delete Account</Button
					>
				</form>
			</div>
			<div class="flex space-x-2">
				<Button variant="outline" href="/{data.userData.username}"
					>View Public Profile <ArrowUpRight /></Button
				>
			</div>
		</div>

		<UserStats {privateProfileData} />

		<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Card.Root class="xl:col-span-2">
				<Card.Header class="flex flex-row items-center">
					<div class="grid gap-2">
						<Card.Title>Links</Card.Title>
						<Card.Description>
							The links visible on your profile. You can drag links around to modify the order
						</Card.Description>
						<LinkForm data={data.form} linksLength={data.links.length} links={data.links} />
					</div>
				</Card.Header>
				<Card.Content>
					<UserLinks links={data.links} />
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Skills & Tools</Card.Title>
					<Card.Description>You can drag skills around to modify the order</Card.Description>
					<SkillsForm
						data={data.skillsForm}
						skillsLength={data.skills.length}
						skills={data.skills}
					/>
				</Card.Header>
				<Card.Content class="grid gap-8">
					<UserSkills skills={data.skills} />
				</Card.Content>
			</Card.Root>
		</div>
	</main>
</div>
