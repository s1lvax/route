import { IconPlus } from '@tabler/icons-svelte';
import { cryptoChoices } from '../constants/cryptoChoices';

export const findCryptoIcon = (cryptoName: string) => {
	const crypto = cryptoChoices.find((c) => c.name === cryptoName);
	// return the icon if found, otherwise return IconPlus as a fallback
	return crypto ? crypto.icon : IconPlus;
};
