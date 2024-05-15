"use client";
import { Button, Flex, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const LandingNavbar = (props: Props) => {
  const t = useTranslations("Navbar");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();

  const onChangeLocale = (value: string) => {
    startTransition(() => {
      router.replace(value);
    });
  };

  return (
    <div className="container">
      <Flex
        align="center"
        gap="large"
        className="w-full flex-wrap bg-transparent pt-8 pb-4 justify-center sm:justify-between"
      >
        <Image src={"/images/logo-1.webp"} alt="Logo" height={55} width={150} />

        <Flex justify="space-between" align="center" className="gap-12">
          <Flex align="center" className="gap-8">
            <Link
              className="text-white text-xl font-normal font-Inter hover:text-customYellow"
              href={"/dashboard"}
            >
              {t("home")}
            </Link>
            <Link
              className="text-white text-xl font-normal font-Inter hover:text-customYellow"
              href={"/dashboard"}
            >
              {t("we")}
            </Link>
            <Link
              className="text-white text-xl font-normal font-Inter hover:text-customYellow"
              href={"/dashboard"}
            >
              {t("services")}
            </Link>
            <Link
              className="text-white text-xl font-normal font-Inter hover:text-customYellow"
              href={"/dashboard"}
            >
              {t("contactUs")}
            </Link>
          </Flex>

          <Link
            href={`${localeActive}/login`}
            className="bg-matalicYellow text-white text-xl font-normal font-Inter px-6 py-1 rounded-full hover:bg-customYellow"
          >
            {t("login")}
          </Link>
        </Flex>
      </Flex>
    </div>
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
