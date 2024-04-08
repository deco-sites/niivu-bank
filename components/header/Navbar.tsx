import {
  IStep,
  Logo,
  Url,
} from "deco-sites/niivu-bank/components/header/Header.tsx";
import Image from "apps/website/components/Image.tsx";
import Step from "deco-sites/niivu-bank/components/header/Step.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

export interface Props {
  /** @description (150px)x(45px) */
  logo: Logo;
  urls?: Url[];
  steps?: IStep[];
  statusIndex: number;
  isDesktop: boolean;
}

function NavBar({ logo, steps, statusIndex, isDesktop, urls }: Props) {
  return (
    <div class="container h-full flex items-center justify-between mx-auto">
      {isDesktop && <Image src={logo.desk} class="" width={212} height={63} />}
      {!isDesktop && (
        <Image src={logo.mobile} class="" width={150} height={45} />
      )}
      <ul class="timeline max-lg:hidden">
        {steps?.map((props, index, array) => (
          <Step
            {...props}
            index={index}
            isLastStep={index === array.length - 1}
            statusIndex={statusIndex}
          />
        ))}
      </ul>
      {/* 16px, 32px, 13px, 32px */}
      <a href={`/entrar`}>
      <Button class="flex items-center max-h-9 w-24 btn btn-outline btn-secondary text-base px-0">
        <Icon id='User' width={20} height={20} />
        <span class="mt-px">
          Entrar
        </span>
      </Button>
      </a>
    </div>
  );
}

export default NavBar;
