"use client";
import { getServiceCategory } from "@/app/services/operations/appointment/service-category";
import { IServiceCategory } from "@/app/types/service";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Watermark from "@/app/components/Text/WatermarkText";
import Loader from "@/app/components/Loader";
import CategoryCard from "../__component/CategoryCard";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<IServiceCategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    setLoading(true);
    try {
      const result = await getServiceCategory();
      if (result?.length > 0) {
        setCategory(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <h2 className="text-xl font-semibold">Categorys</h2>
            <Link
              href={`/employee/dashboard/servicePlan/category/createCategory`}
            >
              <Button type="primary">Create Category</Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {category?.length > 0 ? (
              category?.map((item, index) => (
                <div
                  onClick={() =>
                    router.push(
                      `/employee/dashboard/servicePlan/category/${item._id}/update`,
                    )
                  }
                  className="w-full xmd:w-[48.8%] xl:w-[32.2222%] min-h-20 cursor-pointer"
                  key={index}
                >
                  <CategoryCard
                    isActive={item.isActive}
                    showBadge={true}
                    name={item.name}
                    vehicle_type={item.vehicle_type}
                    id={item._id}
                  />
                </div>
              ))
            ) : (
              <div
                style={{ height: "calc(100vh - 300px)" }}
                className="relative w-full"
              >
                <Watermark text="No Category Found" />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Page;
