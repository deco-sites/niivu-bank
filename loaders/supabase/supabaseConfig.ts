import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";

export interface Props {
  token: string;
  url: string;
}

export type Supabase = SupabaseClient;

/** @title Supabas config setup */
export default function loader({ token, url }: Props): Supabase {
  return createClient(url, token);
}
