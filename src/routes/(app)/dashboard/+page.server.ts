import { error, invalid, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function ({ locals }) {
	const session = await locals.getSession();
	if (!session) throw redirect(302, '/login');

	return {};
};
