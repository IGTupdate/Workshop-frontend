import LeftSection from "../components/Auth/LeftSection";
import RightSection from "./__components/RightSection";

export default function Auth() {

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-full flex md:flex-row flex-col">
        <div className="xl:w-[60%] lg:w-[55%] md:w-1/2 w-full md:h-full h-[220px] hidden md:block">
          <LeftSection primaryText="Welcome To Workshop" secondaryText="We are here to assist you" />
        </div>
        <div className="md:flex-auto md:h-full">
          <RightSection />
        </div>
      </div>
    </div>
  );
}