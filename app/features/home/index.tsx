import PageHeader from "@/shared/components/layout/PageHeader";
import BannerShowcase from "./components/banner-showcase";
import BasicIntro from "./components/basic-intro";
import Changelogs from "./components/changelogs";
import SocialLinks from "./components/social-links";
import TrackMyPulls from "./components/trackmypulls";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader>
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
          Welcome to WuWaPal
          <span className="text-primary text-lg">.com</span>
        </h1>
      </PageHeader>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
        <div className="lg:col-span-7">
          <BasicIntro />
        </div>
        <div className="lg:col-span-5">
          <SocialLinks />
        </div>
      </div>
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-5">
        <div className="lg:col-span-2">
          <BannerShowcase />
        </div>
        <div className="lg:col-span-3">
          <TrackMyPulls />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <Changelogs />
      </div>
    </div>
  )
}
