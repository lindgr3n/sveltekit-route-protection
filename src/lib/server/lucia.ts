import lucia from 'lucia-auth';
import supabase from '@lucia-auth/adapter-supabase';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const url = env.SUPABASE_URL ?? '';
const apiKey = env.SUPABASE_ANON_KEY ?? '';

export const auth = lucia({
	adapter: supabase(url, apiKey),
	env: dev ? 'DEV' : 'PROD'
});

export type Auth = typeof auth;
