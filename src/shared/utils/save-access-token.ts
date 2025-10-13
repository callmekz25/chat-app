export function saveAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
  window.dispatchEvent(new Event('access_token_updated'));
}
