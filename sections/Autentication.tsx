import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import RichText from "deco-sites/niivu-bank/sections/Content/RichText.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import LoginForm from "deco-sites/niivu-bank/islands/Authentication/LoginForm.tsx";
import LoginSSO from "../components/autentication/Login/SSO.tsx";

interface Props {
  /**
   * @ignore
   */
  stap: "login" | "register" | "recoveryPassword";

  /**
   * @title Configurações do banner
   */
  banner: {
    /**
     * @title Texto do banner
     */
    textBanner: HTMLWidget;

    /**
     * @title Imagem de fundo
     */
    image: ImageWidget;

    /**
     * @title Texto do botão
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

    /**
     * @title Texto do login
     */
    textLogin: HTMLWidget;
  };
}

const Autentication = (
  {
    stap = "login",
    login: { showLoginSSO = false, textLogin },
    banner: { textBanner, image, buttonText },
  }: Props,
) => {
  return (
    <div class="h-screen md:flex">
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
      <div class="md:flex md:w-1/2 justify-center bg-white">
        {stap === "login" && (
          <div class="md:pt-32 min-w-[346px]">
            <div class="flex justify-center md:justify-start md:mb-9 items-center h-16 border-b-2 border-[#E5E5E5] md:border-none">
              <img
                width="306"
                height="92"
                src="/image/Niivo_Logo_Preta_pc.webp"
                alt="Niivo Logo Preta PC"
                class="hidden md:block"
              />
              <img
                width="150"
                height="45"
                src="/image/Niivo_Logo_Preta_mobile.webp"
                alt="Niivo Logo Preta Mobile"
                class="md:hidden"
              />
            </div>
            <div class="px-4 pt-6 md:p-0">
              <div class="mb-4">
                <RichText text={textLogin} />
              </div>
              <LoginForm />
              <button
                type="button"
                {...usePartialSection<typeof Autentication>({
                  props: { stap: "recoveryPassword" },
                })}
                class="w-full texte-center cursor-pointer text-black opacity-70 text-sm"
              >
                Esqueceu sua senha?
              </button>
              {showLoginSSO && <LoginSSO />}
              <p class="text-black text-sm text-center mt-6">
                Não tem uma conta?{" "}
                <button
                  type="button"
                  {...usePartialSection<typeof Autentication>({
                    props: { stap: "register" },
                  })}
                  class="text-black font-bold"
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          </div>
        )}
        {stap === "register" && (
          <div class="min-w-[346px]">
            "register"
          </div>
        )}
        {stap === "recoveryPassword" && (
          <div class="min-w-[346px]">
            "recoveryPassword"
          </div>
        )}
      </div>
    </div>
  );
};

export default Autentication;
