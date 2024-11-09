<script lang="ts">
   import { onMount } from 'svelte';
   import type { LeetCodeStats } from '$lib/types/LeetCodeData';
   import { Flame, Calendar, Medal } from 'lucide-svelte';

   export let leetCodeUsername: string;
   let data: LeetCodeStats | null = null;

   // Variables to store problem-solving counts per difficulty
   let easyCount = 0;
   let mediumCount = 0;
   let hardCount = 0;

   // Fetch data and calculate proportions
   onMount(async () => {
      try {
         const response = await fetch(`/api/leetcode?leetCodeUsername=${leetCodeUsername}`);
         if (response.ok) {
            const result = await response.json();
            data = result.data.matchedUser;

            // Extract counts for each difficulty
            easyCount = data?.submitStatsGlobal.acSubmissionNum.find(item => item.difficulty === "Easy")?.count || 0;
            mediumCount = data?.submitStatsGlobal.acSubmissionNum.find(item => item.difficulty === "Medium")?.count || 0;
            hardCount = data?.submitStatsGlobal.acSubmissionNum.find(item => item.difficulty === "Hard")?.count || 0;
         }
      } catch (error) {
         console.error('Error fetching LeetCode stats:', error);
      }
   });

   // Calculate total count and proportions for each difficulty
   $: totalProblems = easyCount + mediumCount + hardCount;
   $: easyProportion = (easyCount / totalProblems) * 100 || 0;
   $: mediumProportion = (mediumCount / totalProblems) * 100 || 0;
   $: hardProportion = (hardCount / totalProblems) * 100 || 0;
</script>

<style>
   .stats-card { padding: 1rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
   .header, .section { margin-bottom: 1rem; }
   .icon { width: 24px; height: 24px; margin-right: 8px; color: orange; }
   .badge-grid { display: grid; grid-template-columns: repeat(auto-fill, 50px); gap: 8px; }
   .badge { text-align: center; font-size: 0.8em; color: grey; }
   .problem-summary { display: flex; flex-direction: column; padding-top: 1rem; }
   .difficulty-line-container { margin-top: 1rem; position: relative; text-align: center; }
   .difficulty-line { display: flex; height: 10px; border-radius: 5px; overflow: hidden; }
   .difficulty-easy { background-color: green; }
   .difficulty-medium { background-color: yellow; }
   .difficulty-hard { background-color: red; }
   .difficulty-label-container {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      font-weight: bold;
      font-size: 0.9em;
      color: #f1f1f1;
   }
</style>

<div class="stats-card">
   <div class="header">
      <h3>LeetCode Stats for {leetCodeUsername}</h3>
      <div style="display: flex; gap: 1rem;">
         <div>
            <Flame class="icon" /><strong>{data?.userCalendar.streak}</strong> day streak
         </div>
         <div>
            <Calendar class="icon" /><strong>{data?.userCalendar.totalActiveDays}</strong> active days
         </div>
         <div>
            <Medal class="icon" /> Ranking: <strong>{data?.profile.ranking}</strong>
         </div>
      </div>
   </div>

   {#if data}
      {#if data.userCalendar.dccBadges.length > 0}
         <div class="section">
            <h4>Badges</h4>
            <div class="badge-grid">
               {#each data.userCalendar.dccBadges as badge}
                  <div class="badge">
                     <img src={`https://leetcode.com/${badge.badge.icon}`} alt={badge.badge.name} width="30" height="30" />
                     <div>{badge.badge.name}</div>
                  </div>
               {/each}
            </div>
         </div>
      {/if}

      <div class="section">
         <h4>Problem Solving Summary</h4>
         <div class="problem-summary">
            <div class="difficulty-line-container">
               <div class="difficulty-line">
                  <div class="difficulty-easy" style="flex: 0 0 {easyProportion}%;"></div>
                  <div class="difficulty-medium" style="flex: 0 0 {mediumProportion}%;"></div>
                  <div class="difficulty-hard" style="flex: 0 0 {hardProportion}%;"></div>
               </div>
               <div class="difficulty-label-container">
                  <div>{easyCount} Easy</div>
                  <div>{mediumCount} Medium</div>
                  <div>{hardCount} Hard</div>
               </div>
            </div>
         </div>
      </div>
   {:else}
      <p>Loading LeetCode stats...</p>
   {/if}
</div>
