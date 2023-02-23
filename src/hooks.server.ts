import { auth } from '$lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { MaybePromise } from '$app/forms';

// TODO: Correct typing of event and resolve
async function hookHandle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>;
}): Promise<Response> {
	const { session, user } = await event.locals.validateUser();
	const routeId = event.route.id;

	// Could just remove this also. JUst show a dashboard icon on the landingpage if admin and authenticated.
	if (session && routeId && routeId.includes('/(auth)/') && !routeId.includes('/(auth)/logout')) {
		return new Response('Redirect', { status: 303, headers: { Location: '/dashboard' } });
	}

	if (!session && routeId && routeId.includes('/(app)/')) {
		// Need authentication
		return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
	}
	if (session && !event.locals.user) {
		event.locals.user = user;
	}

	const result = await resolve(event);
	return result;
}

export const handle: Handle = sequence(handleHooks(auth), hookHandle);
