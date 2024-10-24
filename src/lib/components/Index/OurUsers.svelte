<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import type { User } from '@prisma/client';
	export let users: User[] = [];
</script>

<div class="mt-12 py-32 sm:py-24">
	<div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
		<div class="max-w-xl">
			<div class="flex flex-col space-y-4">
				<h2 class="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
					Meet some of our Users
				</h2>
			</div>
			<p class="mt-6 text-lg leading-8 text-muted-foreground">
				Explore the profile of some of our users
			</p>
		</div>
		<ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
			{#each users as user}
				<a href="/{user.githubUsername}">
					<li>
						<div
							class="flex items-center gap-x-6 transition-transform duration-300 ease-in-out hover:scale-105"
						>
							<img
								class="h-16 w-16 rounded-full"
								src="https://github.com/{user.githubUsername}.png"
								alt="{user.githubUsername}'s avatar"
							/>
							<div>
								<h3 class="text-base font-semibold leading-7 tracking-tight">
									{user.githubUsername}
								</h3>
								<p class="text-sm font-semibold leading-6 text-muted-foreground">
									Joined on the {formatDate(user.createdAt)}
								</p>
							</div>
						</div>
					</li>
				</a>
			{/each}
		</ul>
	</div>
</div>
