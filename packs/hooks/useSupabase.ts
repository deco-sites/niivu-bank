import { state as storeState } from "$store/packs/hooks/context.ts";
import { withManifest } from "deco/clients/withManifest.ts";
import type { Manifest } from "$store/manifest.gen.ts";

const Runtime = withManifest<Manifest>();

const wrap =
  <T>(action: (p: T, init?: RequestInit | undefined) => Promise<any>) =>
  (p: T) =>
    storeState.enqueue(async (signal) => {
      return ({
        register: await action(p, { signal }),
      });
    });

const state = {
  register: wrap(
    Runtime.create("deco-sites/niivu-bank/loaders/actions/register.ts"),
  ),
};

export const useSupabase = () => state;
