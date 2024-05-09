"use client";
import { Button, Flex, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from "react";
import { useRouter } from "next/navigation";


type Props = {};

const LandingNavbar = (props: Props) => {
  const t = useTranslations('Index');

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();

  const onChange = (value: string) => {
    startTransition(() => {
      router.replace(value);
    });
  };


  return (
    <Flex
      align="center"
      gap="large"
      className="w-full flex-wrap bg-customGray p-4 justify-center sm:justify-between"
    >
      <Image src={"/images/logo-2.webp"} alt="Logo" height={55} width={150} />
      <Flex
        justify="space-between"
        align="center"
        className="flex-wrap"
        gap="large"
      >
        <Button
          size="large"
          type="link"
          href="/dashboard"
          className="h-max p-0"
        >
          <span className="text-lg text-customYellow text-opacity-80 hover:text-opacity-70 duration-200 transition-all">
            Book An Appointment
          </span>
        </Button>
        <Link href={`${localeActive}/login`}>
          <Button type="primary" size="large" className="font-semibold">
            {/* Login */}
            {t('title')}
          </Button>
        </Link>


        <Select
          defaultValue={localeActive}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          options={[
            {
              value: 'en',
              label: 'English',
            },
            {
              value: 'sp',
              label: 'Spanish',
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default LandingNavbar;
