import React from "react";
import Image from "next/image";
import {EbaLogo, ComingSoonLogo, FBComingSoonIcon, IGComingSoonIcon, LIComingSoonIcon, XComingSoonIcon} from "@/assets/icons"
import Link from "next/link";

// interface IProps {};
// const ComingSoonPageComponent:FC<IProps>

const ComingSoonPageComponent = () => {
    return <div>
        {/* Logo */}
        <div className="flex justify-center items-center">
            <Image src={EbaLogo}  alt="Eni Brand Architect Logo"/>
        </div>

        {/* Coming soon SVG, have the same div with the social media icons */}
        <div className="flex flex-col items-center">
            <div> 
                <Image src={ComingSoonLogo} alt="coming-soon-icon" className="w-[575px] h-[475px]"/>
            </div>

            <div className="flex space-x-[16.2px]">
                <span className="fb">
                    <Image src={FBComingSoonIcon} alt="facebook icon"/>
                </span>
                <span className="x">
                    <Image src={XComingSoonIcon} alt="X icon"/>
                </span>
                <Link target="_blank" href="https://www.instagram.com/enibrandarchitect?igsh=MTBvZGhnYms3cGdscA%3D%3D&utm_source=qr">
                <span className="ig">
                    <Image src={IGComingSoonIcon} alt="Instagram icon"/>
                </span>
                </Link>
                <Link target="_blank" href="https://www.linkedin.com/in/eni-brand-architect-eba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                    <span className="li">
                    <Image src={LIComingSoonIcon} alt="LinkedIn icon"/>
                </span>
                </Link>
            </div>
        </div>

    </div>
};

export default ComingSoonPageComponent;