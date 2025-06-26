import { cn } from "@/shared/lib/utils";
import { RESONATORS } from "@/data/resonators";
import { WEAPONS } from "@/data/weapons";

interface Props {
    item: any;
    className?: string;
}

export default function ResourceAvatar({ item, className }: Props) {
    return (
        <div
            className={cn(
                "relative rounded-full bg-transparent border-black border-[0.15rem] lg:border-[0.2rem] items-center justify-center flex",
                className
            )}
        >
            <img
                className={`size-14 rounded-full lg:size-16 border-[0.2rem] lg:border-[0.25rem] ${
                    item.rarity == 5 ? "border-quality-5" : "border-quality-4"
                }`}
                src={
                    item.type == "resonators"
                        ? RESONATORS[item.name]?.icon
                        : WEAPONS[item.name]?.image
                }
                alt={item.name}
            />{" "}
        </div>
    );
}
