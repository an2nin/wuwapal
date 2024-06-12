import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Props {
    tabInfo: any;
    bannerInfo: any;
    active: boolean;
    onClick: (id: string) => void;
}

export default function BannerTab({
    tabInfo,
    bannerInfo,
    active,
    onClick,
}: Props) {
    return (
        <Card
            className={`${
                active && "border-2 border-primary"
            } hover:cursor-pointer`}
            onClick={() => onClick(tabInfo.store_id)}
        >
            <CardContent className="p-2">
                <div className="flex items-center gap-5">
                    <img
                        className="h-16 w-auto"
                        src={tabInfo.image_path}
                        alt={tabInfo.name}
                    />
                    <div className="flex flex-col w-full gap-1 pr-4">
                        <p className="text-base font-semibold">
                            {tabInfo.name}
                        </p>
                        <div className="flex justify-between  text-sm">
                            <p className="font-semibold flex items-center gap-1">
                                Total Pulls
                            </p>
                            <p>{bannerInfo.total.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}