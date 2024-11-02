<script lang="ts">
	import Timeline from '$lib/components/MyProfile/Timeline.svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import UserStats from '$lib/components/MyProfile/UserStats.svelte';
	import { getGithubData } from '$lib/utils/getGithubData';
	import type { GithubData } from '$lib/types/GithubData';
	import { onMount } from 'svelte';
	import type { PrivateProfileData } from '$lib/types/PrivateProfileData';
	import { IconCheck } from '@tabler/icons-svelte';

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

<UserStats {privateProfileData} />

<div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
	<Card.Root class="col-span-5">
		<Card.Header>
			<Card.Title>Welcome, {data.userData.username}!</Card.Title>
			<Card.Description>Here’s a quick overview of your profile:</Card.Description>
		</Card.Header>

		<Card.Content>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Integrations Table -->
				<Table.Root>
					<Table.Caption>Integrations</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Integration</Table.Head>
							<Table.Head>Status</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Spotify</Table.Cell>
							<Table.Cell>
								{#if data.spotifyToken}
									<svelte:component this={IconCheck}></svelte:component>
								{:else}
									Not Linked
								{/if}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Chess.com</Table.Cell>
							<Table.Cell>
								{#if data.chessComUsername}
									<svelte:component this={IconCheck} />
								{:else}
									Not Linked
								{/if}
							</Table.Cell>
						</Table.Row>
						<!-- Add other integrations here if needed -->
					</Table.Body>
				</Table.Root>

				<!-- Socials Table -->

				<Table.Root>
					<Table.Caption>Socials</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Social</Table.Head>
							<Table.Head>Status</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if data.socials.length > 0}
							{#each data.socials as social}
								<Table.Row>
									<Table.Cell>{social.social}</Table.Cell>
									<Table.Cell><svelte:component this={IconCheck} /></Table.Cell>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>

				<!-- Skills & Tools Table -->
				<Table.Root>
					<Table.Caption>Skills</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Skill</Table.Head>
							<Table.Head>Level</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if data.skills.length > 0}
							{#each data.skills as skill}
								<Table.Row>
									<Table.Cell>{skill.title}</Table.Cell>
									<Table.Cell>Lvl {skill.level}</Table.Cell>
								</Table.Row>
							{/each}
						{:else}
							<Table.Row>
								<Table.Cell>No skills added yet.</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>

				<Table.Root>
					<Table.Caption>Hobbies</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Hobby</Table.Head>
							<Table.Head>Status</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if data.hobbies.length > 0}
							{#each data.hobbies as hobby}
								<Table.Row>
									<Table.Cell>{hobby.hobby}</Table.Cell>
									<Table.Cell><svelte:component this={IconCheck} /></Table.Cell>
								</Table.Row>
							{/each}
						{:else}
							<Table.Row>
								<Table.Cell>No hobbies added yet.</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>

				<!-- Settings Table -->
				<Table.Root>
					<Table.Caption>Settings</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Setting</Table.Head>
							<Table.Head>Value</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if data.userData.openToCollaborating}
							<Table.Row>
								<Table.Cell>Open to Collaborating</Table.Cell>
								<Table.Cell>{data.userData.openToCollaborating}</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>

				{#if data.crypto.length > 0}
					<!-- Crypto Table -->
					<Table.Root>
						<Table.Caption>Crypto Wallets</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.Head>Wallet</Table.Head>
								<Table.Head>Status</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#if data.crypto}
								{#each data.crypto as crypto}
									<Table.Row>
										<Table.Cell>{crypto.cryptoName}</Table.Cell>
										<Table.Cell><svelte:component this={IconCheck} /></Table.Cell>
									</Table.Row>
								{/each}
							{:else}
								<Table.Row>
									<Table.Cell>No data found.</Table.Cell>
								</Table.Row>
							{/if}
						</Table.Body>
					</Table.Root>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>
	<Card.Root class="col-span-2">
		<Card.Header>
			<Card.Title>Recent Activity</Card.Title>
		</Card.Header>
		<Card.Content>
			<Timeline recentActivity={data.recentActivity} />
		</Card.Content>
	</Card.Root>
</div>
