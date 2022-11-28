<script lang="ts">
	import Header from '$lib/components/templates/Header.svelte';
	import { getUser } from '@lucia-auth/sveltekit/client';

	const user = getUser();
	console.log('GUEST LAYOUT CLIENT', $user);
	// TODO: Should we show another header on guest pages if we are authenticated?
</script>

<Header />
<slot />
