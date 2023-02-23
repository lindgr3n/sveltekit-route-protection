import { env } from '$env/dynamic/private';
import { PrismaClient } from '@prisma/client';

const prisma = global.__prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
	global.__prisma = prisma;
}

export { prisma };
