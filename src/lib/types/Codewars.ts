import { string } from "zod";

export type CodewarsStats = {
    username: string;
    name: string;
    honor: number;
    clan: string | null;
    leaderboardPosition: number;
    skills: string[] | null;

    ranks: {
        overall: {
            rank: number;
            name: string;
            color: string;
            score: number;
        };
        languages: {
            [key: string]: {
                rank: number;
                name: string;
                color: string;
                score: number;
            };
        };
    };

    codeChallenges: {
        totalAuthored: number;
        totalCompleted: number;
    };
};