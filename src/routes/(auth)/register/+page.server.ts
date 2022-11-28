import { auth } from '$lib/server/lucia';
import { invalid, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

// export const load: PageServerLoad = async function ({ locals }) {
// 	const session = await locals.getSession();
// 	if (session) throw redirect(302, '/');
// 	return {};
// };

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email) {
			return invalid(400, { email, missing: true });
		}

		try {
			const user = await auth.createUser('email', email, { password });
			console.log('Registered user', user);
			// TODO: if no user exist
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (error) {
			return invalid(400, { email, incorrect: true });
		}
	}
};
