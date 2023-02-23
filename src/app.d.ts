// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from '@prisma/client';
import type { User } from 'lucia-auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			validate: import('@lucia-auth/sveltekit').Validate;
			validateUser: import('@lucia-auth/sveltekit').ValidateUser;
			setSession: import('@lucia-auth/sveltekit').SetSession;
		}
		// interface PageData {}
		// interface Platform {}
	}

	var __prisma: PrismaClient; // eslint-disable-line no-var

	/// <reference types="lucia-auth" />
	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type UserAttributes = {
			username: string;
		};
	}
}

export {};
