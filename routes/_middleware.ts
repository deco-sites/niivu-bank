import { FreshContext } from "$fresh/server.ts";
import { getCookie } from "$store/utils/cookies.ts";
import { checkJWTValidity } from "$store/utils/jwt.ts";

export function handler(
  req: Request,
  ctx: FreshContext,
) {
  const isMyAccount = new URLPattern({ pathname: "/minha-conta*" }).test(
    req.url,
  );
  if (isMyAccount) {
    const cookie = getCookie(req);

    if (cookie === undefined) {
      return new Response("", { status: 307, headers: { location: "/" } });
    }

    if (
      !checkJWTValidity(cookie)
    ) {
      return new Response("", { status: 307, headers: { location: "/" } });
    }
  }

  return ctx.next();
}
