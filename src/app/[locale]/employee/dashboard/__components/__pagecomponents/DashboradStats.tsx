import React from "react";
import { FaBuildingUser } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";

type Props = {};

const DashboradStats = (props: Props) => {
  return (
    <div className="">
      <div className="w-full grid grid-cols-4 lg:gap-6 md:gap-4 gap-2 mt-4">
        <div className="rounded-md p-4 border bg-white relative shadow-lg">
          <div className="absolute w-16 h-16 -top-5 left-5 bg-red-400 text-white shadow-lg rounded-md flex items-center justify-center">
            <FaBuildingUser size={35} />
          </div>
          <div className="flex justify-end border-b pb-4 ">
            <div className="text-center">
              <p className="text-md text-gray-400">Employees</p>
              <h2 className="text-4xl font-normal text-center text-neutral-800">
                50+
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-md p-4 border bg-white relative shadow-lg">
          <div className="absolute w-16 h-16 -top-5 left-5 bg-blue-400 text-white shadow-lg rounded-md flex items-center justify-center">
            <TbUsers size={35} />
          </div>
          <div className="flex justify-end border-b pb-4 ">
            <div className="text-center">
              <p className="text-md text-gray-400">Customers</p>
              <h2 className="text-4xl font-normal text-center text-neutral-800">
                1500+
              </h2>
            </div>
          </div>
          <div className="text-[12px] pt-2 text-gray-400">
            <p>Active</p>
          </div>
        </div>

        <div className="rounded-md p-4 border bg-white relative shadow-lg">
          <div className="absolute w-16 h-16 -top-5 left-5 bg-yellow-400 shadow-lg rounded-md"></div>
          <div className="flex justify-end border-b pb-4 ">
            <div className="text-center">
              <p className="text-md text-gray-400">WorkOrders</p>
              <h2 className="text-4xl font-normal text-center text-neutral-800">
                15
              </h2>
            </div>
          </div>
          <div className="text-[12px] pt-2 text-gray-400">
            <p>In Last 24 Hours</p>
          </div>
        </div>

        <div className="rounded-md p-4 border bg-white relative shadow-lg">
          <div className="absolute w-16 h-16 -top-5 left-5 bg-pink-400 shadow-lg rounded-md"></div>
          <div className="flex justify-end border-b pb-4 ">
            <div className="text-center">
              <p className="text-md text-gray-400">WorkOrders</p>
              <h2 className="text-4xl font-normal text-center text-neutral-800">
                15
              </h2>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DashboradStats;
