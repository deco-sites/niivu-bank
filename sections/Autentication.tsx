import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import RichText from "deco-sites/niivu-bank/sections/Content/RichText.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import LoginForm from "../islands/Authentication/Login.tsx";
import LoginSSO from "deco-sites/niivu-bank/components/autentication/Login/SSO.tsx";
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
import RecoveryPasswordForm from "deco-sites/niivu-bank/components/autentication/RecoveryPassword/index.tsx";
import ChangePassword from "deco-sites/niivu-bank/islands/Authentication/ChangePassword.tsx";

interface Props {
  /**
   * @ignore
   */
  step: Step;

  /**
   * @title Configurações do banner
   */
  banner: {
    /**
     * @description Texto do banner
     */
    textBanner: HTMLWidget;

    /**
     * @description Imagem de fundo
     */
    image: ImageWidget;

    /**
     * @description Texto do botão
     */
    buttonText: string;
  };

  /**
   * @title Configurações do login
   */
  login: {
    /**
     * @title Logar com facebook e google
     * @description Se ativado, o botão de login com facebook e google será exibido
     */
    showLoginSSO?: boolean;
  };

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
}

const StepConstants = {
  login: LOGIN,
  signup: SIGNUP,
  recoveryPassword: RECOVERY_PASSWORD,
  changePassword: CHANGE_PASSWORD,
} as const;

export type Step = typeof StepConstants[keyof typeof StepConstants];

export function loader(
  props: Props,
  req: Request,
) {
  const cookie = getCookie(req);
  const { searchParams } = new URL(req.url);
  const stepParams = searchParams.get("step");

  if (cookie) {
    redirect(new URL("/minha-conta", req.url));
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
  };
}

const Autentication = (
  {
    step = "recoveryPassword",
    login: { showLoginSSO = false },
    banner: { textBanner, image, buttonText },
    header: { mobile, alt, desktop },
  }: SectionProps<typeof loader>,
) => {
  const ButtonToLogin = () => {
    return (
      <button
        type="button"
        {...usePartialSection<typeof Autentication>({
          props: { step: LOGIN },
        })}
        class="text-primary text-sm text-center mt-6 hover:text-secondary"
      >
        <span class="font-bold">Entre</span> na sua conta
      </button>
    );
  };
  return (
    <div class="h-screen md:flex bg-white">
      <div
        class="hidden overflow-hidden md:flex md:flex-col w-1/2 justify-end items-center pb-52"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="space-y-6">
          <RichText text={textBanner} />
          <button class="h-14 w-52 btn btn-outline btn-primary px-6 py-4 text-base font-inter">
            {buttonText}
          </button>
        </div>
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
            <button
              type="button"
              {...usePartialSection<typeof Autentication>({
                props: { step: RECOVERY_PASSWORD },
              })}
              class="w-full texte-center cursor-pointer text-primary opacity-70 text-sm mt-2 hover:text-secondary"
            >
              Esqueceu sua senha?
            </button>
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
            <SignupForm />
            <ButtonToLogin />
          </div>
        )}
        {step === RECOVERY_PASSWORD && (
          <div class="max-w-[348px] m-auto md:m-0 px-4 pt-6 md:pt-0 md:px-0 flex flex-col">
            <Title
              title="Recupere sua senha"
              subTitle="Digite seu e-mail e receberar as instruções para recuperar senha."
              class="mb-8 text-2xl"
            />
            <RecoveryPasswordForm />
            <ButtonToLogin />
          </div>
        )}
        {step === CHANGE_PASSWORD && (
          <div class="max-w-[348px] w-full m-auto md:m-0 px-4 pt-6 md:pt-0 md:px-0 flex flex-col">
            <Title
              title="Recupere sua senha"
              subTitle="Digite sua nova senha e confirme"
              class="mb-8 text-3xl"
            />
            <ChangePassword />
            <ButtonToLogin />
          </div>
        )}
      </div>
    </div>
  );
};

export default Autentication;
