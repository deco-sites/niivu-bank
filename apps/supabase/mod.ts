import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import { Secret } from "apps/website/loaders/secret.ts";
import { supabase } from "deco/deps.ts";

export interface Props {
  token?: Secret;
  url: string;
}

export interface State extends Props {
  supabase: SupabaseClient;
}

let client: supabase.SupabaseClient | null = null;
const DEFAULT_SUPABASE_LIVE_ENDPOINT =
  "https://jtqltxymgxpncsfhwcwd.supabase.co/";

const DEFAULT_SUPABASE_LIVE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWx0eHltZ3hwbmNzZmh3Y3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMTQ4OTEsImV4cCI6MjAyMzc5MDg5MX0.aTbbQYCCmZOuiid9fr36_WrirTiyqa2s4TKwxdPwQt8";

let userEndpoint = DEFAULT_SUPABASE_LIVE_ENDPOINT;
let userKey = DEFAULT_SUPABASE_LIVE_ANON_KEY;

export function setupSupabase(endpoint: string, key: string) {
  userEndpoint = endpoint;
  userKey = key;
}

export default function getSupabaseClient() {
  if (!client) {
    client = createClient(userEndpoint, userKey);
  }

  return client;
}
