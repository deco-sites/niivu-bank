import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import { Secret } from "apps/website/loaders/secret.ts";
import manifest, { Manifest } from "./manifest.gen.ts";
import { App } from "deco/mod.ts";

export interface Props {
  url: string;
  token: Secret;
}

export interface State extends Props {
  api: SupabaseClient;
}

export default function App({ url, token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWx0eHltZ3hwbmNzZmh3Y3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMTQ4OTEsImV4cCI6MjAyMzc5MDg5MX0.aTbbQYCCmZOuiid9fr36_WrirTiyqa2s4TKwxdPwQt8" as unknown as Secret}: Props): App<Manifest, State> {
  const stringToken = typeof token === "string" ? token : token?.get?.() ?? "";
  const api = createClient(url, stringToken);
  return {
    manifest,
    state: { url, token, api },
  };
}
