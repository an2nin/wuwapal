import { Button } from "@/components/ui/button";

export default function ConveneTracker() {
    return (
        <div className="flex flex-col">
            <div className="flex gap-5 items-center">
                <h1 className="text-xl font-semibold md:text-4xl">
                    Convene Tracker
                </h1>
                <div>
                    <Button>Import Convene Record</Button>
                </div>
            </div>
        </div>
    );
}
