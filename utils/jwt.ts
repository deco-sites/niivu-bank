import { decodeBase64Url } from "https://deno.land/std@0.218.2/encoding/base64url.ts";

export function checkJWTValidity(token: string) {
  const [_header, payload, _signature] = token.split(".");

  const decodedPayload = JSON.parse(
    new TextDecoder().decode(decodeBase64Url(payload)),
  );

  const exp = decodedPayload.exp;
  const now = Math.floor(Date.now() / 1000);
  if (now > exp) {
    console.log("Token expired.");
    return false;
  } else {
    console.log("Token valid.");
    return true;
  }
}
