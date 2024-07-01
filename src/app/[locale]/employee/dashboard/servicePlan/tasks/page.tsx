"use client";
import Loader from "@/app/components/Loader";
import {
  deleteServiceTask,
  getServiceTasks,
} from "@/app/services/operations/appointment/service-tasks";
import React, { useEffect, useState } from "react";
import CategoryCard from "../__component/CategoryCard";
import { useRouter } from "next/navigation";
import { IServiceTask } from "@/app/types/service";
import Watermark from "@/app/components/Text/WatermarkText";
import Link from "next/link";
import { Button } from "antd";

const Page = () => {
  const [tasks, setTasks] = useState<IServiceTask[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getAllServiceTasks();
  }, []);

  const getAllServiceTasks = async () => {
    setLoading(true);
    try {
      const result = await getServiceTasks();

      if (result?.length > 0) {
        setTasks(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handelDelete = async (e: any, id: string) => {
    e.stopPropagation();
    await deleteServiceTask(id);
    getAllServiceTasks();
  };

  return (
    <div>
      {loading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <Link href={`/employee/dashboard/servicePlan/tasks/createTasks`}>
              <Button type="primary">Create Tasks</Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {tasks?.length > 0 ? (
              tasks?.map((item, index) => (
                <div
                  onClick={() =>
                    router.push(
                      `/employee/dashboard/servicePlan/tasks/${item._id}/update`,
                    )
                  }
                  className="w-full xmd:w-[48.8%] xl:w-[32.2222%] min-h-20 cursor-pointer"
                  key={index}
                >
                  <CategoryCard
                    id={item._id}
                    showBadge={false}
                    name={item.name}
                    vehicle_type={item.vehicle_type}
                    onClick={handelDelete}
                  />
                </div>
              ))
            ) : (
              <div
                style={{ height: "calc(100vh - 300px)" }}
                className="relative w-full"
              >
                <Watermark text="No Tasks Found" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
