/* ==========================================================================
   auth-config.js: the only place account settings live.
   Fill in both strings to turn on email + password sign-in (Supabase).
   Leave them empty and the site stays a plain static site: auth.js makes
   no requests, loads nothing, and every page works without an account.

   Getting the two values:
   1. Make a project at supabase.com (free tier is enough).
   2. Copy the project URL and the publishable (anon) key from
      Project Settings → API.
   3. Paste them below, between the quotes.

   The anon key is meant for the browser — it is safe to publish with a
   static site as long as Row Level Security is on in the project.
   ========================================================================== */

window.SIMULA_AUTH = {
  supabaseUrl: "",
  supabaseAnonKey: ""
};
