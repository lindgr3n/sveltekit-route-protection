<script lang="ts">
	import BaseButton from '$lib/components/atoms/BaseButton.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex flex-col h-full justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img
			class="mx-auto h-12 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset password</h2>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form class="space-y-6" method="POST">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
				{#if form?.success}<p class="">Check your email for your reset link</p>{/if}
				<div class="flex items-center justify-between">
					<div class="flex items-center" />

					<div class="text-sm">
						<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500"
							>back to login</a
						>
					</div>
				</div>

				<div>
					<BaseButton type="submit" class="ml-4">Reset password</BaseButton>
				</div>
			</form>
		</div>
	</div>
</div>
