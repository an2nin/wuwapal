import BannerItemBadge from "../../../../features/tracker/components/BannerItemBadge";

interface Props {
    bannerData: any;
    bannerInfo: any;
}

export default function RecentPulls({ bannerData, bannerInfo }: Props) {
    return (
        <div className="flex flex-col gap-3 my-5">
            <div className="text-2xl font-bold text-primary">
                Recent 5 ✦ Pulls
            </div>
            <div className="flex">
                <div className="flex flex-wrap lg:justify-start justify-center gap-3 ">
                    {bannerData?.star5s.length > 0 ? (
                        bannerData.star5s.slice().reverse().map((item: any, idx: number) => (
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
