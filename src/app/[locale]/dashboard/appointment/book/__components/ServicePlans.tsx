import React, { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { minutesToHoursConverter, PriceCalculator } from "@/app/utils/helper";
import { TServicePlans } from "@/app/types/service";
import { Button } from "antd";

interface Props {
  plan: TServicePlans;
  addServicePlan?: (planId: string) => void;
  removeServicePlan?: (planId: string) => void;
  selectedPlans?: string[];
}

const ServicePlans: React.FC<Props> = ({
  plan,
  addServicePlan,
  removeServicePlan,
  selectedPlans,
}) => {
  const [view, setView] = useState<boolean>(false);

  return (
    <div>
      {/* category */}
      <p className="mb-4 text-3xl font-bold">
        {typeof plan?.category === "string" ? "" : plan?.category.name}
      </p>

      <div className="bg-white p-4 pt-8 sm:pt-4 rounded-xl shadow-lg mb-4 relative">
        {/* bag */}
        {plan?.duration && (
          <div className="flex items-center gap-2 absolute right-0 top-0 sm:top-5 p-2 py-1 bg-slate-400 text-white">
            <IoMdTime className="text-lg" />
            <p className="text-base">
              {minutesToHoursConverter(plan?.duration)} Hrs Taken
            </p>
          </div>
        )}

        {/* heading */}
        <div className="heading">
          <h3 className="font-bold text-xl">{plan?.name}</h3>
          <p className="font-semibold text-base">{plan?.description}</p>
        </div>

        {/* tasks */}
        {plan?.tasks && plan?.tasks?.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-between items-center mt-4 overflow-hidden">
            {plan?.tasks
              ?.slice(0, view ? plan?.tasks?.length : 5)
              ?.map((task, i) => (
                // show tasks
                <p
                  className="w-full sm:w-[48%] flex flex-none items-center gap-2"
                  key={i}
                >
                  <span className="flex justify-center items-center h-[16px] w-[16px] rounded-full bg-green-200">
                    <IoIosCheckmark className="text-green-400 text-base" />
                  </span>
                  <span className="text-base font-normal text-nowrap">
                    {task?.name}
                  </span>
                </p>
              ))}
            {/* view more buttom */}
            {plan?.tasks?.length > 5 && (
              <div
                className="w-[48%] text-customYellow underline underline-offset-2 text-base font-medium cursor-pointer mb-3"
                onClick={() => setView(!view)}
              >
                {view ? "" : "+"}
                {!view && plan?.tasks?.slice(5, plan?.tasks?.length)?.length}
                {view ? "View Less" : "View More"}
              </div>
            )}
          </div>
        )}
        {/* price */}

        <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
          <p className="flex items-center gap-2">
            <span className="line-through text-base font-semibold text-antGreay leading-[25px]">
              $ {PriceCalculator(plan?.price)}
            </span>
            <span className="text-lg font-semibold">$ {plan?.price}</span>
          </p>

          <div className="flex gap-4 items-center">
            {selectedPlans && selectedPlans?.includes(plan?._id)
              ? removeServicePlan && (
                  <Button
                    type="primary"
                    onClick={() => removeServicePlan(plan?._id)}
                  >
                    Remove from cart
                  </Button>
                )
              : addServicePlan && (
                  <Button onClick={() => addServicePlan(plan?._id)}>
                    Add to cart
                  </Button>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePlans;
