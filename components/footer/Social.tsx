import Image from "apps/website/components/Image.tsx";
import type { SocialSection } from "./Footer.tsx";

function Social({ title, links }: SocialSection) {
  return (
    <div class="flex flex-col gap-3">
      <p class="font-bold text-base">{title}</p>
      <div class="flex gap-6 items-start">
        {links.map(({ image, alt, href, isOutside }) => (
          <a
            rel={isOutside ? "noopener noreferrer" : ""}
            target={isOutside ? "_blank" : "_self"}
            href={href}
          >
            <Image
              src={image}
              alt={alt}
              height={27}
              width={27}
              decoding={"async"}
              loading={"lazy"}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Social;
