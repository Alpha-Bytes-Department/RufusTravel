import { FaMedal } from "react-icons/fa";
import JoinCommunity from "../Shared/All_Over_Site/JoinCommunity";
import LandingFooter from "./LandingFooter";
import Cards from "./Cards";
import HeroSection from "./HeroSection";
import FeaturedDestinations from "./FeaturedDestinations";
import Testimonials from "./Testimonials";
import AppDownloadSection from "./AppDownloadSection";

const Landing = () => {
  return (
    <div className="">
      <HeroSection />
      <Cards />
      <FeaturedDestinations />
      <JoinCommunity
        title="Join Tripbank Rewards"
        description="Earn points on every booking and unlock exclusive perks, upgrades, and special deals."
        buttontext_1="Sign Up Free"
        buttontext_2="Learn More"
        icon={<FaMedal className=" size-16 text-yellow-500" />}
      />
      <Testimonials />
      <AppDownloadSection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
