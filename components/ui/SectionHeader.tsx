interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
}

const fontSizeClasses = {
  "Small": "lg:text-2xl",
  "Normal": "text-3xl lg:text-3xl",
  "Large": "lg:text-4xl",
};

const fontSizeClassesDescriptions = {
  "Small": "lg:text-lg",
  "Normal": "lg:text-xl",
  "Large": "lg:text-2xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left"
                ? "text-left"
                : "text-left md:text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`font-bold leading-8 lg:leading-10 text-white 
                  ${fontSizeClasses[props.fontSize || "Normal"]}
                `}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={`
                  leading-6 lg:leading-8
                  ${"text-white"}
                  ${fontSizeClassesDescriptions[props.fontSize || "Normal"]}
                `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
