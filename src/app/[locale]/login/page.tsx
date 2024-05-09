import LeftSection from "../../components/Auth/LeftSection";
// import RightSection from "./__components/RightSection";
import RightSection from "./__components/RightSection";

export default function Auth() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-full flex md:flex-row flex-col">
        <div className="w-1/2 md:w-1/2 md:h-full h-[220px] hidden md:block">
          <LeftSection
            primaryText="Welcome To Workshop"
            secondaryText="We are here to assist you"
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full md:w-1/2">
          <RightSection />
        </div>
      </div>
    </div>
  );
}
