import { prisma } from '$lib/server/prisma';
import { random, customRandom } from 'nanoid';
import crypto from 'crypto';
import { promisify } from 'util';

export async function getPasswordResetToken(token: string) {
	const today = new Date();

	const resetTokens = await prisma.passwordResetToken.findMany({
		where: {
			token_expires: {
				gt: today
			}
		},
		orderBy: {
			token_expires: 'asc'
		}
	});

	if (!resetTokens) {
		return null;
	}

	// TODO: We just want the latest of each unique user_id
	const uniqueSet = new Set();
	for (const token of resetTokens) {
		uniqueSet.add(token);
	}
	for (let index = 0; index < resetTokens.length; index++) {
		const resetToken = resetTokens[index];
		const matchingToken = await verifyScrypt(token, resetToken.token);
		// Verify expire date
		if (matchingToken) {
			return resetToken;
		}
	}
	return null;
}

export async function clearExpiredTokens() {
	// TODO: Delete all token where the date is older then today
	const today = new Date();
	await prisma.passwordResetToken.deleteMany({
		where: {
			token_expires: {
				lt: today
			}
		}
	});
}

export async function generatePasswordResetToken(token: string, userId: string) {
	const expiryDate = new Date();
	expiryDate.setHours(expiryDate.getHours() + 1);
	const hashed = await hashScrypt(token);

	const data = await prisma.passwordResetToken.create({
		data: {
			user_id: userId,
			token: hashed,
			token_expires: expiryDate
		}
	});

	// TODO: catch error
}

// ***********************

// From lucia-auth/utils/crypto.js
const generateRandomString = (length: number) => {
	const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	return customRandom(characters, length, random)();
};

const scrypt = promisify(crypto.scrypt);
const hashScrypt = async (s: string, salt = '') => {
	if (!salt) {
		salt = generateRandomString(16);
	}
	const hash: any = await scrypt(s, salt, 64);
	return salt + ':' + hash.toString('hex');
};

export const verifyScrypt = async (s: string, hash: string) => {
	const [salt, key] = hash.split(':');
	const keyBuffer = Buffer.from(key, 'hex');
	const derivedKey: any = await scrypt(s, salt, 64);
	/*
    comparison operation takes the same amount of time every time
    attackers can analyze the amount of time
    */
	return crypto.timingSafeEqual(keyBuffer, derivedKey);
};
