import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email) {
			return fail(400, { email, missing: true });
		}

		try {
			const user = await auth.createUser('email', email, { password });
			// TODO: if no user exist
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (error) {
			return fail(400, { email, incorrect: true });
		}
	}
};
