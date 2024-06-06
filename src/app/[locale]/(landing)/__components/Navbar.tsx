"use client";
import { Button, Flex, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { BiSolidDetail } from "react-icons/bi";
import { get_client_cookie } from "@/app/utils/get_client_cookie";

type Props = {
  toggle: boolean;
  setToggle: any;
};

const LandingNavbar = (props: Props) => {
  const [isEmployee, setISEmployee] = useState<string | undefined>("");
  const [refreshToken, setRefreshToken] = useState<string | undefined>("");
  const t = useTranslations("Navbar");
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();

  const onChangeLocale = (value: string) => {
    const segments = pathName.split("/");
    const spSegment = segments[1];

    startTransition(() => {
      const newPathname = pathName.replace(`/${spSegment}/`, `/${value}/`);
      router.replace(newPathname);
    });
  };

  let isEmployeeCookie;
  let refreshTokenCookie;

  useEffect(() => {
    isEmployeeCookie = get_client_cookie("isEmployee");
    refreshTokenCookie = get_client_cookie("refreshToken");

    if (isEmployeeCookie) {
      setISEmployee(isEmployeeCookie);
    }
    if (refreshTokenCookie) {
      setRefreshToken(refreshTokenCookie);
    }
  }, [isEmployeeCookie, refreshTokenCookie]);

  return (
    <>
      {pathName.split("/").slice(-1)[0] === "brochure" ? (
        ""
      ) : (
        <div className="container">
          <Flex
            align="center"
            className="w-full flex-wrap bg-transparent pt-4 sm:pt-8 pb-4 justify-between"
          >
            <Image
              src={"/images/logo-1.webp"}
              alt="Logo"
              height={30}
              width={100}
              className="relative"
              style={{ height: "auto", width: "auto" }}
            />

            <div
              className={`flex flex-col z-40 p-4 gap-4 fixed ${
                props.toggle ? "left-[0]" : "left-[-200%]"
              } transition-all top-0 h-screen w-[280px] bg-matalicYellow rounded-r-[50px] xmd:static xmd:justify-between xmd:items-center xmd:flex-row xmd:p-0 xmd:gap-8 xmd:bg-transparent xmd:h-max xmd:w-max`}
            >
              <Image
                src={"/images/logo-1.webp"}
                alt="Logo"
                height={30}
                width={100}
                className="relative block xmd:hidden pt-4"
                style={{ height: "auto", width: "auto" }}
              />
              <div
                className={`flex flex-col py-4 gap-4 transition-all xmd:justify-between xmd:items-center xmd:flex-row xmd:p-0 xmd:gap-8 xmd:bg-transparent xmd:h-max xmd:w-max`}
              >
                <Link
                  className={`text-xl font-normal font-Inter hover:text-customYellow ${
                    "/" + localeActive === pathName ? "bg-black" : ""
                  } hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
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
                  className={`text-xl font-normal font-Inter hover:text-customYellow ${
                    "/" + localeActive + "/we" === pathName ? "bg-black" : ""
                  } hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
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
                  className={`text-xl font-normal font-Inter hover:text-customYellow ${
                    "/" + localeActive + "/services" === pathName
                      ? "bg-black"
                      : ""
                  } hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
                  href={"/we"}
                  style={{
                    color:
                      `/${localeActive}/we` === pathName ? "yellow" : "white",
                  }}
                  onClick={() => props.setToggle(false)}
                >
                  <MdOutlineMiscellaneousServices className="block xmd:hidden" />
                  {t("services")}
                </Link>
                <Link
                  className={`text-xl font-normal font-Inter hover:text-customYellow ${
                    "/" + localeActive + "/contactUs" === pathName
                      ? "bg-black"
                      : ""
                  } hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
                  href={"/we"}
                  style={{
                    color:
                      `/${localeActive}/we` === pathName ? "yellow" : "white",
                  }}
                  onClick={() => props.setToggle(false)}
                >
                  <RiContactsBook2Fill className="block xmd:hidden" />
                  {t("contactUs")}
                </Link>
                <Link
                  className={`text-xl font-normal font-Inter hover:text-customYellow ${
                    "/" + localeActive + "/brochure" === pathName
                      ? "bg-black"
                      : ""
                  } hover:bg-black hover:xmd:bg-none xmd:bg-transparent p-2 rounded-xl flex items-center gap-2`}
                  href={"/brochure"}
                  style={{
                    color:
                      `/${localeActive}/brochure` === pathName
                        ? "yellow"
                        : "white",
                  }}
                  onClick={() => props.setToggle(false)}
                >
                  <BiSolidDetail className="block xmd:hidden" />
                  {t("brochure")}
                </Link>
              </div>

              {/* <Select
                defaultValue={localeActive}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChangeLocale}
                options={[
                  {
                    value: "en",
                    label: "En",
                  },
                  {
                    value: "sp",
                    label: "Sp",
                  },
                ]}
              /> */}

              {isEmployee && refreshToken ? (
                <Link
                  href={"/employee/dashboard"}
                  className="bg-matalicYellow text-white text-xl font-normal font-Inter text-center px-6 py-1 rounded-full hover:bg-black transition-all shadow-bottom mt-auto mb-8 xmd:m-0 xmd:shadow-none"
                >
                  Dashboard
                </Link>
              ) : refreshToken ? (
                <Link
                  href={"/dashboard"}
                  className="bg-matalicYellow text-white text-xl font-normal font-Inter text-center px-6 py-1 rounded-full hover:bg-black transition-all shadow-bottom mt-auto mb-8 xmd:m-0 xmd:shadow-none"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={`/login`}
                  className="bg-matalicYellow text-white text-xl font-normal font-Inter text-center px-6 py-1 rounded-full hover:bg-black transition-all shadow-bottom mt-auto mb-8 xmd:m-0 xmd:shadow-none"
                >
                  {t("login")}
                </Link>
              )}
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
      )}
    </>
  );
};

export default LandingNavbar;
