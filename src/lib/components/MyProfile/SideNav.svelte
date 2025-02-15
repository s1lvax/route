<script lang="ts">
	import { sideNavOpt } from '$lib/constants/sideNavOptions';
	import Search from '$lib/components/MyProfile/Search.svelte';
	import { Menu, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let isSidebarOpen = false;

	// Toggle sidebar visibility
	const toggleSidebar = () => {
		isSidebarOpen = !isSidebarOpen;
	};
</script>

<div>
	<!-- Off-canvas Sidebar for Mobile -->
	{#if isSidebarOpen}
		<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
			<!-- Backdrop -->
			<div
				class="opacity-2 fixed inset-0 bg-black opacity-90 transition-opacity duration-300 ease-linear"
				aria-hidden="true"
				on:click={toggleSidebar}
			></div>

			<!-- Sidebar Panel -->
			<div class="fixed inset-0 flex">
				<div
					class="relative flex w-full flex-1 transform transition duration-300 ease-in-out"
					class:translate-x-full={!isSidebarOpen}
				>
					<!-- Sidebar Content for Mobile -->
					<div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
						<div class="flex h-16 shrink-0 items-center justify-between">
							<h1 class="text-2xl font-bold">Route</h1>

							<!-- Close Button -->
							<Button on:click={toggleSidebar} type="button" variant="ghost">
								<span class="sr-only">Close sidebar</span>
								<X class="h-6 w-6" />
							</Button>
						</div>
						<nav class="flex flex-1 flex-col">
							<ul role="list" class="flex flex-1 flex-col gap-y-7">
								{#each sideNavOpt as option}
									<li>
										<a
											href={option.path}
											class="group flex items-center gap-x-3 rounded-lg p-3 text-sm font-semibold hover:border hover:bg-transparent"
										>
											<svelte:component this={option.icon} class="h-6 w-6" />
											{option.name}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Static Sidebar for Desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 pb-4">
			<div class="flex h-16 shrink-0 items-center">
				<h1 class="text-2xl font-bold">Route</h1>
			</div>
			<nav class="flex flex-1 flex-col">
				<ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" class="-mx-2 space-y-1">
							{#each sideNavOpt as option}
								<li>
									<a
										href={option.path}
										class="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold hover:border hover:bg-transparent"
									>
										<svelte:component this={option.icon} class="h-6 w-6" />
										{option.name}
									</a>
								</li>
							{/each}
							<!-- Additional sidebar items for desktop... -->
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<!-- Main Content Area -->
	<div class="lg:pl-72">
		<div
			class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
		>
			<!-- Mobile Open Sidebar Button -->
			<button on:click={toggleSidebar} type="button" class="-m-2.5 p-2.5 lg:hidden">
				<span class="sr-only">Open sidebar</span>
				<Menu />
			</button>

			<!-- Search Form -->
			<Search />
		</div>

		<main class="py-10">
			<div class="px-4 sm:px-6 lg:px-8">
				<slot />
			</div>
		</main>
	</div>
</div>
