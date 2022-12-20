<script>
	let className = '';

	export let type = 'submit';
	export { className as class };
</script>

<button
	{type}
	class="{className} flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	{...$$restProps}
>
	<slot />
</button>
