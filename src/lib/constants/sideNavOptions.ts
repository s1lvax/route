import {
	IconHome,
	IconLink,
	IconSettings,
	IconTools,
	IconChartHistogram
} from '@tabler/icons-svelte';

export const sideNavOpt = [
	{ name: 'Home', path: '/profile', icon: IconHome },
	{ name: 'Integrations', path: '/profile/integrations', icon: IconLink },
	{ name: 'Skills&Tools', path: 'profile/skills-tools', icon: IconTools },
	{ name: 'Analytics', path: 'profile/analytics', icon: IconChartHistogram },
	{ name: 'Settings', path: '/profile/settings', icon: IconSettings }
];
