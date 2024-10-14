<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;

	import LinkForm from '$lib/components/LinkForm.svelte';
	import UserStats from '$lib/components/UserStats.svelte';
	import UserLinks from '$lib/components/UserLinks.svelte';
	import SkillsForm from '$lib/components/SkillsForm.svelte';
	import UserSkills from '$lib/components/UserSkills.svelte';
	import { ArrowUpRight, Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { confirmDelete } from '$lib/utils/confirmDelete';
</script>

<div class="flex min-h-screen w-full flex-col">
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<div class="flex w-full justify-end space-x-2">
			<div class="flex space-x-2">
				<form action="?/deleteAccount&id={data.userId}" method="POST" use:enhance>
					<Button variant="destructive" type="submit" on:click={confirmDelete}
						><Trash2 /> Delete Account</Button
					>
				</form>
			</div>
			<div class="flex space-x-2">
				<Button variant="outline" href="/{data.userStats.username}"
					>View Public Profile <ArrowUpRight /></Button
				>
			</div>
		</div>

		<UserStats userStats={data.userStats} />
		<!-- Use UserStats component and pass userStats -->

		<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Card.Root class="xl:col-span-2">
				<Card.Header class="flex flex-row items-center">
					<div class="grid gap-2">
						<Card.Title>Links</Card.Title>
						<Card.Description>The links visible on your profile</Card.Description>
						<LinkForm data={data.form} />
					</div>
				</Card.Header>
				<Card.Content>
					<UserLinks links={data.links} />
					<!-- Use UserLinks component and pass links -->
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Tech Stack</Card.Title>
					<SkillsForm data={data.skillsForm} />
				</Card.Header>
				<Card.Content class="grid gap-8">
					<UserSkills skills={data.skills} />
				</Card.Content>
			</Card.Root>
		</div>
	</main>
</div>
