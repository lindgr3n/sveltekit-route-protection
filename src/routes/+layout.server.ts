import { handleServerSession } from '@lucia-auth/sveltekit';
import type { LayoutServerLoad } from './$types';
console.log('WOHOOO root layout server');

export const load: LayoutServerLoad = handleServerSession();
