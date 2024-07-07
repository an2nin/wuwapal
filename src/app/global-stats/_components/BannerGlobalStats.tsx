interface Props {
    bannerData: any;
    bannerInfo: any;
}

export default function BannerGlobalStats({ bannerData, bannerInfo }: Props) {
    return (
        <div className="relative lg:h-44 h-44">
            <img
                src={bannerInfo.image}
                alt="banner"
                className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-0 h-full w-full left-0 flex lg:justify-start justify-center lg:ml-6 lg:mt-5">
                <div className="flex items-center ">
                    <div className="flex flex-wrap border bg-card rounded-xl w-fit">
                        <div className="flex flex-col-reverse gap-1 p-3">
                            <div className="grid grid-cols-2 gap-2 lg:gap-5 text-xs sm:grid-cols-2 lg:inline-flex lg:flex-row lg:flex-wrap">
                                <div className="flex flex-col gap-1  text-center">
                                    <span className="text-lg lg:text-2xl font-extrabold">
                                        {bannerData?.total || 0}
                                    </span>{" "}
                                    Total Pulls
                                </div>{" "}
                                <div className="flex flex-col gap-1 justify-center items-center text-quality-5 font-extrabold">
                                    <span className="flex items-center justify-center gap-1 text-lg lg:text-2xl">
                                        {bannerData?.total_s5 || 0}{" "}
                                    </span>{" "}
                                    Total 5 ✦
                                </div>{" "}
                                <div className="flex flex-col  gap-1 justify-center items-center text-quality-4 font-extrabold">
                                    <span className="flex items-center justify-center gap-1 text-lg lg:text-2xl">
                                        {bannerData?.total_s4 || 0}
                                    </span>
                                    Total 4 ✦
                                </div>
                                <div className="flex flex-col gap-1  text-center">
                                    <span className="text-lg lg:text-2xl font-extrabold">
                                        {(
                                            bannerData?.total * 160 || 0
                                        ).toLocaleString()}
                                    </span>
                                    Astrite Spent
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
