// import AlertOpenSource from './components/alert-open-source';
import Changelogs from './components/changelogs';
import CurrentBanner from './components/current-banner';
import SocialLinks from './components/social-links';
import Welcome from './components/welcome';

export default function Hub() {
  return (
    <div className="flex flex-col items-start justify-center lg:gap-6 gap-4">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Welcome to WuWaPal
        <span className="text-primary text-lg">.com</span>
      </h1>
      {/* <AlertOpenSource /> */}
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4">
        <div className="lg:col-span-7">
          <Welcome />
        </div>
        <div className="lg:col-span-5">
          <SocialLinks />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
        <div className="lg:col-span-2">
          <CurrentBanner />
        </div>
        <div className="lg:col-span-2">
          <Changelogs />
        </div>
      </div>
    </div>
  );
}
