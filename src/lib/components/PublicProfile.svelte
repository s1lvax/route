<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import GitHub from 'lucide-svelte/icons/github'; // For GitHub contributions and GitHub link
	import Folder from 'lucide-svelte/icons/folder'; // For total projects
	import { ThumbsUp } from 'lucide-svelte'; // For praises
	import { Progress } from '$lib/components/ui/progress';
	import { Button } from '$lib/components/ui/button';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import { getProgressValue } from '$lib/utils/getProgressValue';

	// Accept userData as a prop
	export let userData: PublicProfile;
</script>

<!-- Main Profile Content -->
<div class="flex min-h-screen w-full flex-col items-center">
	<main class="flex w-full max-w-6xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<!-- User Avatar and Basic Info -->
		<div class="flex items-center justify-center space-x-4">
			<Avatar.Root class="h-24 w-24 rounded-full">
				<Avatar.Image src={userData.pfp} alt="User Avatar" />
				<Avatar.Fallback>{userData.pfp ? '' : '?'}</Avatar.Fallback>
			</Avatar.Root>
			<div class="text-center">
				<p class="text-xl font-bold">{userData.username}</p>
				<p class="text-muted-foreground">Public Developer Profile</p>

				<!-- GitHub Profile Link with Icon -->
				<Button
					href={`https://github.com/${userData.username}`}
					target="_blank"
					class="mt-2 flex justify-center rounded-full"
					variant="ghost"
				>
					<GitHub />
				</Button>
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
					<div class="text-2xl font-bold">{userData.repoCount}</div>
				</Card.Content>
			</Card.Root>

			<!-- GitHub Contributions Card -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<GitHub class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">GitHub Contributions</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{userData.contributionsCount}</div>
				</Card.Content>
			</Card.Root>

			<!-- Praise Received Card -->
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<ThumbsUp class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">Praise Received</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{userData.praises}</div>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Links and Tech Stack Side by Side -->
		<div class="mt-8 grid gap-4 md:grid-cols-2">
			<!-- Links Section -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Links</Card.Title>
					<Card.Description
						>Discover the developer's projects and favorite resources</Card.Description
					>
				</Card.Header>
				<Card.Content class="grid gap-4">
					{#if userData.links.length > 0}
						{#each userData.links as link}
							<div>
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600 hover:underline"
								>
									{link.title}
								</a>
							</div>
						{/each}
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
								<Progress value={getProgressValue(skill.level)} max={100} class="w-[60%]" />
							</div>
						{/each}
					{:else}
						<p class="text-muted-foreground">No skills available</p>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
		<div class="flex justify-center">
			<p class="text-sm text-muted-foreground">
				Do you like this? <a href="/" class="text-blue-600 underline">Create yours here.</a>
			</p>
		</div>
	</main>
</div>
