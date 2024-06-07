import Link from "next/link";
import React from "react";

export default function BrandLogo() {
    return (
        <Link href="/">
            <div className="relative inline-block text-2xl text-primary font-bold logo-text">
                {process.env.NEXT_PUBLIC_APP_NAME}
                <div className="bg-black text-accent absolute -top-1 right-0 transform translate-x-4 -translate-y-2 text-sm px-2 font-bold rounded">
                    beta
                </div>
            </div>
        </Link>
    );
}
