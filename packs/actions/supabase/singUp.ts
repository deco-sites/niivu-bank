import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import type { AppContext } from "$store/apps/site.ts";

export interface SingUp {
  email: string;
  password: string;
}

export default async function loader(
  props: SingUp,
  _req: Request,
  ctx: AppContext,
) {
  const { email, password } = props;
  const { supaBase } = ctx;
  if (!supaBase) {
    return "You must provide supaBase fields in site.ts";
  }

  const passwordRegex = /^(?=.*[!@#$%^&*()_+{}:<>?])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password) || !/@/.test(email)) {
    return "Verifique seu email ou senha";
  }

  const client = createClient(supaBase.url!, supaBase.token!);

  const { error } = await client.auth.signUp({ email, password });

  if (error) {
    return "Email já cadastrado";
  }
}
