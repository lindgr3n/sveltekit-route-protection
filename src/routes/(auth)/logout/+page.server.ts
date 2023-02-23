import { redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	// Not allowing anything other then posting request
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.validate();

		if (!session) {
			throw redirect(302, '/');
		}

		await auth.invalidateSession(session.sessionId);
		locals.setSession(null);
		throw redirect(302, '/');
	}
};
