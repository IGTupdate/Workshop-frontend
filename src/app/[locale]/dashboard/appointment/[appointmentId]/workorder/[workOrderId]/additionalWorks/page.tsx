"use client";
import Loader from "@/app/components/Loader";
import Watermark from "@/app/components/Text/WatermarkText";
import {
  additionalWorkApprove,
  getAdditionalWokrRequest,
} from "@/app/services/operations/workorder/additional-work";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import TaskComponent from "../__component/TaskComponent";
import { TAdditonalWorkRequest } from "@/app/types/work-order";
import AdditionalWorksDrawer from "../__component/AdditionalWorksDrawer";
import toast from "react-hot-toast";

const Page = () => {
  const [additionalData, setAdditionalData] = useState<TAdditonalWorkRequest[]>(
    [],
  );
  const [loader, setLoader] = useState(true);
  const [toggle, setToggle] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedAdditionalTasks, setSelectedAdditionalTasks] = useState<
    TAdditonalWorkRequest[]
  >([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const pathname = usePathname();
  const id = pathname.split("/").slice(-2)[0];

  useEffect(() => {
    if (id) {
      additionalWorksData(id);
    }
  }, [id]);

  const additionalWorksData = async (id: string) => {
    setLoader(true);
    try {
      const result = await getAdditionalWokrRequest(`workOrderId=${id}`);
      if (result?.success === true) {
        setAdditionalData(result?.data);
        setLoader(false);
      }
      console.log(result, "result");
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleToggle = (id: string) => {
    setToggle(toggle === id ? null : id);
  };

  const ApprovedAdditionalWorks = async (additionalId: string) => {
    try {
      console.log(additionalId, "additionalId");

      if (selectedTasks?.length > 0) {
        const result = await additionalWorkApprove(additionalId, selectedTasks);
      } else {
        toast.error("Please Select Tasks");
      }
      // additionalWorksData(id);
    } catch (error) {
      console.log(error);
    }
  };

  const showDrawer = (id: string) => {
    const selectedData = additionalData?.filter((item) => item._id === id);

    setSelectedAdditionalTasks(selectedData);

    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedTasks([]);
  };

  console.log(selectedTasks);

  return (
    <>
      {loader ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div className="bg-white p-4 py-8 rounded-xl my-32 md:my-0">
          <div className="flex flex-wrap justify-between gap-4 items-start">
            {additionalData?.length > 0 ? (
              additionalData.map((item, index) => (
                <div
                  className="card w-full md:w-[48%] cursor-pointer"
                  key={index}
                  onClick={() => showDrawer(item._id)}
                >
                  <div className="bg-white p-4 rounded-xl shadow-xl mb-4">
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Estimated Cost:</strong> ${item.estimatedCost}
                    </p>
                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Tasks</h3>
                        {item.tasks.length > 0 && (
                          <p className="min-w-6 h-6 flex justify-center items-center p-1 rounded-md bg-black text-white">
                            {item.tasks.length}
                          </p>
                          // <p
                          //   className="cursor-pointer text-blue-500"
                          //   onClick={() => handleToggle(item._id)}
                          // >
                          //   {toggle === item._id ? "Show Less" : "Show All"}
                          // </p>
                        )}
                      </div>
                      <div
                        className={`flex justify-between items-start flex-wrap gap-4 `}
                        // ${toggle ? "h-max" : "h-[225px]"} overflow-hidden
                      >
                        {/* {item.tasks.map(task => ( */}
                        <TaskComponent
                          item={item}
                          ApprovedAdditionalWorks={ApprovedAdditionalWorks}
                        />
                        {/* ))} */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{ height: "calc(100vh - 200px)" }}
                className="w-full text-center"
              >
                <Watermark text="No Data Found" />
              </div>
            )}
          </div>
        </div>
      )}

      <AdditionalWorksDrawer
        onClose={onClose}
        open={open}
        selectedAdditionalTasks={selectedAdditionalTasks || []}
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
        ApprovedAdditionalWorks={ApprovedAdditionalWorks}
      />
    </>
  );
};

export default Page;
