import type { LeetCodeStats } from '$lib/types/LeetCodeData';

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
   const query = `
   query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
         username
         userCalendar(year: $year) {
            activeYears
            streak
            totalActiveDays
            dccBadges {
               timestamp
               badge {
                  name
                  icon
               }
            }
            submissionCalendar
         }
      }
   }
   `;
   // call is made through a server-side proxy
   const response = await fetch('/api/leetcode', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         query,
         variables: { username },
      }),
   });

   const data = await response.json();
   return data?.data?.matchedUser || null;
}

