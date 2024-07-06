import { RESONATORS } from "@/shared/resonators";
import { WEAPONS } from "@/shared/weapons";

interface Props {
    item: any;
    maxPity: number;
    rarity: number;
}

const getColorClass = (pity: number, max: number) => {
    const greenThreshold = max * 0.375; // First 37.5% of the range
    const yellowThreshold = max * 0.75; // Next 37.5% of the range

    if (pity >= 1 && pity <= greenThreshold) {
        return "text-green-500";
    } else if (pity > greenThreshold && pity <= yellowThreshold) {
        return "text-yellow-500";
    } else {
        return "text-red-500";
    }
};

export default function BannerItemBadge({ item, maxPity, rarity }: Props) {
    return (
        <div className="relative rounded-full bg-transparent border-black border-[0.15rem] md:border-[0.2rem] items-center justify-center flex">
            <img
                className={`size-14 rounded-full md:size-16 border-[0.2rem] md:border-[0.25rem] ${
                    rarity == 5 ? "border-quality-5" : "border-quality-4"
                }`}
                src={
                    item.type == "resonators"
                        ? RESONATORS[item.name].icon
                        : WEAPONS[item.name].image
                }
                alt={item.name}
            />{" "}
            <div
                className={`flex items-center justify-center absolute -bottom-2 -right-2 rounded-full w-7 h-7 md:w-8 md:h-8 bg-black font-semibold  ${getColorClass(
                    item.pity,
                    maxPity
                )}`}
            >
                {item.pity}
            </div>
        </div>
    );
}
