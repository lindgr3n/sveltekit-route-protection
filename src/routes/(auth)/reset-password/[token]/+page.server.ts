import { auth } from '$lib/server/lucia';
import { getPasswordResetToken } from '$lib/server/supabase';
import { invalid } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function ({ params }) {
	const { token } = params;

	return {
		token: token
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const { token } = params;
		const password = data.get('password')?.toString() ?? '';

		// TODO: Password rules
		if (!password) {
			return invalid(400, { password, invalid: true });
		}

		const matchingToken = await getPasswordResetToken(token);
		if (!matchingToken) {
			return invalid(400, { token, incorrect: true });
		}

		const user = await auth.getUser(matchingToken.user_id);
		auth.updateUserPassword(user.userId, password);

		return {
			success: true
		};
	}
};
