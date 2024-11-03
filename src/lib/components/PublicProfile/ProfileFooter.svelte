<script lang="ts">
	import LightDarkMode from '$lib/components/Shared/LightDarkMode.svelte';
	import { copyToClipboard } from '$lib/utils/copyToClipboard';
	import type { CryptoWallets } from '@prisma/client';
	import Button from '$lib/components/ui/button/button.svelte';
	import { findCryptoIcon } from '$lib/utils/findCryptoIcon';
	import { IconCornerRightUp } from '@tabler/icons-svelte';

	export let crypto: CryptoWallets[];
</script>

{#if crypto.length > 0}
	<div class="flex flex-col items-center justify-center gap-2 md:flex-row">
		{#each crypto as wallet}
			<Button
				variant="ghost"
				type="button"
				class="flex items-center gap-2 p-2"
				on:click={() => copyToClipboard(wallet.wallet)}
			>
				<svelte:component this={findCryptoIcon(wallet.cryptoName)} />
				{wallet.cryptoName}
			</Button>
		{/each}
	</div>
{/if}

<div class="flex flex-col items-center justify-center gap-2 md:flex-row">
	<LightDarkMode />
	<Button href="/" variant="outline">Create your profile <IconCornerRightUp /></Button>
</div>
