import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    const username = url.searchParams.get('leetCodeUsername');
    const query = `
    query userProfileCalendar($username: String!) {
        matchedUser(username: $username) {
            username
            userCalendar {
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
            }

            profile {
                ranking
            }

                submitStatsGlobal {
            acSubmissionNum {
                difficulty
                count
            }
    }
                }
    }`;
    const variables = {
        username,
    };

    const response = await fetch('https://leetcode.com/graphql', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            operationName: 'userProfileCalendar',
            query,
            variables
        })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};