export function ExternalRedirect({ target }: {target: URL}) {
  window.location.replace(target.toString());
  return null;
}