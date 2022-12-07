import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { random, customRandom } from 'nanoid';
import crypto from 'crypto';
import { promisify } from 'util';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export async function getPasswordResetToken(token: string) {
	const { data, error } = await supabase.from('password_reset_token').select('*');

	if (!data) {
		return;
	}

	for (let index = 0; index < data.length; index++) {
		const resetToken = data[index];
		const matchingToken = await verifyScrypt(token, resetToken.token);
		if (matchingToken) {
			return resetToken;
		}
	}
}

export async function generatePasswordResetToken(token: string, userId: string) {
	const expiryDate = new Date();
	expiryDate.setMinutes(expiryDate.getMinutes() + 15);
	const hashed = await hashScrypt(token);

	const { data, error } = await supabase
		.from('password_reset_token')
		.insert([{ user_id: userId, token: hashed, token_expiry: expiryDate }]);

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
