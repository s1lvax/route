<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import FormCardHeader from '$lib/components/MyProfile/FormCardHeader.svelte';
	import type { PageData } from '../$types';
	import SocialsForm from '$lib/components/MyProfile/SocialsForm.svelte';
	import UserSocials from '$lib/components/MyProfile/UserSocials.svelte';
	import HobbyForm from '$lib/components/MyProfile/HobbyForm.svelte';
	import UserHobbies from '$lib/components/MyProfile/UserHobbies.svelte';
	import PersonalInformationForm from '$lib/components/MyProfile/PersonalInformationForm.svelte';
	import PersonalInformation from '$lib/components/MyProfile/PersonalInformation.svelte';
	import CryptoForm from '$lib/components/MyProfile/CryptoForm.svelte';
	import UserCrypto from '$lib/components/MyProfile/UserCrypto.svelte';

	export let data: PageData;
</script>

<h1
	class="mb-5 flex flex-row items-center space-x-2 text-2xl font-bold text-muted-foreground md:mb-10 md:text-6xl"
>
	Personal
</h1>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="socials">
		<Card.Root class="xl:col-span-2">
			<FormCardHeader
				description="The socials visible on your profile. You can drag socials around to modify the order"
				title="Socials"
			>
				<div class="flex flex-row items-stretch gap-4">
					<SocialsForm data={data.socialsForm} />
				</div>
			</FormCardHeader>
			<Card.Content>
				<UserSocials socials={data.socials} />
			</Card.Content>
		</Card.Root>
	</div>
	<div class="hobby">
		<Card.Root>
			<FormCardHeader title="Hobbies" description="You can add your hobbies here">
				<HobbyForm data={data.hobbiesForm} />
			</FormCardHeader>
			<Card.Content class="grid gap-8">
				<UserHobbies hobbies={data.hobbies} />
			</Card.Content>
		</Card.Root>
	</div>
	<div>
		<Card.Root>
			<FormCardHeader
				title="Personal Information"
				description="You can add information about yourself here"
			>
				<PersonalInformationForm data={data.personalInformationForm} />
			</FormCardHeader>
			<Card.Content class="grid gap-8">
				{#if data.personalInformation}
					<PersonalInformation data={data.personalInformation} />
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
	<div>
		<Card.Root>
			<FormCardHeader
				title="Crypto Wallets"
				description="You can add your crypto wallets here that will be shown on your profile footer"
			>
				<CryptoForm data={data.cryptoForm} />
			</FormCardHeader>
			<Card.Content class="grid gap-8">
				<UserCrypto crypto={data.crypto} />
			</Card.Content>
		</Card.Root>
	</div>
</div>
