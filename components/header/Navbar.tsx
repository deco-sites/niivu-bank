import {
  IStep,
  Logo,
  Url,
} from "deco-sites/niivu-bank/components/header/Header.tsx";
import Image from "apps/website/components/Image.tsx";
import Step from "./Step.tsx";

export interface Props {
  /** @description (150px)x(45px) */
  logo: Logo;
  urls?: Url[];
  steps?: IStep[];
  statusIndex: number;
  isDesktop: boolean;
}

function NavBar({ logo, steps, statusIndex, isDesktop }: Props) {
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
    </div>
  );
}

export default NavBar;
