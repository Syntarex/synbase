import "server-only";

import Image from "next/image";

interface LogoProps {
    size?: number /** px */;
}

export const Logo = ({ size = 50 }: LogoProps) => {
    return <Image src={"/logo.svg"} alt={"Synbase"} width={size} height={size} />;
};
