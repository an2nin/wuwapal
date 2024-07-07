import { Settings } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import SheetBar from "@/app/_components/layout/SheetBar";
import { useRouter } from "next-nprogress-bar";

interface Props {
    currentActiveNav: any;
}

export default function Header({ currentActiveNav }: Props) {
    const router = useRouter();
    return (
        <header className="flex justify-end sticky z-10">
            <div className="lg:w-min w-full py-2 flex bg-card-light justify-between items-center px-4 border-b lg:border-l lg:rounded-bl-xl">
                <div className="lg:hidden block">
                    <SheetBar currentActiveNav={currentActiveNav} />
                </div>
                <Button
                    onClick={() => router.push("/settings")}
                    size="icon"
                    variant="outline"
                    className="bg-background"
                >
                    <Settings />
                </Button>
            </div>
        </header>
    );
}
