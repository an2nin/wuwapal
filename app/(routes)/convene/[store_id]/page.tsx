import { BANNERS } from "@/data/banners";
import BannerWiseTracker from "@/features/tracker/banner-wise";

export async function generateStaticParams() {
    return Object.keys(BANNERS).map((banner) => ({
        store_id: banner,
    }));
}

export default function Page({ params }: { params: { store_id: string } }) {
    return <BannerWiseTracker params={params} />;
}
