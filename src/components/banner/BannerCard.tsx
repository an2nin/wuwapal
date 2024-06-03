import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Props {
    banner: any;
}

export default function BannerCard({ banner }: Props) {
    console.log(banner);

    const [processedBannerData, setProcessedBannerData] = useState<any>(null);
    useEffect(() => {
        if (banner.items && banner.items.length > 0) {
            let grade4 = 0;
            let grade5 = 0;
            banner.items.forEach((item: any) => {
                if (item.qualityLevel === 4) {
                    grade4++;
                } else if (item.qualityLevel === 5) {
                    grade5++;
                }
            });
            setProcessedBannerData({
                ...processedBannerData,
                grade4,
                grade5,
            });
        }
    }, [banner]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{banner.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    {processedBannerData?.grade4}
                    {processedBannerData?.grade5}
                </div>
            </CardContent>
        </Card>
    );
}
