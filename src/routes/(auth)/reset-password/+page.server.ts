import { auth } from '$lib/server/lucia';
import { sendMail } from '$lib/server/mail';
import { generatePasswordResetToken } from '$lib/server/supabase';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
const { randomBytes } = await import('crypto');

export const load: PageServerLoad = async function ({ locals }) {
	const session = await locals.getSession();
	if (session) throw redirect(302, '/dashboard');

	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString() ?? '';
		const token = randomBytes(48).toString('hex');
		const user = await auth.getUserByProviderId('email', email);

		await generatePasswordResetToken(token, user.userId);

		// TODO: Use email-templates pug
		const appName = 'SvelteKit route-protection';
		const mailOptions = {
			from: '"SvelteKit" <from@example.com>',
			to: email?.toString(),
			subject: 'Reset your SvelteKit route-protection password',
			text: 'Password reset link',
			html: `Hello,</br>We've received a request to reset the password for the ${appName} account associated with ${email.toString()}. No changes have been made to your account yet.</br></br>You can reset your password by clicking the link below:</br><a href="http://localhost:5173/reset-password/${token}" target="_blank" >Reset your password</a></br>This link will expire in 1h. If you did not request a new password, please let us know immediately by replying to this email.</br>`
		};

		sendMail(mailOptions);
		return {
			success: true
		};
	}
};
