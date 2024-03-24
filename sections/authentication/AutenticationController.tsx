import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Login from "deco-sites/niivu-bank/islands/Authentication/Login.tsx";
import RichText from "deco-sites/niivu-bank/sections/Content/RichText.tsx";

interface AutenticationProps {
  /**
   * @Title Imagem de fundo
   */
  image: ImageWidget;

  /**
   * @Title Texto do botão
   */
  buttonText: string;

  /**
   * @ignore
   */
  stap: "login" | "register" | "recoveryPassword";

  /**
   * @Title Texto do banner
   */
  text: HTMLWidget;
}

const Autentication = (
  { image, stap = "login", buttonText, text }: AutenticationProps,
) => {
  return (
    <div class="h-screen md:flex">
      <div
        class="hidden overflow-hidden md:flex md:flex-col w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-end items-center pb-32"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="space-y-6">
          <RichText text={text} />
          <button class="h-14 w-52 btn btn-outline btn-primary px-6 py-4 text-base font-inter">
            {buttonText}
          </button>
        </div>
      </div>
      <div class="md:flex md:w-1/2 justify-center bg-white">
        {stap === "login" && (
          <div class="min-w-[346px]">
            <Login />
          </div>
        )}
        {stap === "register" && (
          <div class="min-w-[346px]">
            "register"
          </div>
        )}
        {stap === "recoveryPassword" && (
          <div class="min-w-[346px]">
            <Login />
          </div>
        )}
      </div>
    </div>
  );
};

export default Autentication;
