"use client";
import { Flex, Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import LandingNavbar from "./__components/Navbar";
import SlotSchedule from "./__components/SlotSchedule";
import SlotDetails from "./__components/SlotDetails";
import { useAppSelector } from "@/app/store/reduxHooks";
import EmployeeLogin from "./__components/EmployeeLogin";
import AboutUsFooter from "./__components/AboutUs";
import HeadingSection from "./__components/HeadingSection";
import Operating from "./__components/Operating";
import Modules from "./__components/Modules";
import Image from "next/image";
import LineTwo from "../../../../public/images/line2.webp";
import LineThree from "../../../../public/images/line3.webp";
import BgCar from "../../../../public/images/bgcar.webp";
import Proactive from "./__components/Proactive";
import NewEmpolyeeLogin from "./__components/NewEmpolyeeLogin";

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  // Ref for the SlotDetails component
  const [scrolling, setScrolling] = useState(false);
  const slotDetailsRef = useRef<HTMLDivElement>(null);
  const slotData = useAppSelector((state) => state.slot.slotData);

  // Function to scroll to SlotDetails component
  const scrollToSlotDetails = () => {
    if (slotDetailsRef.current) {
      slotDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* <Header className='flex items-center justify-center w-full bg-customGray mb-0'> */}
      <div
        style={{
          background: scrolling ? "#000000ad" : "transparent",
          boxShadow: scrolling ? "5px 5px 15px #ffffff5e" : "none",
        }}
        className="fixed top-0 left-1/2 translate-x-[-50%] z-20 w-full"
      >
        <LandingNavbar />
      </div>
      {/* </Header> */}
      <Content>
        <Flex vertical>
          <HeadingSection />

          <div className="bg-[#2E2E2E]">
            <Operating />
          </div>

          <div className="relative overflow-hidden bg-[#2E2E2E] shadow-topDivSmall sm:shadow-topDiv py-4 z-10 md:py-12">
            <Image
              src={LineTwo}
              alt="line"
              className="absolute top-20 sm:top-[-50px] xmd:top-[-350px] left-0 w-full z-[-1]"
            />
            <Modules />
          </div>

          <div className="bg-[#2E2E2E]">
            <Proactive />
          </div>

          <div className="bg-[#2E2E2E] relative overflow-hidden">
            <Image
              src={LineThree}
              alt="line"
              className="absolute bottom-0 xmd:bottom-[-60px] left-0 w-full z-[1]"
            />
            <div>
              <Image src={BgCar} alt="BgCar" className="w-full" />
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
  );
};

export default App;
