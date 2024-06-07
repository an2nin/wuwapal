import React from "react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
    return (
        <footer className="bg-background text-white p-4">
            <div className="bg-background container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <BrandLogo />
                </div>
                <div className="text-sm flex flex-col text-center">
                    <div>&copy; 2024 WuWaPal.com</div>
                    <div>
                        All game assets and trademarks are the property of their
                        respective owners.
                    </div>
                </div>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a
                        href="mailto:wuwapal@gmail.com?subject=Bug Report&body=Hello, I have found a bug in WuWaPal. Please describe the bug and any relevant information."
                        className="text-white hover:text-gray-400 hover:underline"
                    >
                        Report a Bug
                    </a>
                </div>
            </div>
        </footer>
    );
}
