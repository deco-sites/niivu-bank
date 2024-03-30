import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import RichText from "deco-sites/niivu-bank/sections/Content/RichText.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import LoginForm from "../islands/Authentication/Login.tsx";
import LoginSSO from "deco-sites/niivu-bank/components/autentication/Login/SSO.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import SignupForm from "deco-sites/niivu-bank/islands/Authentication/Signup.tsx";

interface Props {
  /**
   * @ignore
   */
  step: "login" | "signup" | "recoveryPassword";

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

const Autentication = (
  {
    step = "login",
    login: { showLoginSSO = false },
    banner: { textBanner, image, buttonText },
    header: { mobile, alt, desktop },
  }: Props,
) => {
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
      <div class="md:flex md:flex-col md:w-1/2 md:items-center lg:items-start lg:pl-32 md:pt-14 bg-white 2xl:my-auto">
        <header class="w-full h-16 md:h-auto flex justify-center items-center md:justify-normal md:items-start md:max-w-[348px] border-b-2 border-b-neutral-200 md:border-none">
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
        {step === "login" && (
          <div class="max-w-[348px] m-auto md:m-0 px-4 pt-6 md:p-0 flex flex-col">
            <div class="mb-4 text-primary">
              <h1 class="font-bold text-2xl md:text-3xl leading-10 tracking-tight">
                Acessar Minha Conta
              </h1>
              <h2 class="text-sm text-primary">
                Digite seu e-mail e senha para acessar.
              </h2>
            </div>
            <LoginForm />
            <button
              type="button"
              {...usePartialSection<typeof Autentication>({
                props: { step: "recoveryPassword" },
              })}
              class="w-full texte-center cursor-pointer text-primary opacity-70 text-sm mt-2"
            >
              Esqueceu sua senha?
            </button>
            {showLoginSSO && <LoginSSO />}
            <p class="text-primary text-sm text-center mt-6">
              Não tem uma conta?{" "}               
              <button
                type="button"
                {...usePartialSection<typeof Autentication>({
                  props: { step: "signup" },
                })}
                class="text-primary font-bold"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        )}
        {step === "signup" && (
          <div class="max-w-[348px] m-auto md:m-0 px-4 pt-6 md:p-0 flex flex-col">
            <div class="mb-8 text-primary">
              <h1 class="font-bold text-2xl md:text-2xl leading-10 tracking-tight">
                Abra agora sua Conta Digital
              </h1>
            </div>
           <SignupForm />
          </div>
        )}
        {step === "recoveryPassword" && (
          <div class="">
            "recoveryPassword"
          </div>
        )}
      </div>
    </div>
  );
};

export default Autentication;
