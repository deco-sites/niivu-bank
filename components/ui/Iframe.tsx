import { useEffect, useRef } from "preact/hooks";

interface Props {
  /**
   * @title Link do vídeo
   */
  videoLink: string;
  /**
   * @description A largura padrão é 477
   * @title Largura do Iframe
   */
  width?: number;
  /**
   * @description A altura padrão é 311
   * @title Altura do Iframe
   */
  height?: number;
  preload?: boolean;
}

const IframeLoader = (
  { videoLink, preload, width = 477, height = 311 }: Props,
) => {
  const targetElement = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const currentElement = targetElement.current;

    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentElement.src = videoLink;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(currentElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div class="h-full w-full my-28">
      <iframe
        style={{ maxWidth: width, height, borderRadius: 8 }}
        width={width}
        height={height}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        class="w-full h-full"
        allowFullScreen
        ref={targetElement}
        loading={preload ? "eager" : "lazy"}
      >
      </iframe>
    </div>
  );
};

export default IframeLoader;
