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
		name: 'Skills & Tools',
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
		description: 'Join a thriving open-source community and help us make all software open-source.',
		icon: GitPullRequestArrow
	}
];
