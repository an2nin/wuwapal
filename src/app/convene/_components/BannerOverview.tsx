import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { processBanner } from "@/app/_helpers/processors";
import { CURRENCIES } from "@/shared/currencies";
import { useEffect, useState } from "react";
import BannerItemBadge from "./BannerItemBadge";
import { useRouter } from "next-nprogress-bar";

interface Props {
    bannerData: any;
    bannerInfo: any;
}

export default function BannerOverview({ bannerData, bannerInfo }: Props) {
    const [processedBanner, setProcessedBanner] = useState<any>(null);
    useEffect(() => {
        if (bannerData) {
            const processed = processBanner(bannerData);
            setProcessedBanner(processed);
        }
    }, [bannerData]);

    const router = useRouter();

    return (
        <Card
            className="p-0 hover:border hover:border-accent cursor-pointer"
            onClick={() => router.push(`/convene/${bannerInfo.store_id}`)}
        >
            <CardHeader className="hidden">
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        src={bannerInfo.image}
                        alt="banner"
                        className="w-full h-28 object-cover rounded-t-xl"
                    />
                    <div className="absolute bottom-0 right-0 bg-background p-3 rounded-xl mb-4 mr-4 font-bold text-lg">
                        <div className="flex gap-3">
                            <div className="flex gap-1 items-center">
                                <img
                                    src={CURRENCIES[bannerInfo.currency].image}
                                    alt={bannerInfo.currency}
                                    className="w-8 h-8"
                                />
                                <p className="text-foreground">{bannerData?.total}</p>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="bg-quality-5 text-black px-2 rounded-full">
                                    P
                                </div>
                                <p className="text-quality-5">
                                    {processedBanner?.star5_pity || 0} / 80
                                </p>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="bg-quality-4 text-black px-2 rounded-full">
                                    P
                                </div>
                                <p className="text-quality-4">
                                    {processedBanner?.star4_pity || 0} / 10
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3 my-4">
                    <div className="text-2xl font-bold">{bannerInfo.name}</div>
                    <div className="flex gap-3">
                        {processedBanner?.star5s.length > 0 ? (
                            processedBanner.star5s.map(
                                (item: any, idx: number) => (
                                        <BannerItemBadge
                                            key={idx}
                                            item={item}
                                            maxPity={80}
                                            rarity={5}
                                        />
                                )
                            )
                        ) : (
                            <div>No 5 Star found</div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
