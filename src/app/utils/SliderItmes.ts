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
      Image: "/Images/car.webp",
    },
    {
      text: `${t("bag")}`,
      Image: "/Images/bag.webp",
    },
    {
      text: `${t("slate")}`,
      Image: "/Images/board.webp",
    },
    {
      text: `${t("user")}`,
      Image: "/Images/users.webp",
    },
  ];
};

export default SliderItmes;
