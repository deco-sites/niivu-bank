import { IS_BROWSER } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { withManifest } from "deco/clients/withManifest.ts";
import type { Manifest } from "../../manifest.gen.ts";
import { CNPJ, CPF } from "$store/packs/actions/supabase/register.ts";
import {
  PostgrestError,
  PostgrestSingleResponse,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";

interface Context {
  register: string | PostgrestError | PostgrestSingleResponse<CPF | CNPJ>;
}

const Runtime = withManifest<Manifest>();
const loading = signal<boolean>(true);
const context = {
  register: signal<
    string | PostgrestError | PostgrestSingleResponse<CPF | CNPJ> | undefined
  >(undefined),
};

let queue: Promise<
  | string
  | PostgrestError
  | PostgrestSingleResponse<CPF | CNPJ>
  | void
  | undefined
> = Promise.resolve();
let abort = () => {};
const enqueue = (
  cb: (signal: AbortSignal) => Promise<Partial<Context>> | Partial<Context>,
) => {
  abort();

  loading.value = true;
  const controller = new AbortController();
  queue = queue.then(async () => {
    try {
      const { register } = await cb(controller.signal);

      if (controller.signal.aborted) {
        throw { name: "AbortError" };
      }

      context.register.value = {
        ...context.register!.value,
        response: register,
      };

      loading.value = false;
      return context.register.value;
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error(error);
      loading.value = false;
    }
  });

  abort = () => controller.abort();

  return queue;
};

const load = async (signal: AbortSignal) => {
  const { register } = await Runtime.invoke(
    {
      register: {
        key: "deco-sites/niivu-bank/loaders/actions/register.ts",
      },
    },
    { signal },
  );

  return {
    register,
  };
};

if (IS_BROWSER) {
  enqueue(load);

  document.addEventListener(
    "visibilitychange",
    () => document.visibilityState === "visible" && enqueue(load),
  );
}

export const state = {
  ...context,
  loading,
  enqueue,
};
