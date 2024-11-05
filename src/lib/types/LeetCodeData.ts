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
       submissionCalendar: string;
    };
 };
 
 export type LanguageStats = {
    languageName: string;
    problemsSolved: number;
 };