import BannerItemBadge from "../../_components/BannerItemBadge";

interface Props {
    bannerData: any;
    bannerInfo: any;
}

export default function RecentPulls({ bannerData, bannerInfo }: Props) {
    return (
        <div className="flex flex-col gap-3 my-5">
            <div className="text-2xl font-bold text-quality-5">
                Recent 5 ✦ Pulls
            </div>
            <div className="flex">
                <div className="flex  gap-3 flex-row-reverse">
                    {bannerData?.star5s.length > 0 ? (
                        bannerData.star5s.map((item: any, idx: number) => (
                            <BannerItemBadge
                                key={idx}
                                item={item}
                                maxPity={80}
                                rarity={5}
                            />
                        ))
                    ) : (
                        <div>No 5 Star found</div>
                    )}
                </div>
            </div>
        </div>
    );
}
