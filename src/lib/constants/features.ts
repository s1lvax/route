// features.ts
import { Github } from 'lucide-svelte';
import { ChartArea } from 'lucide-svelte';
import { UserPen } from 'lucide-svelte';
import { GitPullRequestArrow } from 'lucide-svelte';

export const features = [
	{
		name: 'GitHub Integration',
		description:
			'Sync your GitHub activity in real-time and keep your profile updated with your latest projects.',
		icon: Github
	},
	{
		name: 'Tech Stack',
		description: 'Showcase your preferred tools and technologies with sleek graphs.',
		icon: ChartArea
	},
	{
		name: 'Customizable Profiles',
		description:
			'Create a personalized developer profile to highlight your projects, achievements, and expertise.',
		icon: UserPen
	},
	{
		name: 'Open Source',
		description:
			'Join a thriving open-source community, contribute to projects, and showcase your own contributions.',
		icon: GitPullRequestArrow
	}
];
