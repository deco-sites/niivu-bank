import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronLeft2"
  | "ChevronRight"
  | "ChevronRight2"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Close"
  | "SignOut"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "XMark"
  | "Zoom"
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError"
  | "share"
  | "Eye"
  | "EyeClosed"
  | "Facebook"
  | "Google"
  | "RoundCheck"
  | "User"
  | "Money"
  | "IconCalendar"
  | "IconBankSlip"
  | "Investment"
  | "Cashback"
  | "Schedule";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
