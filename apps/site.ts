import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { color as shopify } from "apps/shopify/mod.ts";
import { color as vnda } from "apps/vnda/mod.ts";
import { color as vtex } from "apps/vtex/mod.ts";
import { color as wake } from "apps/wake/mod.ts";
import { color as linx } from "apps/linx/mod.ts";
import { color as nuvemshop } from "apps/nuvemshop/mod.ts";
import { Section } from "deco/blocks/section.ts";
import type { App as A, AppContext as AC } from "deco/mod.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { Secret } from "apps/website/loaders/secret.ts";
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";

export interface SupaBase {
  token: Secret;
  url: string;
}

export type Props = {
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  theme?: Section;
  supaBase: SupaBase;
} & CommerceProps;

export interface State extends Props {
  supaBaseClient: SupabaseClient;
}

export type Platform =
  | "vtex"
  | "vnda"
  | "shopify"
  | "wake"
  | "linx"
  | "nuvemshop"
  | "custom";

export let _platform: Platform = "custom";

export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;

const color = (platform: string) => {
  switch (platform) {
    case "vtex":
      return vtex;
    case "vnda":
      return vnda;
    case "wake":
      return wake;
    case "shopify":
      return shopify;
    case "linx":
      return linx;
    case "nuvemshop":
      return nuvemshop;
    case "deco":
      return 0x02f77d;
    default:
      return 0x212121;
  }
};

let firstRun = true;

export default function Site(
  { theme, supaBase, ...state }: Props,
): A<Manifest, State, [ReturnType<typeof commerce>]> {
  _platform = state.platform || state.commerce?.platform || "custom";

  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
    console.info(
      ` 🐁 ${rgb24("Storefront", color("deco"))} | ${
        rgb24(_platform, color(_platform))
      } \n`,
    );
  }
  const stringAuthToken = typeof supaBase.token === "string"
    ? supaBase.token
    : supaBase.token?.get?.() ?? "";

  const supaBaseClient = createClient(supaBase.url, stringAuthToken);

  return {
    state: { ...state, supaBaseClient, supaBase },
    manifest,
    dependencies: [
      commerce({
        ...state,
        global: theme ? [...(state.global ?? []), theme] : state.global,
      }),
    ],
  };
}

export { onBeforeResolveProps } from "apps/website/mod.ts";
