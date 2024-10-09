<script lang="ts">
	import GitHub from 'lucide-svelte/icons/github'; // For GitHub contributions
	import Users from 'lucide-svelte/icons/users'; // For profile views
	import Folder from 'lucide-svelte/icons/folder'; // For total projects

	import * as Avatar from '$lib/components/ui/avatar';

	import { ThumbsUp } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import * as Table from '$lib/components/ui/table';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex min-h-screen w-full flex-col">
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<Users class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">Total Profile Views</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">1,234</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<Folder class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">Total Projects</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{data.userStats.repoCount}</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<GitHub class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">GitHub Contributions</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{data.userStats.contributionsCount}</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<div class="flex items-center space-x-2">
						<ThumbsUp class="h-4 w-4 text-muted-foreground" />
						<Card.Title class="text-sm font-medium">Praise Received</Card.Title>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">25</div>
				</Card.Content>
			</Card.Root>
		</div>
		<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Card.Root class="xl:col-span-2">
				<Card.Header class="flex flex-row items-center">
					<div class="grid gap-2">
						<Card.Title>Transactions</Card.Title>
						<Card.Description>Recent transactions from your store.</Card.Description>
					</div>
					<Button href="##" size="sm" class="ml-auto gap-1">View All</Button>
				</Card.Header>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Customer</Table.Head>
								<Table.Head class="xl:table.-column hidden">Type</Table.Head>
								<Table.Head class="xl:table.-column hidden">Status</Table.Head>
								<Table.Head class="xl:table.-column hidden">Date</Table.Head>
								<Table.Head class="text-right">Amount</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Liam Johnson</div>
									<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
								<Table.Cell class="xl:table.-column hidden"></Table.Cell>
								<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
									2023-06-23
								</Table.Cell>
								<Table.Cell class="text-right">$250.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Olivia Smith</div>
									<div class="hidden text-sm text-muted-foreground md:inline">
										olivia@example.com
									</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Refund</Table.Cell>
								<Table.Cell class="xl:table.-column hidden"></Table.Cell>
								<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
									2023-06-24
								</Table.Cell>
								<Table.Cell class="text-right">$150.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Noah Williams</div>
									<div class="hidden text-sm text-muted-foreground md:inline">noah@example.com</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Subscription</Table.Cell>
								<Table.Cell class="xl:table.-column hidden"></Table.Cell>
								<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
									2023-06-25
								</Table.Cell>
								<Table.Cell class="text-right">$350.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Emma Brown</div>
									<div class="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
								<Table.Cell class="xl:table.-column hidden"></Table.Cell>
								<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
									2023-06-26
								</Table.Cell>
								<Table.Cell class="text-right">$450.00</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Liam Johnson</div>
									<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
								<Table.Cell class="xl:table.-column hidden"></Table.Cell>
								<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
									2023-06-27
								</Table.Cell>
								<Table.Cell class="text-right">$550.00</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
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
