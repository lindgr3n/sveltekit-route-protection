<script lang="ts">
</script>

<div class="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
	<div class="flex justify-start lg:w-0 lg:flex-1"><span class="hidden">Your logo here</span></div>

	<div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0 gap-4">
		<a
			href="/dashboard"
			class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Dashboard</a
		>
		<a
			href="/profile"
			class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Profile</a
		>
		<form method="post" action="/logout">
			<button
				class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
				role="menuitem"
				tabindex="-1"
				id="user-menu-item-2"
				type="submit"
			>
				Sign out</button
			>
		</form>
	</div>
</div>
