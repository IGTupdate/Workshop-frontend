import { getSingleServicePlans } from "@/app/services/operations/appointment/service-plans";
import { AppointmentProposalData } from "@/app/types/work-order";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import ServicePlans from "../../appointment/book/__components/ServicePlans";
import { TServicePlans } from "@/app/types/service";

type Props = {
  appointmentProposalData: AppointmentProposalData | null | undefined;
};

const generateUniqueId = (): string =>
  "_" + Math.random().toString(36).substr(2, 9);

const Proposal: React.FC<Props> = ({ appointmentProposalData }) => {
  const [proposalData, setProposalData] = useState<TServicePlans[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (appointmentProposalData && appointmentProposalData?.servicePlans?.[0]) {
      getPlanData(appointmentProposalData.servicePlans[0]);
    }
  }, [appointmentProposalData?.servicePlans?.[0]]);

  const getPlanData = async (id: string): Promise<void> => {
    if (!id) return;

    try {
      const result = await getSingleServicePlans(id);

      if (result?.length > 0) {
        const filterData = result.filter(
          (item: TServicePlans) =>
            item._id === appointmentProposalData?.servicePlans[0],
        );

        if (appointmentProposalData && filterData.length > 0) {
          const newData = filterData?.map((item: TServicePlans) => ({
            ...item,
            tasks: item?.tasks?.concat(
              appointmentProposalData?.additional_tasks?.map(
                (task: string) => ({
                  _id: generateUniqueId(),
                  name: task,
                  vehicle_type: "",
                }),
              ) || [],
            ),
          }));

          setProposalData(newData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch service plans:", error);
    }
  };

  const handleClick = (): void => {
    if (!appointmentProposalData) {
      console.error("No appointment proposal data available.");
      return;
    }

    const data = {
      calender_id: "",
      vehicle_id: appointmentProposalData.vehicle_id,
      customer_id: appointmentProposalData.customer_id,
      service_plans: appointmentProposalData.servicePlans,
      service_description: [],
      showServicePlans: false,
      slot_id: "",
    };

    localStorage.setItem("appointmentBookingData", JSON.stringify(data));
    router.push("/dashboard/appointment/book");
  };

  return (
    <>
      {proposalData.length > 0 ? (
        <div>
          <h3 className="font-bold text-xl">Recommended Service Plans</h3>
          <div className="cursor-pointer" onClick={handleClick}>
            {proposalData.map((item, index) => (
              <Fragment key={index}>
                <ServicePlans plan={item} />
              </Fragment>
            ))}
          </div>
        </div>
      ) : (
        <p>No service plans available.</p>
      )}
    </>
  );
};

export default Proposal;
