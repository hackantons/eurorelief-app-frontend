export const getCookie = (name: string): string => {
  const cookieArr = document.cookie.split(';');
  let r = null;

  cookieArr.map(cookie => {
    const pair = cookie.split('=');
    if (name === pair[0].trim()) {
      r = decodeURIComponent(pair[1]);
    }
  });
  return r;
};

export const setCookie = (
  name: string,
  value: string,
  seconds: number = 24 * 60 * 60 * 365
): void => {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${seconds}`;
};
