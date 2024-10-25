<script lang="ts">
	import { Heart,Trash2 } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';
    import { enhance } from '$app/forms';
    import { confirmDelete } from '$lib/utils/confirmDelete';
	import type { Hobby } from '@prisma/client'; 
	export let hobbies: Hobby[];


</script>
  
<div class="grid gap-4">
    {#each hobbies as hobby}
      <div class="flex items-center gap-4">
        <Heart />
        <div class="grid gap-1">
          <p class="text-sm font-medium leading-none">{hobby.hobby}</p>
        </div>
        <div class="ml-auto font-medium">
          <form action="?/deleteHobby&id={hobby.id}" method="POST" use:enhance>
            <Button type="submit" variant="ghost" on:click={confirmDelete}>
              <Trash2 />
            </Button>
          </form>
        </div>
      </div>
    {/each}
</div>