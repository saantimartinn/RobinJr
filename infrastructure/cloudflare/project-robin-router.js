const PORTAL_ORIGIN = "https://santipruebas.netlify.app";
const PLAN_ORIGIN = "https://suscriptions-santi.netlify.app";

function upstreamFor(url) {
  if (/^\/login\/?$/.test(url.pathname)) {
    return new URL("/portal/" + url.search, PORTAL_ORIGIN);
  }
  if (url.pathname === "/portal") {
    return new URL("/portal/" + url.search, PORTAL_ORIGIN);
  }
  if (url.pathname.startsWith("/portal/api/")) {
    return new URL(url.pathname.slice("/portal".length) + url.search, PORTAL_ORIGIN);
  }
  if (url.pathname.startsWith("/portal/")) {
    return new URL(url.pathname + url.search, PORTAL_ORIGIN);
  }
  if (url.pathname === "/therobinplan") {
    return new URL("/therobinplan/" + url.search, PLAN_ORIGIN);
  }
  if (url.pathname.startsWith("/therobinplan/api/")) {
    return new URL(url.pathname.slice("/therobinplan".length) + url.search, PLAN_ORIGIN);
  }
  if (url.pathname.startsWith("/therobinplan/")) {
    return new URL(url.pathname + url.search, PLAN_ORIGIN);
  }
  return null;
}

export default {
  async fetch(request) {
    const upstream = upstreamFor(new URL(request.url));
    if (!upstream) return fetch(request);

    const headers = new Headers(request.headers);
    headers.set("X-Forwarded-Host", new URL(request.url).host);
    headers.set("Origin", upstream.origin);
    return fetch(new Request(upstream, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
      redirect: "manual",
    }));
  },
};
