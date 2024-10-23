<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { IdCard, Twitter, AudioLines } from 'lucide-svelte';
	import GitHub from 'lucide-svelte/icons/github';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	import type { GithubData } from '$lib/types/GithubData';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import MusicPlayer from '$lib/components/Shared/MusicPlayer.svelte';

	export let githubData: GithubData | null;
	export let userData: PublicProfile;
</script>

<Card.Root>
	<!-- Card Header -->
	<Card.Header>
		<Card.Title>User Information</Card.Title>
		<Card.Description>Discover the developer's personal information</Card.Description>
	</Card.Header>

	<!-- Card Content -->
	<Card.Content>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="introduction flex flex-col space-y-4">
				<div class="flex flex-col items-center justify-center gap-2">
					<Avatar.Root class="h-40 w-40 rounded-full">
						{#if githubData}
							<Avatar.Image src={githubData?.avatarUrl ?? ''} alt="User Avatar" />
							<Avatar.Fallback><Skeleton class="h-full w-full rounded-full" /></Avatar.Fallback>
						{:else}
							<Skeleton class="h-full w-full rounded-full" />
						{/if}
					</Avatar.Root>

					<div class="flex flex-col items-center justify-center space-y-4 text-center">
						{#if githubData?.name}
							<p class="text-4xl font-bold">{githubData.name}</p>
						{:else}
							<p class="text-4xl font-bold">{userData.username}</p>
						{/if}
						<!-- Collaborating Badge -->
						{#if userData?.isOpenToCollaborating}
							<Badge variant="outline" class="border-green-700 text-green-700"
								>Open to Collaborating</Badge
							>
						{:else}
							<Badge variant="outline" class="border-red-700 text-red-700"
								>Not Open to Collaborating</Badge
							>
						{/if}

						{#if githubData?.bio}
							<p class="text-muted-foreground">{githubData?.bio ?? 'Public Developer Profile'}</p>
						{:else}
							<p class="text-muted-foreground">Public Developer Profile</p>
						{/if}

						{#if githubData?.company}
							<p class="text-muted-foreground">Currently at {githubData?.company}</p>
						{/if}
					</div>
				</div>
			</div>
			<div class="information flex flex-col space-y-4">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Socials</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body class="[&>*]:border-b-0">
						<!-- GitHub Profile -->
						<Table.Row>
							<Table.Cell class="p-0">
								<a
									class="flex items-center space-x-8 p-4"
									href={githubData?.url ?? '#'}
									target="_blank"
								>
									<GitHub />
									<span>GitHub Profile</span>
								</a>
							</Table.Cell>
						</Table.Row>

						<!-- Blog Profile -->
						{#if githubData?.blog}
							<Table.Row>
								<Table.Cell class="p-0">
									<a
										class="flex items-center space-x-8 p-4"
										href={githubData?.blog ?? '#'}
										target="_blank"
									>
										<IdCard />
										<span>Personal Website</span>
									</a>
								</Table.Cell>
							</Table.Row>
						{/if}

						<!-- Twitter Profile -->
						{#if githubData?.twitter}
							<Table.Row>
								<Table.Cell class="p-0">
									<a
										class="flex items-center space-x-8 p-4"
										href={`https://x.com/${githubData?.twitter}`}
										target="_blank"
									>
										<Twitter />
										<span>Twitter Profile</span>
									</a>
								</Table.Cell>
							</Table.Row>
						{/if}
						<!-- Socials will be here when we implement it -->
					</Table.Body>
				</Table.Root>
				<MusicPlayer githubUsername={userData.username} />
			</div>
		</div></Card.Content
	>
</Card.Root>
