import React from "react";
import Banner from "../Shared/All_Over_Site/Banner";
import OurMission from "./OurMission";
import OurValues from "./OurValues";
import OurJourney from "./OurJourney";
import MeetOurTeam from "./MeetOurTeam";
import JoinCommunity from "../Shared/All_Over_Site/JoinCommunity";
import { Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div>
      <Banner page="about" />
      <OurMission />
      <OurValues />
      <OurJourney />
      <MeetOurTeam />
      <JoinCommunity icon={<Users className="size-10 text-white sm:size-10" />} title="Join Our Community" description="Become part of millions of travelers who trust Tripbank for their adventures around the world" buttontext_1="Get Started" buttontext_2="Learn More" />
    </div>
  );
};

export default AboutUs;
