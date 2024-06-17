import { FaCarAlt, FaCarBattery, FaCarCrash, FaCarSide } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

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
];

export const getCategoryIcon = (category: string) => {
  const result = carParts.find((el) => {
    return el.id === category;
  });
  if (result) return result.icon;
  return <IoSettingsSharp size={50} />;
};

export default carParts;
