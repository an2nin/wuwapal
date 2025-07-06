import DetailedBanner from "./components/detailed-banner";

interface Props {
  params: { store_id: string };
}

export default function BannerWiseTracker({ params }: Props) {
  return (
    <DetailedBanner params={params} />
  )
}
