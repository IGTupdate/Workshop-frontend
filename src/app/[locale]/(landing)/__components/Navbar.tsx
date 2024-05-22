"use client";
import { Button, Flex, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

type Props = {
  toggle: boolean;
  setToggle: any;
};

const LandingNavbar = (props: Props) => {
  const t = useTranslations("Navbar");
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();

  const onChangeLocale = (value: string) => {
    startTransition(() => {
      router.replace(value);
    });
  };

  // console.log(pathName);

  return (
    <>
      <div className="container">
        <Flex
          align="center"
          className="w-full flex-wrap bg-transparent pt-4 sm:pt-8 pb-4 justify-between"
        >
          <Image
            src={"/images/logo-1.webp"}
            alt="Logo"
            height={55}
            width={150}
          />

          <div
            className={`flex flex-col z-40 p-4 gap-4 fixed ${props.toggle ? "left-[0]" : "left-[-200%]"} transition-all top-0 h-screen w-[280px] bg-matalicYellow rounded-r-[50px] xmd:static xmd:justify-between xmd:items-center xmd:flex-row xmd:p-0 xmd:gap-8 xmd:bg-transparent xmd:h-max xmd:w-max`}
          >
            <Image
              src={"/images/logo-1.webp"}
              alt="Logo"
              height={55}
              width={150}
              className="block xmd:hidden pt-4"
            />
            <div
              className={`flex flex-col py-4 gap-4 transition-all xmd:justify-between xmd:items-center xmd:flex-row xmd:p-0 xmd:gap-8 xmd:bg-transparent xmd:h-max xmd:w-max`}
            >
              <Link
                className={`text-xl font-normal font-Inter hover:text-customYellow ${"/" + localeActive === pathName ? "bg-black" : ""} hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
                href={"/"}
                style={{
                  color: `/${localeActive}` === pathName ? "yellow" : "white",
                }}
                onClick={() => props.setToggle(false)}
              >
                <AiFillHome className="block xmd:hidden" />
                {t("home")}
              </Link>
              <Link
                className={`text-xl font-normal font-Inter hover:text-customYellow ${"/" + localeActive + "/we" === pathName ? "bg-black" : ""} hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
                href={"/we"}
                style={{
                  color:
                    `/${localeActive}/we` === pathName ? "yellow" : "white",
                }}
                onClick={() => props.setToggle(false)}
              >
                <PiUsersThreeFill className="block xmd:hidden" />
                {t("we")}
              </Link>
              <Link
                className={`text-xl font-normal font-Inter hover:text-customYellow ${"/" + localeActive + "/services" === pathName ? "bg-black" : ""} hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
                href={"/services"}
                style={{
                  color:
                    `/${localeActive}/services` === pathName
                      ? "yellow"
                      : "white",
                }}
                onClick={() => props.setToggle(false)}
              >
                <MdOutlineMiscellaneousServices className="block xmd:hidden" />
                {t("services")}
              </Link>
              <Link
                className={`text-xl font-normal font-Inter hover:text-customYellow ${"/" + localeActive + "/contactUs" === pathName ? "bg-black" : ""} hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
                href={"/contactUs"}
                style={{
                  color:
                    `/${localeActive}/contactUs` === pathName
                      ? "yellow"
                      : "white",
                }}
                onClick={() => props.setToggle(false)}
              >
                <RiContactsBook2Fill className="block xmd:hidden" />
                {t("contactUs")}
              </Link>
            </div>

            <Link
              href={`${localeActive}/login`}
              className="bg-matalicYellow text-white text-xl font-normal font-Inter text-center px-6 py-1 rounded-full hover:bg-customYellow transition-all shadow-bottom mt-auto mb-8 xmd:m-0 xmd:shadow-none"
            >
              {t("login")}
            </Link>
          </div>
          {!props.toggle ? (
            <RxHamburgerMenu
              onClick={() => props.setToggle(!props.toggle)}
              size={25}
              className="text-customYellow block xmd:hidden"
            />
          ) : (
            <IoClose
              onClick={() => props.setToggle(!props.toggle)}
              size={30}
              className="text-customYellow block xmd:hidden"
            />
          )}
        </Flex>
      </div>
    </>
  );
};

export default LandingNavbar;

{
  /* <Flex
align="center"
gap="large"
className="w-full flex-wrap bg-customGray p-4 justify-center sm:justify-between"
>
<Image src={"/images/logo-2.webp"} alt="Logo" height={55} width={150} />

<div>
  {localeActive === "en" ? (
    <p className="text-red-500" onClick={() => onChangeLocale("sp")}>
      Translate To : <span className="cursor-pointer">española</span>
    </p>
  ) : (
    <p className="text-red-500" onClick={() => onChangeLocale("en")}>
      Translate To : <span className="cursor-pointer">English</span>
    </p>
  )}

  <div className="flex justify-between items-center gap-4">
    <Button
      size="large"
      type="link"
      href="/dashboard"
      className="h-max p-0"
    >
      <span className="text-lg text-customYellow text-opacity-80 hover:text-opacity-70 duration-200 transition-all">
        {t("bookAppointment")}
      </span>
    </Button>
    <Link href={`${localeActive}/login`}>
      <Button type="primary" size="large" className="font-semibold">
        {t("login")}
      </Button>
    </Link>

  </div>
</div>
</Flex> */
}
