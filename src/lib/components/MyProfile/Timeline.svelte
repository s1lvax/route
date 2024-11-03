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
		return 'bg-gray-700';
	};

	// Function to format the date
	const formatDate = (date: Date): string => {
		const today = new Date();
		const isToday =
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear();

		if (isToday) {
			return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		} else {
			return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
		}
	};
</script>

<div class="flow-root pb-8">
	<ul role="list" class="-mb-8">
		{#each recentActivity as activity, i (activity.id)}
			<li>
				<div class="relative pb-8">
					{#if i < recentActivity.length - 1}
						<!-- Render line only if it's not the last item -->
						<span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-700" aria-hidden="true"
						></span>
					{/if}
					<div class="relative flex space-x-3">
						<div>
							<span
								class={`flex h-8 w-8 items-center justify-center rounded-full ${getActivityColor(activity.activityType)}`}
							>
								<svelte:component this={findSocialIcon(activity.activityType)} class="h-5 w-5" />
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
									{formatDate(new Date(activity.createdAt))}
								</time>
							</div>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
