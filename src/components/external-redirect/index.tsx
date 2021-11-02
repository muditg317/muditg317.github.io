export function ExternalRedirect({ target }) {
  window.location.replace(target);
  return null;
}