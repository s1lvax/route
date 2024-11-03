export type SearchResults = {
	id: number;
	githubId: number;
	githubUsername: string;
	views: number;
	openToCollaborating: boolean;
	createdAt: string;
	updatedAt: string;
	Skill: {
		id: number;
		title: string;
		level: string;
		userId: number;
		order: number;
		createdAt: string;
		updatedAt: string;
	}[];
	Hobby: {
		id: number;
		userId: number;
		hobby: string;
		createdAt: string;
	}[];
};
