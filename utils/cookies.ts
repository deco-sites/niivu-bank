import { getCookies, setCookie } from "std/http/mod.ts";
import type { Supabase } from "$store/loaders/supabase/supabaseConfig.ts";
import { INTERNAL_ERROR, SERVER_ERROR } from "$store/utils/enum.ts";

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

export async function getEmail(
  { supabaseClient, req, access_token }: {
    supabaseClient: Supabase;
    req?: Request;
    access_token?: string;
  },
) {
  let cookie;
  if (!access_token && req) {
    cookie = getCookie(req);
  }
  const { data: { user } } = await supabaseClient.auth.getUser(
    access_token ?? cookie,
  );

  if (!user) {
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  const { email } = user;

  if (!email) {
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  return email;
}

export async function validateCookie({
  supabaseClient,
  req,
  access_token,
}: {
  supabaseClient: Supabase;
  req: Request;
  access_token?: string;
}) {
  let cookie;
  if (!access_token && req) {
    cookie = getCookie(req);
  }

  const { data } = await supabaseClient.auth.getUser(
    access_token ?? cookie,
  );

  if (!data.user) {
    return {
      isValid: false,
    };
  } else {
    return {
      isValid: true,
      email: data.user.email,
      id: data.user.id,
    };
  }
}
