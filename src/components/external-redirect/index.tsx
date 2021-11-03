export function ExternalRedirect({ target }: {target: URL}) {
  window.location.replace(target.href);
  return null;
}