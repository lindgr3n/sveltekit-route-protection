<script>
	import { invalidateAll } from '$app/navigation';
	import { signOut } from '@lucia-auth/sveltekit/client';

	async function onSignOut() {
		await signOut();
		invalidateAll();
	}
</script>

<div class="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
	<div class="flex justify-start lg:w-0 lg:flex-1"><span class="hidden">Your logo here</span></div>

	<div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
		<a
			href="/dashboard"
			class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Dashboard</a
		>
		<a
			href="/profile"
			class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Profile</a
		>
		<button on:click={onSignOut}>Logout</button>
	</div>
</div>
