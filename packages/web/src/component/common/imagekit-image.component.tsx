import { IKImage } from "imagekitio-react";
import React from "react";

interface IImagekitImageProps {
    width: number;
    src: string;
}

const ImagekitImage = (props: IImagekitImageProps) => {
    const { width, src } = props;

    return <IKImage path={src} width={width} loading={"lazy"} lqip={{ active: true, quality: 20 }} />;
};

export default ImagekitImage;
