import { auth } from '$lib/server/lucia';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ locals }) {
	const session = await locals.getSession();
	console.log('INSIDE LOGIN', session);
	if (session) throw redirect(302, '/dashboard');

	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString() ?? '';

		if (!email) {
			return invalid(400, { email, missing: true });
		}

		try {
			const user = await auth.authenticateUser('email', email, password);
			// TODO: if no user exist?
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch {
			// invalid credentials
			return invalid(400, { email, incorrect: true });
		}
	}
};
