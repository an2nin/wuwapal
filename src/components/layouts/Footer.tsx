import React from "react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
    return (
        <footer className=" text-white p-4">
            <div className="bg-theme-glassy rounded-lg container mx-auto flex flex-col md:flex-row justify-between items-center p-5">
                <div className="w-full flex flex-wrap gap-5 md:gap-10 justify-start md:justify-around md:items-center ">
                    {/* Left Column */}
                    <div className="flex flex-col gap-1">
                        <BrandLogo />
                        <div className="text-sm">Your WuWa Adventure Buddy</div>
                    </div>
                    {/* Mid Column */}
                    <div className="flex flex-col gap-1 max-w-96">
                        <div className="font-bold text-xl">Disclaimer</div>
                        <div className="text-sm">
                            WuWaPal.com is a fan made website that is not
                            affiliated with Kuro Games. Wuthering Wave, game
                            content and materials are trademarks and copyrights
                            of Kuro Games.
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-1">
                        <div className="font-bold text-xl">Extra</div>
                        <div className="text-sm">
                            <a
                                href="mailto:wuwapal@gmail.com?subject=Bug Report&body=Hello, I have found a bug in WuWaPal. Please describe the bug and any relevant information."
                                className="text-white hover:text-gray-400 hover:underline"
                            >
                                Report a Bug
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
