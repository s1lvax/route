<script lang="ts">
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex min-h-screen items-center justify-center p-6">
	<div class="flex flex-col items-center space-y-4">
		<img src="https://http.cat/404.jpg" alt="404 cat" class="w-full max-w-xs" />
		<Card.Root class="w-full max-w-lg">
			<Card.Header class="pb-2">
				<Card.Title class="text-4xl font-bold">User Not Found 🤓</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="text-sm text-muted-foreground">
					The user you are looking for does not exist. But hey, don’t feel left out!
					<span class="font-semibold">Is this you?</span>
					<a href="/signup" class="text-blue-600 hover:underline"> Create your account here! </a>
				</p>
				<p class="mt-4 text-sm text-muted-foreground">
					Or, you know, keep doing whatever you were doing when you stumbled upon this page. 🤷‍♂️
				</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
