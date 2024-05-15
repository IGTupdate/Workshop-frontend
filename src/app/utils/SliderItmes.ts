import { useTranslations } from "next-intl";
import { FaCar } from "react-icons/fa";
import { PiToolboxFill } from "react-icons/pi";
import { FaClipboard } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";

const SliderItmes = () => {
  const t = useTranslations("SliderItems");
  return [
    {
      text: `${t("car")}`,
      Icon: FaCar,
    },
    {
      text: `${t("bag")}`,
      Icon: PiToolboxFill,
    },
    {
      text: `${t("slate")}`,
      Icon: FaClipboard,
    },
    {
      text: `${t("user")}`,
      Icon: FaUsersCog,
    },
  ];
};

export default SliderItmes;
