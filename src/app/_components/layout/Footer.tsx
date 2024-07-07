import Link from "next/link";
import { SOCIAL_LINKS } from "@/app/_constants/social-links";

export default function Footer() {
    return (
        <footer className="transition-[margin-left] ease-in-out duration-300">
            <div className="z-20 w-full bg-card dark:shadow-none shadow border mb-3 backdrop-blur rounded-2xl supports-[backdrop-filter]:bg-card">
                <div className="mx-4 md:mx-8 flex-col flex lg:flex-row py-4 items-end lg:items-center justify-between gap-4">
                    <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
                        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}<span></span>
                        <br />
                        {process.env.NEXT_PUBLIC_APP_NAME} is not affiliated
                        with Kuro Games. <br />
                        Wuthering Waves, game content and materials are
                        trademarks and copyrights of Kuro Games.
                    </p>
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-3 items-center justify-end">
                            {SOCIAL_LINKS.map((link, idx) => (
                                <a
                                    key={idx}
                                    className="text-muted-foreground/60 dark:text-muted-foreground/30 dark:hover:text-muted-foreground hover:text-muted-foreground transition-all"
                                    target="_blank"
                                    href={link.path}
                                >
                                    {link.icon}
                                    <span className="sr-only">
                                        {link.srOnly}
                                    </span>
                                </a>
                            ))}
                        </div>
                        <div className="text-muted-foreground/60 dark:text-muted-foreground/30 flex gap-1 xl:gap-0 flex-col items-end xl:flex-row xl:items-center justify-end xl:space-x-2 my-0.5 text-xs">
                            <Link
                                className="dark:hover:text-muted-foreground hover:text-muted-foreground transition-all"
                                href="/privacy-policy"
                            >
                                Privacy Policy
                            </Link>
                            {/* <span className="hidden xl:inline-block">|</span>
                            <Link
                                className="dark:hover:text-muted-foreground hover:text-muted-foreground transition-all"
                                href="/terms-and-conditions"
                            >
                                Terms &amp; Conditions
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
