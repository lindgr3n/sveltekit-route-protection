<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
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
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						/>
						<input id="token" name="token" type="hidden" class="hidden" bind:value={data.token} />
					</div>
				</div>
				{#if form?.token}<p class="text-red-500">Invalid token or token have expired</p>{/if}
				{#if form?.password}<p class="text-red-500">Invalid password</p>{/if}
				{#if form?.success}<p class="">Your password have been updated, please login</p>{/if}

				<div class="flex items-center justify-between">
					<div class="flex items-center" />

					<div class="text-sm">
						<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500"
							>back to login</a
						>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Reset password</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
