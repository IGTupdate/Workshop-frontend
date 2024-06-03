"use client";
import { useAppSelector } from "@/app/store/reduxHooks";
import { Flex, Layout } from "antd";
import Image from "next/image";
import { useRef } from "react";
import HeadingSection from "./__components/HeadingSection";
import Modules from "./__components/Modules";
import Operating from "./__components/Operating";

// import LineTwo from "../../../../public/images/line2.webp";
// import LineThree from "../../../../public/images/line3.webp";
// import BgCar from "../../../../public/images/bgcar.webp";
import NewEmpolyeeLogin from "./__components/NewEmpolyeeLogin";
import Proactive from "./__components/Proactive";
const { Header, Footer, Content } = Layout;

const Home = () => {
  // Ref for the SlotDetails component
  const slotDetailsRef = useRef<HTMLDivElement>(null);
  const slotData = useAppSelector((state) => state.slot.slotData);

  // Function to scroll to SlotDetails component
  const scrollToSlotDetails = () => {
    if (slotDetailsRef.current) {
      slotDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Layout>
        {/* <Header className='flex items-center justify-center w-full bg-customGray mb-0'> */}

        {/* </Header> */}
        <Content>
          <Flex vertical>
            <HeadingSection />

            <div className="bg-[#2E2E2E]">
              <Operating />
            </div>

            <div className="relative overflow-hidden bg-[#2E2E2E] shadow-topDivSmall sm:shadow-topDiv py-4 z-10 md:py-12">
              <Image
                src={"/images/line2.webp"}
                fill
                alt="line"
                className="absolute top-0 md:top-[-97px] xmd:top-[-125px] lg:top-[-138px] xl:top-[-217px] 2xl:top-[-350px] left-0 w-full z-[-1]"
              />
              <Modules />
            </div>

            <div className="bg-[#2E2E2E]">
              <Proactive />
            </div>

            <div className="bg-[#2E2E2E] relative overflow-hidden">
              <Image
                fill
                src={"/images/line3.webp"}
                alt="line"
                className="absolute bottom-0 2xl:bottom-[-60px] left-0 w-full z-[1]"
              />
              <div>
                <Image
                  fill
                  src={"/images/bgcar.webp"}
                  alt="BgCar"
                  className="w-full"
                />
              </div>

              <NewEmpolyeeLogin />
            </div>

            {/* <SlotSchedule scrollToSlotDetails={scrollToSlotDetails} /> */}
            {/* <div
            ref={slotDetailsRef}
            className={`${slotData ? "flex justify-center items-center flex-col" : " invisible"}`}
          >
            {
              <div className="w-full my-12">
                <SlotDetails />
              </div>
            }
          </div>
          <EmployeeLogin /> */}
          </Flex>
        </Content>
        {/* <Footer className=" p-0 mt-[60px]">
        <AboutUsFooter />
      </Footer> */}
      </Layout>
    </div>
  );
};

export default Home;
