export function readHash(defaultPage = "home") {
  const raw = (typeof window !== "undefined" ? window.location.hash : "") || "";
  const val = raw.startsWith("#") ? raw.slice(1) : raw;
  return val || defaultPage;
}

export function navigateHash(to) {
  if (!to) return;
  if (to.startsWith("#")) window.location.hash = to;
  else window.location.hash = `#${to}`;
}
