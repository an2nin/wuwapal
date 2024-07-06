import { BANNERS } from "@/shared/banners";
import DetailedBanner from "./_components/DetailedBanner";

export async function generateStaticParams() {
    return Object.keys(BANNERS).map((banner) => ({
        store_id: banner,
    }));
}

export default function Page({ params }: { params: { store_id: string } }) {
    return <DetailedBanner params={params} />;
}
