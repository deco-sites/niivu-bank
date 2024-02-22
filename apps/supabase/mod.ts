import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import { Secret } from "apps/website/loaders/secret.ts";
import manifest, { Manifest } from "./manifest.gen.ts";
import { App } from "deco/mod.ts";

export interface Props {
  token?: Secret;
  url: string;
}

export interface State extends Props {
  supabase: SupabaseClient;
}

export default function App({ url, token}: Props): App<Manifest, State> {
  const stringToken = typeof token === "string" ? token : token?.get?.() ?? "";
  const supabase = createClient(url, stringToken);
  return {
    manifest,
    state: { url, token, supabase },
  };
}
