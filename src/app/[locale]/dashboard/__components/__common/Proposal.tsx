import { getSingleServicePlans } from "@/app/services/operations/appointment/service-plans";
import { AppointmentProposalData } from "@/app/types/work-order";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import ServicePlans from "../../appointment/book/__components/ServicePlans";
import { TServicePlans } from "@/app/types/service";

type Props = {
  appointmentProposalData: AppointmentProposalData | null;
};

const generateUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

const Proposal = ({ appointmentProposalData }: Props) => {
  const [proposalData, setProposalData] = useState<TServicePlans[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (appointmentProposalData?.servicePlans[0]) {
      getPlanData(appointmentProposalData?.servicePlans[0]);
    }
  }, [appointmentProposalData?.servicePlans[0]]);

  async function getPlanData(id: string) {
    const result = await getSingleServicePlans(id);

    if (result?.length > 0) {
      const filterData = result?.filter(
        (item: TServicePlans) =>
          item._id === appointmentProposalData?.servicePlans[0],
      );

      const newData = filterData.map((item: TServicePlans) => ({
        ...item,
        tasks: item?.tasks?.concat(
          appointmentProposalData?.additional_tasks?.map((task) => ({
            _id: generateUniqueId(),
            name: task,
          })) || [],
        ),
      }));

      setProposalData(newData);
    }
  }

  const handelClick = () => {
    const data = {
      calender_id: "",
      vehicle_id: appointmentProposalData?.vehicle_id,
      customer_id: appointmentProposalData?.customer_id,
      service_plans: appointmentProposalData?.servicePlans,
      service_description: [],
      showServicePlans: false,
      slot_id: "",
    };

    localStorage.setItem("appointmentBookingData", JSON.stringify(data));

    router.push("/dashboard/appointment/book");
  };

  console.log(
    appointmentProposalData?.additional_tasks,
    "appointmentProposalData",
  );

  return (
    <>
      {proposalData?.length > 0 ? (
        <div>
          <h3 className="font-bold text-xl">Recommended Service Plans</h3>
          <div className="cursor-pointer" onClick={handelClick}>
            {proposalData?.map((item, index) => (
              <Fragment key={index}>
                <ServicePlans plan={item} />
              </Fragment>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>

    // <div className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer" onClick={handelClick}>
    //     <h2 className="text-2xl font-semibold mb-4">Recommended Service Plans</h2>
    //     <div className="mb-4">
    //         <h3 className="text-xl font-medium">Additional Tasks</h3>
    //         <ul>
    //             {appointmentProposalData?.additional_tasks?.map((task, index) => (
    //                 <li key={index}>{task}</li>
    //             ))}
    //         </ul>
    //     </div>
    //     {/* <div className="mb-4">
    //         <h3 className="text-xl font-medium">Service Plans</h3>
    //         <ul>
    //             {appointmentProposalData?.servicePlans.map((plan, index) => (
    //                 <li key={index}>{plan}</li>
    //             ))}
    //         </ul>
    //     </div> */}
    //     <div className="mb-4">
    //         <h3 className="text-xl font-medium">Status</h3>
    //         <p>{appointmentProposalData?.status}</p>
    //     </div>
    // </div>
  );
};

export default Proposal;
