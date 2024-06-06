import { Drama, Star, Swords, VenetianMask } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
    rarity: number;
    setRarity: React.Dispatch<React.SetStateAction<number>>;

    resourceType: number;
    setResourceType: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddManualFilters({
    rarity,
    setRarity,
    resourceType,
    setResourceType,
}: Props) {
    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="font-bold ">Choose Rarity</div>
                <div className="flex gap-5">
                    <Button
                        onClick={() => setRarity(5)}
                        variant="ghost"
                        className={`!hover:bg-transparent ${
                            rarity == 5
                                ? "bg-yellow-500 text-accent-foreground"
                                : "border-2 border-yellow-500 text-yellow-400"
                        }`}
                    >
                        <div className="flex items-center gap-1 text-lg">
                            5
                            <Star
                                className={`w-4 h-4 ${
                                    rarity == 5
                                        ? "fill-accent-foreground"
                                        : "fill-yellow-500"
                                }`}
                            />
                        </div>
                    </Button>
                    <Button
                        onClick={() => setRarity(4)}
                        variant="ghost"
                        className={`!hover:bg-transparent ${
                            rarity == 4
                                ? "bg-purple-500 text-accent-foreground"
                                : "border-2 border-purple-500 text-purple-400"
                        }`}
                    >
                        <div className="flex items-center gap-1 text-lg">
                            4
                            <Star
                                className={`w-4 h-4 ${
                                    rarity == 4
                                        ? "fill-accent-foreground"
                                        : "fill-purple-500"
                                }`}
                            />
                        </div>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="font-bold ">Choose Type</div>
                <div className="flex gap-5">
                    <Button
                        onClick={() => setResourceType(1)}
                        variant="ghost"
                        className={`!hover:bg-transparent ${
                            resourceType == 1
                                ? "bg-accent text-accent-foreground"
                                : "border-2 border-accent text-accent"
                        }`}
                    >
                        <div className="flex items-center gap-1 text-lg">
                            Resonator
                            <Drama className="w-5 h-5" />
                        </div>
                    </Button>
                    <Button
                        onClick={() => setResourceType(2)}
                        variant="ghost"
                        className={`!hover:bg-transparent ${
                            resourceType == 2
                                ? "bg-accent text-accent-foreground"
                                : "border-2 border-accent text-accent"
                        }`}
                    >
                        <div className="flex items-center gap-1 text-lg">
                            <div className="flex items-center gap-1">
                                Weapon
                                <Swords className="w-5 h-5" />
                            </div>
                        </div>
                    </Button>
                </div>
            </div>
        </>
    );
}
