import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { random, customRandom } from 'nanoid';
import crypto from 'crypto';
import { promisify } from 'util';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export async function getPasswordResetToken(token: string) {
	const today = new Date();
	const todayFormatted = `${today.getFullYear()}-${
		today.getMonth() + 1
	}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

	const { data, error } = await supabase
		.from('password_reset_token')
		.select('*')
		.lt('expires_at', todayFormatted)
		.order('expires_at', { ascending: true });

	if (!data) {
		return null;
	}

	// TODO: We just want the latest of each unique user_id
	const uniqueSet = new Set();
	for (const token of data) {
		uniqueSet.add(token);
	}
	for (let index = 0; index < data.length; index++) {
		const resetToken = data[index];
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
	const todayFormatted = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

	const { data, error } = await supabase
		.from('password_reset_token')
		.delete()
		.gte('expires_at', todayFormatted);

	if (!data) {
		return;
	}
}

export async function generatePasswordResetToken(token: string, userId: string) {
	const expiryDate = new Date();
	expiryDate.setMinutes(expiryDate.getMinutes() + 60);
	const hashed = await hashScrypt(token);

	const { data, error } = await supabase
		.from('password_reset_token')
		.insert([{ user_id: userId, token: hashed, expired_at: expiryDate }]);

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
