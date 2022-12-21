import { auth } from '$lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// TODO: Correct typing of event and resolve
async function hookHandle({ event, resolve }: { event: any; resolve: any }): Promise<Response> {
	const session = await event.locals.validate();
	const routeId = event.route.id;

	if (session && routeId.includes('/(auth)/')) {
		return new Response('Redirect', { status: 303, headers: { Location: '/dashboard' } });
	}

	if (!session && routeId.includes('/(app)/')) {
		// Need authentication
		return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
	}

	const result = await resolve(event);
	return result;
}

export const handle: Handle = sequence(handleHooks(auth), hookHandle);
