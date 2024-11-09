export type LeetCodeStats = {
    username: string;
    userCalendar: {
        activeYears: number[];
        streak: number;
        totalActiveDays: number;
        dccBadges: {
            timestamp: string;
            badge: {
                name: string;
                icon: string;
            };
        }[];
    };
    profile: {
        ranking: number;
    };
    submitStatsGlobal:{
        acSubmissionNum: {
            difficulty: string;
            count: number;
        }[];
    }
};

export type TagProblem = {
    tagName: string;
    tagSlug: string;
    problemsSolved: number;
};
