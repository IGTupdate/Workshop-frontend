import { FaCarAlt, FaCarBattery, FaCarCrash, FaCarSide } from "react-icons/fa";
import { FaWindowMaximize } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { PiHeadlightsBold } from "react-icons/pi";
import { VscMirror } from "react-icons/vsc";

type TCarPart = {
  id: string;
  icon: JSX.Element;
  label: string;
};
const carParts: TCarPart[] = [
  { id: "Front", icon: <FaCarAlt size={50} />, label: "Front" },
  { id: "Side", icon: <FaCarSide size={50} />, label: "Side" },
  { id: "Back", icon: <FaCarCrash size={50} />, label: "Back" },
  { id: "Engine", icon: <FaCarBattery size={50} />, label: "Engine" },
  { id: "Headlight", icon: <PiHeadlightsBold size={50} />, label: "Headlight" },
  {
    id: "WindShield",
    icon: <FaWindowMaximize size={50} />,
    label: "WindShield",
  },
  { id: "Mirrors", icon: <VscMirror size={50} />, label: "Mirrors" },
];

export const getCategoryIcon = (category: string) => {
  const result = carParts.find((el) => {
    return el.id === category;
  });
  if (result) return result.icon;
  return <IoSettingsSharp size={50} />;
};

export default carParts;
