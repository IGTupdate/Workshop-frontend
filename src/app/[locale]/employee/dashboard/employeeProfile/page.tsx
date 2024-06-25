"use client";

import Loader from "@/app/components/Loader";
import { getEmployeeByEmployeeId } from "@/app/services/operations/employee/employee";
import { useAppSelector } from "@/app/store/reduxHooks";
import { TEmployeeProfile } from "@/app/types/employee";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";

const Page = () => {
  const [employee, setEmployee] = useState<TEmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { _id, email } = useAppSelector((state) => state.auth.authData);
  const t = useTranslations("Profile");

  useEffect(() => {
    if (_id && email) {
      getEmployeeDataById(_id, email);
    }
  }, [_id]);

  const getEmployeeDataById = async (id: string, email: string) => {
    setLoading(true);
    try {
      // const result = await getEmployeeData(id, dispatch);
      const result = await getEmployeeByEmployeeId(id);
      if (result.success === true) {
        setEmployee(result.data[0]);
        setLoading(false);
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
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="p-4 pt-8 sm:p-0 flex flex-col justify-center items-center gap-4 relative"
        >
          {/* <div className='h-80 w-full'><Image src={BgCar} alt='bgcar' className='h-full w-full bg-cover bg-center' /></div> */}
          <div className="p-6 bg-white relative shadow-2xl rounded-xl w-full sm:w-[400px] h-[23rem]">
            {/* <h1 className=' customer-page-title'>My Profile</h1> */}
            <div>
              <div className="absolute left-[20px] top-[-50px]">
                <Image
                  src={"/images/profile.jpg"}
                  alt="Profile"
                  height={100}
                  width={100}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="pt-8 flex flex-col justify-center h-full">
              {employee?.fullName != "undefined" && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="icon h-[37px] w-[37px] rounded-full border flex justify-center items-center">
                    <AiOutlineUser className="text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      {t("name")}
                    </label>
                    <p className="font-medium capitalize text-lg">
                      {employee?.fullName}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div className="icon h-[37px] w-[37px] rounded-full border flex justify-center items-center">
                  <BsTelephone className="text-lg" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-semibold">
                    {t("contactNumber")}
                  </label>
                  <p className="font-medium text-lg">
                    {employee?.contactNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="icon h-[37px] w-[37px] rounded-full border flex justify-center items-center">
                  <MdOutlineMailOutline className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-semibold">
                    {t("email")}
                  </label>
                  <p className="font-medium text-lg">{employee?.email}</p>
                </div>
              </div>

              {/* <Button type="primary" onClick={() => setEdit(true)} className='custom-button mt-2'>Edit</Button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
