import { TkanbanValue } from "@/app/types/work-order";
import { Popover, Steps } from "antd";
import React, { useState } from "react";
import { FaCarAlt } from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";

type Props = {
  kanbanData: {
    heading: string;
    cards: TkanbanValue[];
  }[];
};

const data = [
  {
    status: "Appointment",
    vehicles: ["MP09XH4097", "XYZ15A5896", "ABCD456ET"],
  },
  {
    status: "Pending",
    vehicles: ["PEN2345JKL", "PEN6789MNO"],
  },

  {
    status: "Prepared",
    vehicles: ["PRE9101GHI", "PRE2345JKL", "PRE6789MNO"],
  },

  {
    status: "OnRamp",
    vehicles: [
      "ONR9101GHI",
      "ONR2345JKL",
      "ONR6789MNO",
      "ONR9101GHI",
      "ONR2345JKL",
      "ONR6789MNO",
    ],
  },

  {
    status: "Washing",
    vehicles: [],
  },

  {
    status: "Billing",
    vehicles: ["BIL9101GHI", "BIL2345JKL", "BIL6789MNO"],
  },
  {
    status: "Completed",
    vehicles: ["COM1234ABC", "COM5678DEF"],
  },
];

const statusColors: { [key: string]: string } = {
  Appointment: "#FFA07A", // Light Salmon
  Pending: "#FFD700", // Gold
  Prepared: "#87CEEB", // Sky Blue
  InProgress: "black",
  OnRamp: "#20B2AA", // Light Sea Green
  Washing: "#00BFFF", // Deep Sky Blue
  Billing: "#FF4500", // Orange Red
  Completed: "#32CD32", // Lime Green
};

const VehicleStatusDataBoard = (props: Props) => {
  const [activeStatusColumn, setActiveStatusColumn] = useState(0);
  return (
    <div className="w-full">
      {/* VehicleStatusDataBoard */}

      <div className="mb-4">
        <h2 className="text-xl font-semibold ">Vehicle Status in WorkShop</h2>
      </div>

      <div className="grid grid-cols-7 lg:gap-3 md:gap-2 gap-1 bg-white py-4 rounded-xl">
        {props.kanbanData.map((el, ind) => {
          return (
            <div key={ind}>
              <div
                className={`overflow-hidden transition all ease-in-out duration-500`}
              >
                <div
                  style={
                    {
                      // background: statusColors[el.heading]
                    }
                  }
                  className={`p-2 gap-4 flex flex-col items-center`}
                >
                  <h2
                    style={{ backgroundColor: statusColors[el.heading] }}
                    className={`w-10 h-10 rounded-full flex justify-center items-center p-4 text-white shadow-md md:text-lg md:text-md text-sm`}
                  >
                    {/* {activeStatusColumn === ind ? "Appointment" : "Appointment"} */}
                    {ind + 1}
                  </h2>
                  <p className="font-normal">{el.heading}</p>
                  {/* <button onClick={() => {
                                        setActiveStatusColumn((prv) => {
                                            if (prv === ind) return -1;
                                            return ind;
                                        })
                                    }}>
                                        <GoSidebarCollapse size={18} />
                                    </button> */}
                </div>

                <ul className="">
                  {el.cards.length > 0 ? (
                    el.cards.map((_el, index) => {
                      return (
                        <Popover
                          key={index}
                          title={"Order Detail"}
                          content={<OrderDetailContaier data={_el} />}
                        >
                          <li
                            key={index}
                            className="mx-auto mt-2 border p-3 cursor-pointer hover:bg-gray-100 flex items-center justify-center gap-2"
                          >
                            <span>
                              <FaCarAlt size={15} />
                            </span>
                            <span className="hidden md:block lg:text-sm md:text-[12px] font-medium">
                              {_el.registeration_number}
                            </span>
                          </li>
                        </Popover>
                      );
                    })
                  ) : (
                    <p className="md:p-4 md:block text-center hidden">NA</p>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderDetailContaier = ({ data }: { data: TkanbanValue }) => {
  return (
    <div>
      <div>
        <h2 className="text-md font-semibold">{data.registeration_number}</h2>
        <h2 className="text-md font-semibold">{data.fullName}</h2>
        <p className="text-sm text-gray-400">{data.createdAt}</p>
      </div>
    </div>
  );
};

export default VehicleStatusDataBoard;
