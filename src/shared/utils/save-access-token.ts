export function saveAccessToken(token: string) {
  localStorage.setItem('access_token', token);
  window.dispatchEvent(new Event('access_token_updated'));
}
