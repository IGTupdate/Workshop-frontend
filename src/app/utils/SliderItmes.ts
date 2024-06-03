import { useTranslations } from "next-intl";
// import Car from "../../../public/Images/car.webp";
// import Bag from "../../../public/Images/bag.webp";
// import Board from "../../../public/Images/board.webp";
// import Users from "../../../public/Images/users.webp";

const SliderItmes = () => {
  const t = useTranslations("SliderItems");
  return [
    {
      text: `${t("car")}`,
      Image: "/images/car.webp",
    },
    {
      text: `${t("bag")}`,
      Image: "/images/bag.webp",
    },
    {
      text: `${t("slate")}`,
      Image: "/images/board.webp",
    },
    {
      text: `${t("user")}`,
      Image: "/images/users.webp",
    },
  ];
};

export default SliderItmes;
