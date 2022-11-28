<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';

	const user = getUser();
</script>

<h1>Profile page</h1>
{$user?.userId}
