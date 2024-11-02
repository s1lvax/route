import { z } from 'zod';

// regex for crypto addresses
const bitcoinRegex = /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/;
const ethereumRegex = /^0x[a-fA-F0-9]{40}$/;
const moneroRegex = /^(4|8)[0-9AB][1-9A-HJ-NP-Za-km-z]{93}$/;

const CryptoNameEnum = z.enum(['bitcoin', 'ethereum', 'monero']);

export const cryptoSchema = z
	.object({
		cryptoName: CryptoNameEnum,
		wallet: z.string()
	})
	.superRefine((data, ctx) => {
		const { cryptoName, wallet } = data;

		// Validate based on the cryptoName
		if (cryptoName === 'bitcoin' && !bitcoinRegex.test(wallet)) {
			ctx.addIssue({
				code: 'custom',
				path: ['wallet'],
				message: 'Invalid Bitcoin address format.'
			});
		} else if (cryptoName === 'ethereum' && !ethereumRegex.test(wallet)) {
			ctx.addIssue({
				code: 'custom',
				path: ['wallet'],
				message: 'Invalid Ethereum address format.'
			});
		} else if (cryptoName === 'monero' && !moneroRegex.test(wallet)) {
			ctx.addIssue({
				code: 'custom',
				path: ['wallet'],
				message: 'Invalid Monero address format.'
			});
		}
	});

export type CryptoSchema = typeof cryptoSchema;
