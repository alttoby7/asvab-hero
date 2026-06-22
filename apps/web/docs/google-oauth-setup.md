# "Sign in with Google" — Owner Setup Runbook

The code for Google social login is already shipped, but **gated OFF** behind the
env flag `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED`. The button does not render to users
until you complete all three steps below. Do them in order, in one sitting —
the flag and the Supabase provider must go live together.

ASVAB Supabase project ref: `abypyprvgvofzrtifgzi`

---

## Step A — Google Cloud Console: create the OAuth client

1. Go to https://console.cloud.google.com/ and select (or create) a project.
2. **APIs & Services → OAuth consent screen** — if not already configured:
   - User type: **External**. Fill app name (e.g. "ASVAB Hero"), support email,
     and developer contact email. Save. (You can leave it in "Testing" while you
     verify, then "Publish" to production so any Google user can sign in.)
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
   - Application type: **Web application**.
   - Name: e.g. "ASVAB Hero Web".
   - **Authorized JavaScript origins** — add:
     ```
     https://asvabhero.com
     ```
   - **Authorized redirect URIs** — add EXACTLY (this is Supabase's callback,
     not your site):
     ```
     https://abypyprvgvofzrtifgzi.supabase.co/auth/v1/callback
     ```
   - Create. Copy the **Client ID** and **Client Secret**.

---

## Step B — Supabase: enable the Google provider

1. Open the Supabase dashboard → project `abypyprvgvofzrtifgzi`.
2. **Authentication → Providers → Google**.
3. Toggle **Enable Sign in with Google** on.
4. Paste the **Client ID** and **Client Secret** from Step A.
5. Save.
6. (Recommended) **Authentication → URL Configuration** — confirm `Site URL` is
   `https://asvabhero.com` and that `https://asvabhero.com/**` is in the
   **Redirect URLs** allowlist, so the post-login redirect to `/app/home`
   (and any `?next=`/`?return=` path) is permitted.

---

## Step C — Cloudflare Pages: flip the flag + redeploy

1. Cloudflare dashboard → Pages → the ASVAB Hero project → **Settings →
   Environment variables** (Production).
2. Add:
   ```
   NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED = true
   ```
3. **Redeploy** (this is a build-time flag — it only takes effect on a new
   build). Trigger a redeploy of the latest deployment, or push a commit.
4. Verify: open https://asvabhero.com/login and https://asvabhero.com/signup —
   the "Continue with Google" / "Sign up with Google" button should now appear.
   Click it, complete the Google consent, and confirm you land logged in on
   `/app/home`.

To roll back instantly: set `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED` to empty (or
remove it) and redeploy — the button disappears.

---

## How the callback works (no server route)

This site is a Next.js **static export** on Cloudflare Pages — there are no
server routes. The Supabase browser client (`@supabase/ssr` `createBrowserClient`)
uses the **PKCE flow** with `detectSessionInUrl` on by default. After Google
auth, the user is redirected back to `redirectTo` (defaults to `/app/home`,
honoring `?next=`/`?return=`); the browser client reads the auth code from the
URL and exchanges it for a session client-side. No `/auth/callback` route is
needed or created. The only requirement is that the redirect target is a page
that mounts the Supabase client — `/app/home` is a gated app page, so it does.
