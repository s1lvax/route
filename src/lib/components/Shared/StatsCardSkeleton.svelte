<script>
	import * as Card from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<div class="flex w-full items-center space-x-2">
			<Skeleton class="h-5 w-[75%]"></Skeleton>
		</div>
	</Card.Header>
	<Card.Content>
		<Skeleton class="h-8 w-[40%]"></Skeleton>
	</Card.Content>
</Card.Root>
