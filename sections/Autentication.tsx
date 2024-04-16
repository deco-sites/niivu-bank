import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import RichText from "deco-sites/niivu-bank/sections/Content/RichText.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import LoginForm from "../islands/Authentication/Login.tsx";
import LoginSSO from "../components/autentication/login/SSO.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import SignupForm from "deco-sites/niivu-bank/islands/Authentication/Signup.tsx";
import { redirect, type SectionProps } from "deco/mod.ts";
import { getCookie } from "$store/utils/cookies.ts";
import {
  CHANGE_PASSWORD,
  LOGIN,
  RECOVERY_PASSWORD,
  SIGNUP,
} from "deco-sites/niivu-bank/utils/enum.ts";
import Title from "deco-sites/niivu-bank/components/ui/Title.tsx";
import RecoveryPasswordForm from "../components/autentication/recovery_password/Form.tsx";
import ChangePassword from "deco-sites/niivu-bank/islands/Authentication/ChangePassword.tsx";
import Image from "apps/website/components/Image.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import type { AppContext } from "$store/apps/site.ts";

interface Props {
  /**
   * @title Alinhamento do texto dentro do banner
   * @format button-group
   * @options deco-sites/niivu-bank/loaders/customAdmin/icons.ts
   */
  textAlignment?: "Em cima" | "No centro" | "Em baixo";

  /**
   * @title Configurações do banner
   */
  banner: {
    /**
     * @title Texto do banner
     */
    textBanner?: HTMLWidget;

    /**
     * @title Texto do botão
     */
    buttonText?: string;

    /**
     * @title Imagem de fundo
     */
    image?: {
      src: ImageWidget;
      alt: string;
      width: number;
      height: number;
    };
  };

  /**
   * @title Logar com facebook e google
   * @description Se ativado, o botão de login com facebook e google será exibido
   * @default false
   */
  showLoginSSO?: boolean;

  /**
   * @title Imagem do header
   */
  header: {
    /**
     * @description Imagem para tela pequena
     */
    mobile: ImageWidget;
    /** @description Imagem para tela grande*/
    desktop: ImageWidget;
    /** @description Descrição da imagem  */
    alt?: string;
  };

  /**
   * @format html
   * @title Descrição do aceite de termos.
   * @description Texto que será exibido para o usuário e deve ser confirmado para criar a conta.
   */
  disclaimerText: string;

  /**
   * @ignore
   */
  step: Step;
}

const StepConstants = {
  login: LOGIN,
  signup: SIGNUP,
  recoveryPassword: RECOVERY_PASSWORD,
  changePassword: CHANGE_PASSWORD,
} as const;

export type Step = typeof StepConstants[keyof typeof StepConstants];

export async function loader(
  props: Props,
  req: Request,
  ctx: AppContext,
) {
  const { supabaseClient } = ctx;
  const cookie = getCookie(req);
  const { searchParams } = new URL(req.url);
  const stepParams = searchParams.get("step");

  if (cookie) {
    const { data } = await supabaseClient.auth.getUser(cookie);
    if (data.user) {
      redirect(new URL("/minha-conta", req.url));
    }
  }

  const validSteps = Object.values(StepConstants);
  const step = !props.step
    ? stepParams && validSteps.includes(stepParams as Step)
      ? stepParams as Step
      : undefined
    : props.step;

  return {
    ...props,
    step,
    urlChangePassword: searchParams.get("url"),
  };
}

