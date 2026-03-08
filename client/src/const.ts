export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

const FALLBACK_LOGIN_URL = "#";

const warnLoginConfig = (reason: string) => {
  console.warn(`[Auth] Unable to build login URL: ${reason}`);
};

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  if (typeof window === "undefined") {
    return FALLBACK_LOGIN_URL;
  }

  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL?.trim();
  const appId = import.meta.env.VITE_APP_ID?.trim();

  if (!oauthPortalUrl) {
    warnLoginConfig("VITE_OAUTH_PORTAL_URL is missing");
    return FALLBACK_LOGIN_URL;
  }

  if (!appId) {
    warnLoginConfig("VITE_APP_ID is missing");
    return FALLBACK_LOGIN_URL;
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    const oauthPortalBase = new URL(oauthPortalUrl, window.location.origin)
      .toString()
      .replace(/\/+$/, "");
    const url = new URL(`${oauthPortalBase}/app-auth`);

    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    return url.toString();
  } catch {
    warnLoginConfig(`VITE_OAUTH_PORTAL_URL is invalid (${oauthPortalUrl})`);
    return FALLBACK_LOGIN_URL;
  }
};
