"use client";

import { Avatar, Badge } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { HiMiniLanguage } from "react-icons/hi2";
import { MdNotificationsNone } from "react-icons/md";
import HeaderContainerNotification from "./HeaderContainerNotification";
import Link from "next/link";

type Props = {};

const HeaderContainerLeft = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChangeLocale = () => {
    var segments = pathname.split("/");
    var spSegment = segments[1];

    startTransition(() => {
      // Replace the segment containing 'locale' with the new locale value
      var newPathname = pathname.replace(`/${spSegment}/`, `/${"value"}/`);
      router.replace(newPathname);
    });
  };
  return (
    <div className="flex lg:gap-8 md:gap-6 gap-3">
      <button title="User" onClick={onChangeLocale}>
        <Avatar shape="square" icon={<HiMiniLanguage />} />
      </button>
      <HeaderContainerNotification />
      <Link href={`/employee/dashboard/employeeProfile`} title="User">
        <Avatar shape="square" icon={<AiOutlineUser />} />
      </Link>
    </div>
  );
};

export default HeaderContainerLeft;
