import { Input } from "@/components/ui/input";
import { useBannerStore } from "@/stores/banner";
import { useState } from "react";

interface Props {
    rarity: number;
    pityInput: string;
    setPityInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function PityInput({ rarity, pityInput, setPityInput }: Props) {
    const bannerStore = useBannerStore<any>((state: any) => state);

    const handleInputChange = (event: any) => {
        setPityInput(event.target.value);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="font-bold ">at Pity</div>
            <div className="w-20">
                <Input
                    type="number"
                    value={pityInput}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}
