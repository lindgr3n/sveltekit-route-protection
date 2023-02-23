import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
	const user = await prisma.user.upsert({
		where: { id: 'yne6HjKj0ru6J4u' },
		update: {},
		create: {
			id: 'yne6HjKj0ru6J4u',
			username: 'test@example.com',
			Key: {
				create: {
					hashed_password:
						's2:CLoFR4bF778bAPpf:09c5ec5450d8305a081ddc0aa7991f2cbb4c09ae5c47416cae14fa3d544c02b72a04cb81b03a83dfccd49831937f92e264d561cadfe92bfc45482c9f4f5760eb', // password,
					primary: true,
					id: 'email:test@example.com'
				}
			}
		}
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
