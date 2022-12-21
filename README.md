# SvelteKit route protection

Basic boilerplate with all included to get up and running a basic application with a welcome guest landing page, login, register, lost password with mail and protected app routes.

## create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Lucia setup

TODO: https://lucia-auth.vercel.app/sveltekit/start-here/getting-started

## Mail setup

For password reset we need a mail integration.

### Mailtrap

For testing we are using [Mailtrap](https://mailtrap.io)

To make this work you need an account and get the user/password to update the env file.

```
MAIL_USER=[MAILTRAP_USER]
MAIL_PASSWORD=[MAILTRAP_PASSWORD]
```

You can get this values from the SMTP settings.

## Reset password setup

Create table

```
CREATE TABLE public.password_reset_token (
	id UUID DEFAULT extensions.uuid_generate_v4(),
	user_id UUID REFERENCES public.user(id),
	token TEXT NOT NULL UNIQUE,
	token_expires timestamp NULL
);
ALTER TABLE ONLY password_reset_token ADD CONSTRAINT "ID_PKEY" PRIMARY KEY (user_id,token);
```

With this we now have a place to store our reset token

WIP

## Why not +layout.server.ts

We don't want to use +layout.server.ts because it is not run on every request e.g on page navigation only on page refresh.
You can try that by login in. While you are on the dashboard delete the auth cookie in the storage. If you try and navigate to /profile the layout will not be run. Thats why we want to use +page.server.ts.

You could use await parent(); to trigger a reload of the parent layout inside the load. Unsure which approach is the best.

Good video explaining the issue https://youtu.be/UbhhJWV3bmI or more info from the issue https://github.com/sveltejs/kit/issues/6315
