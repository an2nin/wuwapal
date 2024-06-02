import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function ConveneTracker() {
    const router = useRouter();
    return (
        <div className="flex flex-col">
            <div className="flex gap-5 items-center">
                <h1 className="text-xl font-semibold md:text-4xl">
                    Convene Tracker
                </h1>
                <div>
                    <Button variant={"secondary"} onClick={() => router.push("/convene/import")}>Import Convene Record</Button>
                </div>
            </div>
        </div>
    );
}
