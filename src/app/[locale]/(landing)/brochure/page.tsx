"use client";
import React from "react";
import HeadingSection from "../__components/HeadingSection";
import { useTranslations } from "next-intl";
import Committed from "../we/__components/Committed";
import Characteristics from "./__components/Characteristics";
import { RxCalendar } from "react-icons/rx";
import { FaDollarSign } from "react-icons/fa6";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Image from "next/image";
import Proactive from "../__components/Proactive";
import Inventory from "./__components/Invantory";
import BillingAndPayment from "./__components/BillingAndPayment";
import CarDashboard from "../we/__components/CarDashboard";
import Comprehensive from "./__components/Comprehensive";
import CardComponent from "./__components/CardComponent";
import { CardComponentData, CardComponentDataTwo } from "../utils/fakeData";
import Marketing from "./__components/Marketing";
import Footer from "./__components/Footer";

const Page = () => {
  const t = useTranslations("HeadingSection");
  const c = useTranslations("Committed");
  const d = useTranslations("Characteristics");
  const e = useTranslations("Proactive");
  return (
    <div>
      <HeadingSection
        height={""}
        subheading={t("subHeadingTwo")}
        Logo={"/images/BigLogo.webp"}
      />

      <div className="bg-[#1F1F1F]">
        <Committed
          reverse={true}
          para={c("paraTwo")}
          heading={c("heading1")}
          headingTwo={c("heading2")}
          headingThree={c("heading3")}
        />
      </div>

      <div className="bg-[#1F1F1F] shadow-topDivSmall relative z-[2] overflow-hidden">
        <Image
          src={"/images/line7.webp"}
          fill
          alt="line"
          className="absolute bottom-auto right-auto left-0 top-0 sm:top-[-150px] md:top-[-200px] xmd:top-[-280px] lg:top-[-310px] xl:top-[-480px] 2xl:top-[-680px] h-max w-full z-[-1]"
        />

        <Characteristics
          heading={d("heading")}
          subHeading={d("subHeading")}
          para={d("para")}
          Icon={RxCalendar}
        />
      </div>

      <div
        className="shadow-topDivSmall"
        style={{
          background: "url(/images/bgcar.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Proactive border={true} para={e("subHeadingTwo")} />
      </div>

      <div className="bg-[#1F1F1F] shadow-topDivSmall relative z-[2] overflow-hidden">
        <Image
          src={"/images/line8.webp"}
          fill
          alt="line"
          className="absolute bottom-auto right-auto left-0 top-0 sm:top-[-150px] md:top-[-200px] xmd:top-[-280px] lg:top-[-310px] xl:top-[-480px] 2xl:top-[-680px] h-max w-full z-[-1]"
        />

        <Characteristics
          subHeading={d("subHeadingTwo")}
          para={d("paraTwo")}
          Img={"/images/carlift.webp"}
        />
      </div>

      <div className="bg-[#1C1C1C] relative overflow-hidden">
        <Image
          src={"/images/UsersIcons.webp"}
          fill
          alt="users"
          className="absolute w-max h-max left-0 top-1/2 translate-y-[-50%]"
        />
        <Image
          src={"/images/storage.webp"}
          fill
          alt="users"
          className="absolute w-max h-max left-auto right-0 top-1/2 translate-y-[-50%]"
        />
        <Inventory />
      </div>

      <div className="bg-[#1F1F1F] shadow-topDivSmall relative z-[2] overflow-hidden">
        <Image
          src={"/images/line9.webp"}
          fill
          alt="line"
          className="absolute bottom-auto right-auto left-0 top-0 sm:top-[-150px] md:top-[-200px] xmd:top-[-280px] lg:top-[-310px] xl:top-[-480px] h-max w-full z-[-1]"
        />

        <Characteristics
          subHeading={d("headingThree")}
          para={d("paraThree")}
          Icon={FaDollarSign}
        />
      </div>

      <div className="bg-[#1F1F1F] relative overflow-hidden">
        <Image
          src={"/images/file.webp"}
          fill
          alt="users"
          className="absolute w-max h-max left-auto right-0 top-1/2 translate-y-[-50%]"
        />
        <BillingAndPayment />
      </div>

      <CarDashboard card={false} />

      <div className="bg-[#1F1F1F] shadow-topDivSmall relative z-[2] overflow-hidden">
        <Characteristics
          blur={false}
          subHeading={d("subHeading")}
          para={d("para")}
          Icon={HiOutlineShieldCheck}
        />
      </div>

      <div className="bg-[#1F1F1F] relative overflow-hidden">
        <Image
          fill
          src={"/images/line5.webp"}
          alt="line"
          className="absolute left-auto bottom-auto right-0 top-0 md:top-[-50px] xmd:top-[-100px] lg:top-[-150px] xl:top-[-200px] z-[1] h-max"
        />
        <Image
          fill
          src={"/images/line6.webp"}
          alt="line"
          className="absolute left-0 top-auto right-auto bottom-0 md:bottom-[-50px] lg:bottom-[-100px] xl:bottom-[-150px] z-[1] h-max"
        />
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-[5]"
          style={{
            background:
              " linear-gradient(180deg, #000000 0%, rgba(13, 13, 13, 0) 100%)",
          }}
        ></div>
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-[5]"
          style={{
            background:
              "linear-gradient(90deg, #000000 0%, rgba(13, 13, 13, 0) 100%)",
          }}
        ></div>
        <Comprehensive />
      </div>

      <div className="bg-[#1F1F1F]">
        <CardComponent CardComponentData={CardComponentData} />
      </div>

      <div
        style={{
          background: "url(/images/codebg.webp)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative overflow-hidden shadow-topDivSmall"
      >
        <Image
          src={"/images/line10.webp"}
          alt="line"
          fill
          className="right-10 top-1/2 translate-y-[-50%] xmd:translate-y-0 xmd:top-[-210px] left-auto bottom-auto w-max h-max"
        />

        <Marketing />
      </div>

      <div className="bg-[#1F1F1F]">
        <CardComponent CardComponentData={CardComponentDataTwo} />
      </div>

      <div className="bg-[#1F1F1F] shadow-topDivSmall relative overflow-hidden z-[5]">
        <Image
          src={"/images/line4.webp"}
          fill
          alt="line"
          className="xmd:bottom-[-245px] lg:bottom-[-236px] xl:bottom-[-420px] left-0 right-auto top-auto w-full h-max z-[-2]"
        />
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-[-1]"
          style={{
            background:
              "linear-gradient(-90deg, #000000 0%, rgba(13, 13, 13, 0) 100%)",
          }}
        ></div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
