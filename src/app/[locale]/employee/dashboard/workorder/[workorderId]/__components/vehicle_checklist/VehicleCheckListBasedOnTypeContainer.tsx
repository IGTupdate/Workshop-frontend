"use client";

import { IVehicleChecklist } from "@/app/types/vehicle-checklist";
import { Avatar, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCar, FaChevronRight } from "react-icons/fa6";

type Props = {
  heading: string;
  checkListItem: IVehicleChecklist[];
  onCheckListSelect?: (checkListId: string) => void;
};

const { Title } = Typography;

const VehicleCheckListBasedOnTypeContainer = (props: Props) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="mb-4">
        <Title level={4}>{props.heading}</Title>
      </div>
      <div className="w-full ">
        <ul>
          {props.checkListItem.length > 0 ? (
            props.checkListItem.map((item, index) => {
              return (
                <li
                  key={index}
                  className="grid grid-cols-3 items-center border p-4 rounded hover:bg-gray-200 cur"
                >
                  <div className="text-md font-semibold flex gap-3">
                    <Avatar size={40} icon={<FaCar title="car" />} />
                    <div>
                      <p className="capitalize">
                        {item.vehicle.type}, {item.vehicle.brand}{" "}
                      </p>
                      <p className="text-sm text-gray-500 text-medium">
                        {item.vehicle.model} {item.vehicle.year}
                      </p>
                    </div>
                  </div>
                  <div className="text-md text-center">
                    {item.checklist.length} Level Check
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (props.onCheckListSelect) {
                          props.onCheckListSelect(item._id);
                        }
                      }}
                    >
                      {/* href={`${pathname.includes("check") ? pathname + "/" + item._id : pathname + "/check/" + item._id}`} */}
                      <FaChevronRight size={20} />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li>No Items Found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default VehicleCheckListBasedOnTypeContainer;
