/* ==========================================================================
   auth.js: optional email + password accounts, on every page.

   The site is fully usable without an account — drafts, checklists, and
   cards all live in localStorage on this device. Accounts are a wrapper,
   not a gate.

   Nothing here runs unless js/auth-config.js holds both a Supabase URL and
   an anon key. With the config empty this script contacts no one, loads
   no library, and leaves the nav's "Sign in" link as a plain link — so the
   static site stays static and file:// use keeps working.

   When configured, supabase-js is loaded lazily from a CDN on first need.
   ========================================================================== */

/* Where supabase-js comes from, when accounts are configured */
var AUTH_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

/* The config object from auth-config.js, or an empty one */
var AUTH_SETTINGS = (typeof window.SIMULA_AUTH === "object" && window.SIMULA_AUTH) || {};

function isAuthConfigured() {
  return Boolean(AUTH_SETTINGS.supabaseUrl && AUTH_SETTINGS.supabaseAnonKey);
}

var authClient = null;   /* the Supabase client, once created */
var authLoading = null;  /* in-flight load, so it only happens once */
var authFailed = false;  /* the library could not be loaded */


/* Load supabase-js and make the client. callback(client) always runs;
   client is null if anything went wrong. */
function getSupabase(callback) {
  if (!isAuthConfigured()) {
    callback(null);
    return;
  }
  if (authClient) {
    callback(authClient);
    return;
  }
  if (authLoading) {
    authLoading.push(callback);
    return;
  }
  authLoading = [callback];

  function deliver(client) {
    authClient = client;
    var waiting = authLoading;
    authLoading = null;
    waiting.forEach(function (next) {
      next(client);
    });
  }

  var script = document.createElement("script");
  script.src = AUTH_CDN;
  script.async = true;
  script.onload = function () {
    try {
      var client = window.supabase.createClient(AUTH_SETTINGS.supabaseUrl, AUTH_SETTINGS.supabaseAnonKey);
      deliver(client);
    } catch (error) {
      authFailed = true;
      deliver(null);
    }
  };
  script.onerror = function () {
    authFailed = true;
    deliver(null);
  };
  document.head.appendChild(script);
}


/* 1. THE NAV ENTRY ---------------------------------------------------------
   Every page's nav ends with <li class="nav-auth"><a href="login.html">…
   Signed out (or unconfigured) it stays a link. Signed in, it becomes the
   account's email with a Sign out button. */

function renderNavAuth(session) {
  var slot = document.querySelector(".nav-auth");
  if (!slot) {
    return;
  }
  slot.textContent = "";

  if (!session || !session.user) {
    var link = document.createElement("a");
    link.href = "login.html";
    link.textContent = "Sign in";
    slot.appendChild(link);
    return;
  }

  var user = document.createElement("span");
  user.className = "auth-user";
  var email = document.createElement("span");
  email.className = "auth-user-email";
  email.textContent = session.user.email || "Signed in";
  var out = document.createElement("button");
  out.type = "button";
  out.className = "auth-signout";
  out.textContent = "Sign out";
  out.addEventListener("click", function () {
    out.disabled = true;
    getSupabase(function (client) {
      if (client) {
        client.auth.signOut();
      } else {
        out.disabled = false;
      }
    });
  });
  user.appendChild(email);
  user.appendChild(out);
  slot.appendChild(user);
}

function setupNavAuth() {
  if (!isAuthConfigured()) {
    return; /* the plain "Sign in" link already in the page is correct */
  }
  getSupabase(function (client) {
    if (!client) {
      return;
    }
    client.auth.getSession().then(function (result) {
      renderNavAuth(result.data);
    });
    client.auth.onAuthStateChange(function (event, session) {
      renderNavAuth(session);
    });
  });
}


/* 2. THE LOGIN PAGE ---------------------------------------------------------
   Two tabs over one email + password form. The tab sets the mode and the
   submit button's wording; the password field's autocomplete hint follows. */

function setStatus(text, kind) {
  var status = document.getElementById("auth-status");
  if (!status) {
    return;
  }
  status.textContent = text;
  status.classList.toggle("is-error", kind === "error");
  status.classList.toggle("is-success", kind === "success");
}

function authFriendlyError(error) {
  var message = error && error.message ? error.message : "";
  if (/invalid login credentials/i.test(message)) {
    return "That email and password don't match an account yet.";
  }
  if (/email not confirmed/i.test(message)) {
    return "Check your inbox and confirm your email, then sign in.";
  }
  if (/already registered/i.test(message)) {
    return "An account with that email already exists. Try signing in.";
  }
  if (/password/i.test(message) && /at least/i.test(message)) {
    return "Passwords need at least 6 characters.";
  }
  return message || "Something went wrong. Please try again.";
}

function setupLoginPage() {
  var form = document.getElementById("auth-form");
  if (!form) {
    return;
  }

  var tabSignIn = document.getElementById("tab-signin");
  var tabSignUp = document.getElementById("tab-signup");
  var emailInput = document.getElementById("auth-email");
  var passwordInput = document.getElementById("auth-password");
  var submit = document.getElementById("auth-submit");
  var unconfiguredNote = document.getElementById("auth-unconfigured");
  var mode = "signin";

  function setMode(nextMode) {
    mode = nextMode;
    var signingIn = mode === "signin";
    tabSignIn.setAttribute("aria-pressed", signingIn ? "true" : "false");
    tabSignUp.setAttribute("aria-pressed", signingIn ? "false" : "true");
    submit.textContent = signingIn ? "Sign in" : "Create account";
    passwordInput.setAttribute("autocomplete", signingIn ? "current-password" : "new-password");
    setStatus("");
  }

  tabSignIn.addEventListener("click", function () { setMode("signin"); });
  tabSignUp.addEventListener("click", function () { setMode("signup"); });

  if (!isAuthConfigured()) {
    /* No accounts on this copy: say so plainly, keep the form visible but inert */
    if (unconfiguredNote) {
      unconfiguredNote.hidden = false;
    }
    emailInput.disabled = true;
    passwordInput.disabled = true;
    submit.disabled = true;
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = emailInput.value.trim();
    var password = passwordInput.value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Enter a valid email address.", "error");
      emailInput.focus();
      return;
    }
    if (password.length < 6) {
      setStatus("Passwords need at least 6 characters.", "error");
      passwordInput.focus();
      return;
    }

    submit.disabled = true;
    setStatus(mode === "signin" ? "Signing in…" : "Creating your account…");

    getSupabase(function (client) {
      if (!client) {
        submit.disabled = false;
        setStatus("The sign-in service could not be reached. Try again.", "error");
        return;
      }
      var request = mode === "signin"
        ? client.auth.signInWithPassword({ email: email, password: password })
        : client.auth.signUp({ email: email, password: password });

      request.then(function (result) {
        submit.disabled = false;
        if (result.error) {
          setStatus(authFriendlyError(result.error), "error");
          return;
        }
        if (mode === "signup" && result.data && result.data.user && !result.data.session) {
          setStatus("Account created. Check your email to confirm it, then sign in.", "success");
          form.reset();
          return;
        }
        setStatus("You're signed in.", "success");
        form.reset();
      }).catch(function (error) {
        submit.disabled = false;
        setStatus(authFriendlyError(error), "error");
      });
    });
  });

  /* If someone arrives already signed in, say so instead of a cold form */
  getSupabase(function (client) {
    if (!client) {
      return;
    }
    client.auth.getSession().then(function (result) {
      if (result.data && result.data.user) {
        setStatus("You're already signed in as " + result.data.user.email + ".", "success");
      }
    });
  });
}


/* START ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  setupNavAuth();
  setupLoginPage();
});
