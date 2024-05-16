import { useTranslations } from "next-intl";
import Car from "../../../public/Images/car.webp";
import Bag from "../../../public/Images/bag.webp";
import Board from "../../../public/Images/board.webp";
import Users from "../../../public/Images/users.webp";

const SliderItmes = () => {
  const t = useTranslations("SliderItems");
  return [
    {
      text: `${t("car")}`,
      Image: Car,
    },
    {
      text: `${t("bag")}`,
      Image: Bag,
    },
    {
      text: `${t("slate")}`,
      Image: Board,
    },
    {
      text: `${t("user")}`,
      Image: Users,
    },
  ];
};

export default SliderItmes;
