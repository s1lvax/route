<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';

	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';

	import type { GithubData } from '$lib/types/GithubData';
	import type { PublicProfile } from '$lib/types/PublicProfile';
	import MusicPlayer from '$lib/components/Shared/MusicPlayer.svelte';
	import Hobbies from '$lib/components/PublicProfile/Hobbies.svelte';
	import Socials from '$lib/components/PublicProfile/Socials.svelte';

	export let githubData: GithubData | null;
	export let userData: PublicProfile;
</script>

<Card.Root class="flex h-full flex-col">
	<!-- Card Header -->
	<Card.Header>
		<Card.Title>User Information</Card.Title>
		<Card.Description>Discover the developer's personal information</Card.Description>
	</Card.Header>

	<!-- Card Content -->
	<Card.Content class="flex-grow">
		<div class="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
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
						{#if githubData}
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
						{:else}
							<Skeleton class="h-10 w-[200px]" />
							<Skeleton class="h-[22px] w-[150px] rounded-full" />
							<Skeleton class="h-6 w-[150px]" />
						{/if}
					</div>
				</div>
			</div>
			<div class="information flex flex-col justify-between">
				<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
					<div class="socials max-h-full">
						<Socials {githubData} />
					</div>
					<div class="hobbies">
						<Hobbies {userData} />
					</div>
				</div>
				<MusicPlayer githubUsername={userData.username} />
			</div>
		</div></Card.Content
	>
</Card.Root>
