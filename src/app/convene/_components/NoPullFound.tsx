import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import MovingBorder from "@/app/_components/ui/moving-border";
import { useRouter } from "next-nprogress-bar";

export default function NoPullFound() {
    const router = useRouter();

    return (
        <Card>
            <CardContent className="mt-6">
                <div className="flex gap-3 items-center">
                    <div>
                        <img
                            src="/images/emotes/no_pull_data.webp"
                            alt="no pull found"
                            className="size-32"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="font-bold text-xl">
                            No pulls imported.
                        </div>
                        <div>
                            <Button variant="ghost" onClick={() => router.push("/convene/import")}>
                                <MovingBorder isHoverable>
                                    <div className="flex items-center gap-2 px-2">
                                        Import Pull History
                                    </div>
                                </MovingBorder>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
