const PORTAL_ORIGIN = "https://santipruebas.netlify.app";
const PLAN_ORIGIN = "https://suscriptions-santi.netlify.app";
const ADMIN_ORIGIN = "https://robin-admin-platform.netlify.app";

function upstreamFor(url) {
  if (url.pathname === "/admin" || url.pathname === "/admin/") {
    return new URL("/" + url.search, ADMIN_ORIGIN);
  }
  if (url.pathname.startsWith("/admin/")) {
    return new URL(url.pathname.slice("/admin".length) + url.search, ADMIN_ORIGIN);
  }
  if (url.pathname.startsWith("/api/admin/") || url.pathname === "/api/admin") {
    return new URL(url.pathname + url.search, ADMIN_ORIGIN);
  }
  if (url.pathname.startsWith("/api/internal/crm/")) {
    return new URL(url.pathname + url.search, ADMIN_ORIGIN);
  }
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
    const response = await fetch(new Request(upstream, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
      redirect: "manual",
    }));

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/css")) return response;

    const body = await response.text();
    const rewritten = body.replaceAll("/assets/", "/admin/assets/");
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-length");
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("etag");
    return new Response(rewritten, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
