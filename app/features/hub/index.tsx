import Changelogs from './components/changelogs';
import SocialLinks from './components/social-links';
import TrackMyPullsCard from './components/track-my-pulls-card';
import Welcome from './components/welcome';

export default function Hub() {
  return (
    <div className="flex flex-col justify-center lg:gap-6 gap-4">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Welcome to WuWaPal
        <span className="text-primary text-lg">.com</span>
      </h1>
      <Welcome />
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4">
        <div className="lg:col-span-7">
          <TrackMyPullsCard />
        </div>
        <div className="lg:col-span-5 flex flex-col lg:gap-6 gap-4">
          <div className="flex-1">
            <Changelogs />
          </div>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
