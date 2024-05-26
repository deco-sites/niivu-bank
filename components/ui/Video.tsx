import VideoContainer from "apps/website/components/Video.tsx"
import { VideoWidget } from "apps/admin/widgets.ts";


interface Props {
    video: VideoWidget;
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
}

function Video({ video, height, width }: Props) {
    return (
        <VideoContainer class="w-full h-full" src={video} height={height ?? 311} width={width ?? 477} loading={"lazy"} />
    );
}

export default Video;