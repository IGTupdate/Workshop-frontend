"use client";

import { useTranslations } from "next-intl";

export const CardComponentData = () => {
  const t = useTranslations("CardComponent");

  return [
    {
      heading: t("heading"),
      para: t("para"),
      image: "/images/robot.webp",
    },
    {
      heading: t("headingTwo"),
      para: t("paraTwo"),
      image: "/images/following.webp",
    },
  ];
};

export const CardComponentDataTwo = () => {
  const t = useTranslations("CardComponent");

  return [
    {
      heading: t("headingThree"),
      para: t("paraThree"),
      image: "/images/code.webp",
    },
    {
      heading: t("headingFour"),
      para: t("paraFour"),
      image: "/images/usersIcon.webp",
    },
  ];
};
