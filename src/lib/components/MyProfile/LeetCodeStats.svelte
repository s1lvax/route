<script lang="ts">
   import { onMount } from 'svelte';
   import type { LeetCodeStats } from '$lib/types/LeetCodeData';
   import { fetchLeetCodeStats } from '$lib/utils/leetcode/leetcode';

   export let leetCodeUsername: string;
   let data: LeetCodeStats | null = null;

   onMount(async () => {
      try {
         data = await fetchLeetCodeStats(leetCodeUsername);
      } catch (error) {
         console.error('Error fetching LeetCode stats:', error);
      }
   });
</script>

<div>
   <h3>LeetCode Stats for {leetCodeUsername}</h3>
   {#if data}
      <ul>
         <li><strong>Active Years:</strong> {data.userCalendar.activeYears.join(', ')}</li>
         <li><strong>Current Streak:</strong> {data.userCalendar.streak} days</li>
         <li><strong>Total Active Days:</strong> {data.userCalendar.totalActiveDays}</li>
         <li><strong>Daily Coding Challenge Badges:</strong>
            <ul>
               {#each data.userCalendar.dccBadges as badge}
                  <li>
                     <img src={badge.badge.icon} alt={badge.badge.name} width="24" height="24" />
                     {badge.badge.name} - Earned on {new Date(badge.timestamp).toLocaleDateString()}
                  </li>
               {/each}
            </ul>
         </li>
         <!-- Render additional data as required -->
      </ul>
   {:else}
      <p>Loading LeetCode stats...</p>
   {/if}
</div>