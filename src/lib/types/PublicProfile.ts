import type { CryptoWallets, PersonalInformation, Social, IntegrationLeetCode, IntegrationCodewars} from '@prisma/client';

export interface PublicProfile {
	links: Array<{ title: string; url: string }>;
	skills: Array<{ title: string; level: string }>;
	username: string;
	isOpenToCollaborating: boolean | undefined;
	hobbies: Array<{ hobby: string }>;
	socials: Social[];
	personalInformation: PersonalInformation | null;
	chessComUsername: string | null;
	crypto: CryptoWallets[];
	leetCode: IntegrationLeetCode | null;
	codewars: IntegrationCodewars | null;
}
