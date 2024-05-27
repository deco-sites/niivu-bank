import { Secret } from "apps/website/loaders/secret.ts";
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";

export interface Props {
  token: Secret;
  url: string;
}

export type Supabase = SupabaseClient;

/** @title Supabas config setup */
export default function loader({ token, url }: Props): Supabase {
  const tokenString = typeof token === "string" ? token : token.get() as string;
  return createClient(
    url,
    tokenString,
  );
}
