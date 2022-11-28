import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ locals }) {
	const session = await locals.getSession();
	if (!session) throw redirect(302, '/login');

	return {};
};
