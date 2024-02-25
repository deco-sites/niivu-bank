import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { Section } from "deco/blocks/section.ts";
import type { App as A, AppContext as AC } from "deco/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";

export interface SupaBase {
  token?: string;
  url?: string;
}
export type Props = {
  theme?: Section;
  supaBase: SupaBase;
} & CommerceProps;

export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;

export default function Site(
  { supaBase, theme, ...state }: Props,
): A<Manifest, Props, [ReturnType<typeof commerce>]> {
  // Prevent console.logging twice

  return {
    state: { supaBase, theme, ...state },
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
