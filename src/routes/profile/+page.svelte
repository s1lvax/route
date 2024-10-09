<script lang="ts">
	import GitHub from 'lucide-svelte/icons/github'; // For GitHub contributions
	import Users from 'lucide-svelte/icons/users'; // For profile views
	import Folder from 'lucide-svelte/icons/folder'; // For total projects
	import { ThumbsUp } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { PageData } from './$types';

	export let data: PageData;

	// Link form
	import LinkForm from '$lib/components/LinkForm.svelte';
	import UserStats from '$lib/components/UserStats.svelte'; // Import UserStats component
	import UserLinks from '$lib/components/UserLinks.svelte'; // Import UserLinks component
</script>

<div class="flex min-h-screen w-full flex-col">
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
					<Card.Title>Recent Sales</Card.Title>
				</Card.Header>
				<Card.Content class="grid gap-8">
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src="/avatars/01.png" alt="Avatar" />
							<Avatar.Fallback>OM</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Olivia Martin</p>
							<p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$1,999.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src="/avatars/02.png" alt="Avatar" />
							<Avatar.Fallback>JL</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Jackson Lee</p>
							<p class="text-sm text-muted-foreground">jackson.lee@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$39.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src="/avatars/03.png" alt="Avatar" />
							<Avatar.Fallback>IN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
							<p class="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$299.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src="/avatars/04.png" alt="Avatar" />
							<Avatar.Fallback>WK</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">William Kim</p>
							<p class="text-sm text-muted-foreground">will@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$99.00</div>
					</div>
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src="/avatars/05.png" alt="Avatar" />
							<Avatar.Fallback>SD</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">Sofia Davis</p>
							<p class="text-sm text-muted-foreground">sofia.davis@email.com</p>
						</div>
						<div class="ml-auto font-medium">+$39.00</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</main>
</div>
