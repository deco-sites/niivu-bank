import { allowCorsFor, FnContext } from "deco/mod.ts";
import { AlignBottom, AlignCenter, AlignTop } from "../../static/adminIcons.ts";

const icons = [
  { component: AlignTop, label: "Em cima", prop: "textAlignment" },
  { component: AlignCenter, label: "No centro", prop: "textAlignment" },
  { component: AlignBottom, label: "Em baixo", prop: "textAlignment" },
];

export default function IconsLoader(
  _props: unknown,
  req: Request,
  ctx: FnContext,
) {
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  const iconsMap = icons.map((icon) => ({
    value: icon.component,
    label: icon.label,
    prop: icon.prop,
  }));

  return iconsMap;
}
