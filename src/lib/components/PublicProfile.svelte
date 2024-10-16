<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import GitHub from 'lucide-svelte/icons/github';
	import { IdCard, Folder, Github } from 'lucide-svelte';
	import { Progress } from '$lib/components/ui/progress';
	import { Button } from '$lib/components/ui/button';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import { getProgressValue } from '$lib/utils/getProgressValue';
	import * as Table from '$lib/components/ui/table';
	import { onMount } from 'svelte';
	import type { GithubData } from '$lib/types/GithubData';
	import LightDarkMode from './LightDarkMode.svelte';

	// Accept userData as a prop
	export let userData: PublicProfile;

	//Accept githubData as a prop
	export let githubData: GithubData;

	console.log(githubData);

	let progressValues: { [key: string]: number } = {};

	onMount(() => {
		userData.skills.forEach((skill) => {
			progressValues[skill.title] = 0;
			setTimeout(() => {
				progressValues[skill.title] = getProgressValue(skill.level);
			}, 100);
		});
	});
</script>

<!-- Main Profile Content -->

<div class="flex min-h-screen w-full flex-col items-center">
	<main class="flex w-full max-w-6xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<!-- User Avatar and Basic Info -->
		<div class="flex items-center justify-center space-x-4">
			<Avatar.Root class="h-24 w-24 rounded-full">
				<Avatar.Image src={githubData.avatarUrl} alt="User Avatar" />
				<Avatar.Fallback>?</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col space-y-4 text-center">
				{#if githubData.name}
					<p class="text-2xl font-bold">{githubData.name}</p>
				{:else}
					<p class="text-xl font-bold">{userData.username}</p>
				{/if}

				{#if githubData.bio}
					<p class="text-muted-foreground">{githubData.bio}</p>
				{:else}
					<p class="text-muted-foreground">Public Developer Profile</p>
				{/if}

				{#if githubData.company}
					<p class="text-muted-foreground">Currently at {githubData.company}</p>
				{/if}
				<div class="flex flex-row items-center justify-center gap-4">
					<div>
						<Button
							href={githubData.url}
							target="_blank"
							class="mt-2 flex justify-center rounded-full"
							variant="outline"
						>
							<GitHub />
						</Button>
					</div>
					{#if githubData.blog}
						<div>
							<Button
								href={githubData.blog}
								target="_blank"
								class="mt-2 flex justify-center rounded-full"
								variant="outline"
							>
								<IdCard />
							</Button>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- GitHub Stats Cards -->
		<div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<!-- Total Projects (Repo Count) Card -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<Folder class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">Projects on GitHub</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{githubData.repoCount}</div>
				</Card.Content>
			</Card.Root>

			<!-- GitHub Contributions Card -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<GitHub class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">GitHub Contributions (Past 30 Days)</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{githubData.contributionsCount}</div>
				</Card.Content>
			</Card.Root>

			<!-- Praise Received Card -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<GitHub class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">Github Followers</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{githubData.followers}</div>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Links and Tech Stack Side by Side -->
		<div class="mt-8 grid gap-4 md:grid-cols-2">
			<!-- Links Section -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Links</Card.Title>
					<Card.Description>
						Discover the developer's projects and favorite resources
					</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4">
					{#if userData.links.length > 0}
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head>Title</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each userData.links as link}
									<a href={link.url} target="_blank">
										<Table.Row class="flex flex-row space-x-4 hover:cursor-pointer">
											<Table.Cell class="font-medium">{link.title}</Table.Cell>
										</Table.Row>
									</a>
								{/each}
							</Table.Body>
						</Table.Root>
					{:else}
						<p class="text-muted-foreground">No links available</p>
					{/if}
				</Card.Content>
			</Card.Root>

			<!-- Tech Stack Section -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Tech Stack</Card.Title>
					<Card.Description>Explore the developer's skills and expertise</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4">
					{#if userData.skills.length > 0}
						{#each userData.skills as skill}
							<div class="flex items-center justify-between">
								<span>{skill.title}</span>
								<Progress
									value={progressValues[skill.title]}
									max={100}
									class="w-[60%] transition-all ease-in-out"
									style="transition-duration: 3000ms;"
								/>
							</div>
						{/each}
					{:else}
						<p class="text-muted-foreground">No skills available</p>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
		<div class="flex flex-col items-center justify-center gap-4">
			<p class="text-sm text-muted-foreground">
				Do you want one? <a href="/" class="text-blue-600 underline">Create yours here.</a>
			</p>
			<LightDarkMode />
		</div>
	</main>
</div>
