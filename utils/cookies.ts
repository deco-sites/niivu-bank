import { getCookies, setCookie } from "std/http/mod.ts";

export const COOKIE_NAME = "niivo_auth";

export const getCookie = (
  req: Request,
): string | undefined => {
  const cookies = getCookies(req.headers);
  const cookie = cookies[COOKIE_NAME];
  return cookie;
};

export const setCookies = (
  value: string,
  headers: Headers,
) =>
  setCookie(headers, {
    name: COOKIE_NAME,
    value: value,
    path: "/",
    httpOnly: true,
    secure: true,
  });