const Autentication = (
  {
    step = LOGIN,
    textAlignment,
    showLoginSSO,
    disclaimerText,
    urlChangePassword,
    banner: { textBanner, image, buttonText },
    header: { mobile, alt, desktop },
  }: SectionProps<typeof loader>,
) => {
  const verticalAlignment: { [key: string]: string } = {
    "Em baixo": "items-end",
    "No centro": "items-center",
    "Em cima": "items-start",
  } as const;

  const ButtonPartial = (
    { text = "Entre na sua conta", step = LOGIN }: {
      text?: string;
      step?: Step;
    },
  ) => {
    return (
      <button
        type="button"
        {...usePartialSection<typeof Autentication>({
          props: { step },
        })}
        class="w-full text-center cursor-pointer text-primary opacity-70 text-sm mt-2 hover:text-secondary"
      >
        {text}
      </button>
    );
  };

  return (
    <div class="h-full min-h-screen md:flex bg-white">
      <div
        class={`relative hidden overflow-hidden md:flex md:flex-col w-1/2 justify-end items-center pb-52 px-auto ${
          !image?.src && "bg-gradient-to-l from-success to-info"
        }`}
      >
        <div
          class={`z-10 h-full w-full flex justify-center ${
            textAlignment && verticalAlignment[textAlignment]
          }`}
        >
          <span class="space-y-6">
            {textBanner && <RichText text={textBanner} />}
            {buttonText && (
              <Button class="h-14 w-52 btn btn-outline btn-neutral px-6 py-4 text-base">
                {buttonText}
              </Button>
            )}
          </span>
        </div>
        <span class="absolute top-0 left-0 h-full">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              preload
              loading="eager"
              fetchPriority="high"
              class="object-cover h-full w-full"
            />
          )}
        </span>
      </div>
      <div class="md:flex md:flex-col md:w-1/2 md:items-center lg:items-start lg:pl-32 md:pt-14 bg-white 2xl:pt-0 2xl:my-auto">
        <header class="w-full mb-4 h-16 md:h-auto flex justify-center items-center md:justify-normal md:items-start md:max-w-[348px] border-b-2 border-b-neutral-200 md:border-none">
          <Picture preload>
            <Source
              src={mobile}
              width={150}
              height={45}
              media="(max-width: 767px)"
            />
            <Source
              src={desktop}
              width={306}
              height={92}
              media="(min-width: 767px)"
            />
            <img src={desktop} alt={alt ?? "Niivo Logo Preta Mobile"} />
          </Picture>
        </header>
        {step === LOGIN && (
          <div class="max-w-[348px] m-auto md:m-0 px-4 pt-6 md:p-0 flex flex-col">
            <Title
              title="Acessar Minha Conta"
              subTitle="Digite seu e-mail e senha para acessar."
              class="mb-4 text-3xl"
            />
            <LoginForm />
            <ButtonPartial
              text="Esqueceu sua senha?"
              step={RECOVERY_PASSWORD}
            />
            {showLoginSSO && <LoginSSO />}
            <p class="text-primary text-sm text-center mt-6">
              Não tem uma conta?{" "}
              <button
                type="button"
                {...usePartialSection<typeof Autentication>({
                  props: { step: SIGNUP },
                })}
                class="text-primary font-bold hover:text-secondary"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        )}
        {step === SIGNUP && (
          <div class="max-w-[348px] m-auto md:m-0 px-4 pt-6 md:p-0 flex flex-col">
            <Title title="Abra agora sua Conta Digital" class="mb-3 text-2xl" />
            <SignupForm disclaimerText={disclaimerText} />
            <ButtonPartial />
          </div>
        )}
        {step === RECOVERY_PASSWORD && (
          <div class="max-w-[348px] m-auto md:m-0 px-4 pt-6 md:pt-0 md:px-0 flex flex-col">
            <Title
              title="Recupere sua senha"
              subTitle="Digite seu e-mail para receber as instruções para recuperar senha."
              class="mb-8 text-2xl"
            />
            <RecoveryPasswordForm />
            <ButtonPartial />
          </div>
        )}
        {step === CHANGE_PASSWORD && (
          <div class="max-w-[348px] w-full m-auto md:m-0 px-4 pt-6 md:pt-0 md:px-0 flex flex-col">
            <Title
              title="Recupere sua senha"
              subTitle="Digite sua nova senha e confirme"
              class="mb-8 text-3xl"
            />
            <ChangePassword urlChangePassword={urlChangePassword}/>
            <ButtonPartial />
          </div>
        )}
      </div>
    </div>
  );
};

export default Autentication;
