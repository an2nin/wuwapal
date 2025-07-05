import Link from "next/link";
import { SOCIAL_LINKS } from "@/shared/constants/social-links";
import { Heart } from "lucide-react";
import { Bangladesh } from "../../shared/components/ui/custom-icons";

export default function Footer() {
    return (
        <footer className="transition-[margin-left] ease-in-out duration-300">
            <div className="z-20 w-full bg-card-light shadow border mb-3 backdrop-blur rounded-2xl">
                <div className="mx-4 md:mx-6 flex-col flex lg:flex-row py-4 items-end lg:items-center justify-between gap-4">
                    <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
                        {process.env.NEXT_PUBLIC_APP_NAME}{" "}
                        is a Fan-made website. Game content is property of Kuro
                        Games.
                        <br />
                        <span className="flex items-center gap-1">
                            Made with{" "}
                            <Heart className="size-4 text-primary fill-primary" />{" "}
                            by Antonin from <Bangladesh className="size-5 rounded-lg" />.
                        </span>
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
                        <div className="flex gap-1 items-center justify-end text-primary text-xs">
                            <Link
                                className="transition-all hover:underline"
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
