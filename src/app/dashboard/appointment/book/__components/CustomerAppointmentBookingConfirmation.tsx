"use client";
import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import InputFieldWithButton from "@/app/components/Input/InputFieldWithButton";
import Loader from "@/app/components/Loader";
import {
  bookAppointment,
  getAppointMentBookInitData,
} from "@/app/services/operations/appointment/appointment";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { TAppointmentBook } from "@/app/types/appointment";
import { TSlot } from "@/app/types/calender";
import { TServicePlans } from "@/app/types/service";
import { TVehicle } from "@/app/types/vehicle";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { removeQueryParams } from "@/app/utils/helper";
import { Button, Divider, Typography } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ServicePlans from "./ServicePlans";
import { LiaEdit } from "react-icons/lia";
import { setAppointmentLoading } from "@/app/store/slices/customerAppointmentSlice";
import Watermark from "@/app/components/Text/WatermarkText";
import CustomModal from "@/app/components/Model/CustomModel";

const { Title } = Typography;

type Props = {
  appointmentBookingData: TAppointmentBook;
  setAppointmentBookingData: React.Dispatch<
    React.SetStateAction<TAppointmentBook>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

type TappointmentBookingConfirmationData = {
  vehicle: null | TVehicle;
  customer: null | {
    phone: string;
    name: string;
    email: string;
  };
  servicePlans: TServicePlans[] | [];
  service_description: string[] | [];
  slot_details: TSlot | null;
};

const CustomerAppointmentBookingConfirmation = (props: Props) => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userRole = useAppSelector((state) => state.auth.authData.role);
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan
  );

  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [
    appointmentBookingConfirmationData,
    setAppointmentBookingConfirmationData,
  ] = useState<TappointmentBookingConfirmationData>({
    vehicle: null,
    customer: null,
    servicePlans: [],
    service_description: [],
    slot_details: null,
  });

  useEffect(() => {
    setLoading(true);

    if (
      props.appointmentBookingData.calender_id &&
      props.appointmentBookingData.slot_id &&
      props.appointmentBookingData.customer_id &&
      props.appointmentBookingData.vehicle_id
    ) {
      (async function () {
        try {
          const responseData = await getAppointMentBookInitData(
            props.appointmentBookingData
          );
          setAppointmentBookingConfirmationData((prev) => ({
            ...prev,
            ...responseData,
          }));
          setLoading(false);
        } catch (err) {
          // console.log(err);
        }
      })();
    }
  }, [
    props.appointmentBookingData.calender_id,
    props.appointmentBookingData.slot_id,
    props.appointmentBookingData.customer_id,
    props.appointmentBookingData.vehicle_id,
  ]);

  useEffect(() => {
    if (servicePlansLoading) {
      dispatch(getAllServicePlans());
    }
    // console.log(servicePlansData);
    let plans: TServicePlans[] = [];
    plans = Object.values(servicePlansData)
      .flatMap((category) => category.plans)
      .filter((plan) =>
        props.appointmentBookingData?.service_plans?.includes(plan._id as never)
      );
    // console.log(plans)

    setAppointmentBookingConfirmationData((prev) => ({
      ...prev,
      servicePlans: plans,
    }));
  }, [servicePlansLoading, servicePlansData]);

  const handleBack = () => {
    props.setAppointmentBookingData((prev) => ({
      ...prev,
      showServicePlans: true,
    }));
  };

  const handleBookAppointment = async () => {
    try {
      setLoading(true);
      const {
        slot_id,
        calender_id,
        customer_id,
        vehicle_id,
        service_plans,
        service_description,
      } = props.appointmentBookingData;
      const newData = {
        slot_id,
        calender_id,
        customer_id,
        vehicle_id,
        service_plans,
        service_description,
      };
      const response = await bookAppointment(newData);
      // console.log(response);
      toast.success(response?.message);
      localStorage.removeItem("appointmentBookingData");
      dispatch(setAppointmentLoading(true));
      userRole === "customer"
        ? router.push(`/dashboard/appointment/${response.data._id}`)
        : router.push(`/employee/dashboard/appointment/${response.data._id}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const changeSlotDetails = () => {
    let queryParams = removeQueryParams(searchParams.toString(), "slot_id");
    queryParams = removeQueryParams(queryParams, "calender_id");
    router.push(`${pathname}?${queryParams}`);
  };

  const changeAppointmentBookingData = (name: string, value: string) => {
    props.setAppointmentBookingData((prv) => {
      return {
        ...prv,
        [name]: value,
      };
    });
  };

  const addRemarks = (remark: string) => {
    if (
      props.appointmentBookingData?.service_description?.includes(
        remark as never
      )
    )
      return;
    props.setAppointmentBookingData((prev) => {
      return {
        ...prev,
        service_description: [...(prev.service_description || []), remark],
      };
    });
  };

  const removeRemarks = (remark: string) => {
    props.setAppointmentBookingData((prev) => {
      return {
        ...prev,
        service_description: prev?.service_description?.filter(
          (ele) => ele !== remark
        ),
      };
    });
  };
  let total = 0;

  useEffect(() => {
    for (
      let i = 0;
      i < appointmentBookingConfirmationData?.servicePlans?.length;
      i++
    ) {
      total =
        total + appointmentBookingConfirmationData?.servicePlans[i]?.price;
    }

    setAmount(total);
  }, [appointmentBookingConfirmationData.servicePlans]);

  // console.log(
  //   appointmentBookingConfirmationData.servicePlans,
  //   "appointmentBookingConfirmationData.servicePlans"
  // );

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>Customer Details</Title>
              <div className="flex justify-end">
                <Button
                  type="link"
                  onClick={() => router.push("/dashboard/profile")}
                >
                  <LiaEdit className="text-xl font-bold cursor-pointer" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <DescriptionItem
                title="Name"
                content={
                  appointmentBookingConfirmationData.customer?.name || "-"
                }
              />
              <DescriptionItem
                title="Phone"
                content={
                  appointmentBookingConfirmationData.customer?.phone || "-"
                }
              />
              <DescriptionItem
                title="Email"
                content={
                  appointmentBookingConfirmationData.customer?.email || "-"
                }
              />
            </div>
          </div>
          <Divider />
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>Vehicle Details</Title>
              <div className="flex justify-end">
                <Button
                  type="link"
                  onClick={() => {
                    changeAppointmentBookingData("vehicle_id", "");
                  }}
                >
                  <LiaEdit className="text-xl font-bold cursor-pointer" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <DescriptionItem
                title="Registeration Number"
                content={
                  appointmentBookingConfirmationData.vehicle
                    ?.registeration_number || "-"
                }
              />
              <DescriptionItem
                title="Vin"
                content={appointmentBookingConfirmationData.vehicle?.vin || "-"}
              />
              <DescriptionItem
                title="Make"
                content={
                  appointmentBookingConfirmationData.vehicle?.vehicle_make ||
                  "-"
                }
              />
              <DescriptionItem
                title="Model"
                content={
                  appointmentBookingConfirmationData.vehicle?.vehicle_model ||
                  "-"
                }
              />
              <DescriptionItem
                title="Owner"
                content={
                  appointmentBookingConfirmationData.vehicle?.owner || "-"
                }
              />
            </div>
          </div>
          <Divider />
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>Service Plan Details</Title>
              <div className="flex justify-end">
                <Button type="link" onClick={() => handleBack()}>
                  <LiaEdit className="text-xl font-bold cursor-pointer" />
                </Button>
              </div>
            </div>
            <div className="">
              {appointmentBookingConfirmationData.servicePlans?.length > 0 ? (
                appointmentBookingConfirmationData.servicePlans.map(
                  (plan, i) => <ServicePlans key={i} plan={plan} />
                )
              ) : (
                <div className="relative">
                  <Watermark text="No Plans Selected" />
                </div>
              )}

              {appointmentBookingConfirmationData.servicePlans?.length > 0 && (
                <div className=" bg-white p-4 my-4">
                  {appointmentBookingConfirmationData.servicePlans?.length >
                    0 &&
                    appointmentBookingConfirmationData.servicePlans.map(
                      (plan, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center"
                        >
                          <p className="font-semibold">{plan.name}</p>
                          <p className="text-lg font-semibold">
                            $ {plan.price}
                          </p>
                        </div>
                      )
                    )}
                  <div className="border-t flex justify-between items-center mt-4">
                    <p className="font-bold">Service plans total</p>
                    <p className="text-lg font-bold">$ {amount}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>Slot Details</Title>
              <div className="flex justify-end">
                <Button type="link" onClick={changeSlotDetails}>
                  <LiaEdit className="text-xl font-bold cursor-pointer" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <DescriptionItem
                title="Start"
                content={
                  appointmentBookingConfirmationData.slot_details?.start_time
                    ? new Date(
                        appointmentBookingConfirmationData.slot_details?.start_time
                      ).toLocaleString("en-GB")
                    : "-"
                }
              />
              <DescriptionItem
                title="End"
                content={
                  appointmentBookingConfirmationData.slot_details?.end_time
                    ? new Date(
                        appointmentBookingConfirmationData.slot_details?.end_time
                      ).toLocaleString("en-GB")
                    : "-"
                }
              />
            </div>
          </div>
          <Divider />
          <div>
            <div className="flex flex-wrap justify-between items-start gap-2 sm:gap-0 flex-col-reverse sm:flex-row">
              <div className="w-full sm:w-1/2">
                <Title level={5}>Remarks</Title>

                {props?.appointmentBookingData?.service_description?.map(
                  (ele, i) => (
                    <p
                      key={i}
                      className="flex justify-between items-center capitalize gap-3 pe-4"
                    >
                      {ele}
                      <button
                        className="outline-0 rounded-full h-[16px] w-[15px] flex justify-center items-center text-red-500 border border-red-500 text-[10px]"
                        onClick={() => removeRemarks(ele)}
                      >
                        x
                      </button>
                    </p>
                  )
                )}
              </div>
              <div className="w-full sm:w-1/2">
              <InputFieldWithButton
                name="desc"
                label="Add Description"
                placeholder="Add Description"
                type="text"
                handleButtonClick={addRemarks}
              />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button onClick={() => handleBack()}>Back </Button>
            <Button
              onClick={() => setVisible(true)}
              className="bg-black border-none hover:shadow-lg text-white"
            >
              Book
            </Button>
          </div>
        </div>
      )}

      <CustomModal
        title="Confirm Appointment"
        open={visible}
        onCancel={handleCancel}
        footer={[
          // <Button key="cancel" onClick={() => handleCancel()}>
          //   Cancel
          // </Button>,
          <Button
            type="primary"
            key="confirm"
            onClick={() => handleBookAppointment()}
          >
            Confirm
          </Button>,
        ]}
      >
        <p>Confirm Appointment</p>
      </CustomModal>
    </>
  );
};

export default CustomerAppointmentBookingConfirmation;
