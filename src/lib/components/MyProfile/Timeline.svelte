<script lang="ts">
	import { findSocialIcon } from '$lib/utils/findSocialIcon';
	import type { RecentActivity } from '@prisma/client';

	export let recentActivity: RecentActivity[];

	const getActivityColor = (activityType: string): string => {
		if (activityType.includes('CREATED') || activityType === 'LINK_SPOTIFY') {
			return 'bg-green-700'; // Adding something
		} else if (activityType.includes('DELETED') || activityType === 'UNLINK_SPOTIFY') {
			return 'bg-red-700'; // Removing something
		}
		return 'bg-gray-400';
	};
</script>

<div class="flow-root">
	<ul role="list" class="-mb-8">
		{#each recentActivity as activity}
			<li>
				<div class="relative pb-8">
					<span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-700" aria-hidden="true"
					></span>
					<div class="relative flex space-x-3">
						<div>
							<span
								class={`flex h-8 w-8 items-center justify-center rounded-full ${getActivityColor(activity.activityType)}`}
							>
								<svelte:component
									this={findSocialIcon(activity.activityType)}
									class="h-5 w-5 text-white"
								/>
							</span>
						</div>
						<div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
							<div>
								<p class="text-sm">
									{activity.activityDescription}
								</p>
							</div>
							<div class="whitespace-nowrap text-right text-sm">
								<time datetime={activity.createdAt.toISOString()}>
									{new Date(activity.createdAt).toLocaleDateString()}
								</time>
							</div>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
