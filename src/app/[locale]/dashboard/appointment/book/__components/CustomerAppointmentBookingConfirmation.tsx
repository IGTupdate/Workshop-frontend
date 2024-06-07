"use client";
import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import InputFieldWithButton from "@/app/components/Input/InputFieldWithButton";
import Loader from "@/app/components/Loader";
import CustomModal from "@/app/components/Model/CustomModel";
import Watermark from "@/app/components/Text/WatermarkText";
import {
  bookAppointment,
  getAppointMentBookInitData,
} from "@/app/services/operations/appointment/appointment";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setAppointmentLoading } from "@/app/store/slices/customerAppointmentSlice";
import { TAppointmentBook } from "@/app/types/appointment";
import { TSlot } from "@/app/types/calender";
import { TServicePlans } from "@/app/types/service";
import { TVehicle } from "@/app/types/vehicle";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { convertToLocaleDateAndWeekday } from "@/app/utils/dateFormatter";
import { PriceCalculator, removeQueryParams } from "@/app/utils/helper";
import { Button, Divider, Typography } from "antd";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";

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
    contactNumber: string;
    fullName: string;
    email: string;
  };
  servicePlans: TServicePlans[] | [];
  service_description: string[] | [];
  slot_details: TSlot | null;
};

const CustomerAppointmentBookingConfirmation = (props: Props) => {
  const [discountPrice, setDiscountPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userRole = useAppSelector((state) => state.auth.authData.role);
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan,
  );

  const t = useTranslations("CustomerAppointmentBookingConfirmation");
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
            props.appointmentBookingData,
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
      dispatch(getAllServicePlans(props.appointmentBookingData.vehicle_id));
    }
    // console.log(servicePlansData);
    let plans: TServicePlans[] = [];
    plans = servicePlansData.filter((plan) =>
      props.appointmentBookingData?.service_plans?.includes(plan._id as never),
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
      setVisible(false);
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
        remark as never,
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
          (ele) => ele !== remark,
        ),
      };
    });
  };

  let total = 0;
  let tax = 18;

  useEffect(() => {
    for (
      let i = 0;
      i < appointmentBookingConfirmationData?.servicePlans?.length;
      i++
    ) {
      total =
        total + appointmentBookingConfirmationData?.servicePlans[i]?.price;
    }

    const totalRate = total * 1.3;

    setDiscountPrice(totalRate - total);
    setAmount(total);
    setTotalAmount(total + total * (tax / 100));
  }, [appointmentBookingConfirmationData.servicePlans]);

  function parseFloat(discountPrice: number) {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {loading ? (
        <div
          style={{ height: "calc(100vh - 400px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>{t("customerHeading")}</Title>
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
                title={t("name")}
                content={
                  appointmentBookingConfirmationData.customer?.fullName || "-"
                }
              />
              <DescriptionItem
                title={t("phone")}
                content={
                  appointmentBookingConfirmationData.customer?.contactNumber ||
                  "-"
                }
              />
              <DescriptionItem
                title={t("email")}
                content={
                  appointmentBookingConfirmationData.customer?.email || "-"
                }
              />
            </div>
          </div>
          <Divider />
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>{t("vehicleHeading")}</Title>
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
                title={t("registrationLabel")}
                content={
                  appointmentBookingConfirmationData.vehicle
                    ?.registeration_number || "-"
                }
              />
              <DescriptionItem
                title={t("vinLabel")}
                content={appointmentBookingConfirmationData.vehicle?.vin || "-"}
              />
              <DescriptionItem
                title={t("makeLabel")}
                content={
                  appointmentBookingConfirmationData.vehicle?.vehicle_make ||
                  "-"
                }
              />
              <DescriptionItem
                title={t("modelLabel")}
                content={
                  appointmentBookingConfirmationData.vehicle?.vehicle_model ||
                  "-"
                }
              />
              <DescriptionItem
                title={t("ownerLabel")}
                content={
                  appointmentBookingConfirmationData.vehicle?.owner || "-"
                }
              />
            </div>
          </div>
          <Divider />
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>{t("serviceHeading")}</Title>
              <div className="flex justify-end">
                <Button type="link" onClick={() => handleBack()}>
                  <LiaEdit className="text-xl font-bold cursor-pointer" />
                </Button>
              </div>
            </div>
            <div className="">
              {/* {appointmentBookingConfirmationData.servicePlans?.length > 0 ? (
                appointmentBookingConfirmationData.servicePlans.map(
                  (plan, i) => <ServicePlans key={i} plan={plan} />,
                )
              ) : (
                <div className="relative">
                  <Watermark text="No Plans Selected" />
                </div>
              )} */}

              {appointmentBookingConfirmationData.servicePlans?.length > 0 ? (
                <div className=" bg-white p-4 my-4">
                  {appointmentBookingConfirmationData.servicePlans?.length >
                    0 &&
                    appointmentBookingConfirmationData.servicePlans.map(
                      (plan, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center mb-4"
                        >
                          <p className="font-bold">{plan.name}</p>
                          <p className="text-lg font-bold">
                            $ {PriceCalculator(plan.price)}
                          </p>
                        </div>
                      ),
                    )}

                  <div className="border-t py-4">
                    <div className=" flex justify-between items-center">
                      <p className="font-bold">{t("discount")}</p>
                      <p className="text-lg font-bold">
                        - $ {discountPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className=" flex justify-between items-center">
                      <p className="font-bold">{t("discountPrice")}</p>
                      <p className="text-lg font-bold"> $ {amount}</p>
                    </div>
                    <div className=" flex justify-between items-center">
                      <p className="font-bold">{t("tax")}</p>
                      <p className="text-lg font-bold">{tax} %</p>
                    </div>
                  </div>
                  <div className="border-t flex justify-between items-center pt-4">
                    <p className="font-bold">{t("plansTotal")}</p>
                    <p className="text-lg font-bold">
                      $ {totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Watermark text={t("watermark")} />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div>
            <div className="grid grid-cols-2">
              <Title level={5}>{t("slotHeading")}</Title>
              <div className="flex justify-end">
                <Button type="link" onClick={changeSlotDetails}>
                  <LiaEdit className="text-xl font-bold cursor-pointer" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <DescriptionItem
                title={t("start")}
                content={
                  appointmentBookingConfirmationData.slot_details?.start_time
                    ? dayjs(
                        appointmentBookingConfirmationData.slot_details
                          ?.start_time,
                      ).format("dddd, MMMM D, YYYY h:mm A")
                    : "-"
                }
              />
              <DescriptionItem
                title={t("end")}
                content={
                  appointmentBookingConfirmationData.slot_details?.end_time
                    ? dayjs(
                        appointmentBookingConfirmationData.slot_details
                          ?.end_time,
                      ).format("dddd, MMMM D, YYYY h:mm A")
                    : "-"
                }
              />
            </div>
          </div>
          <Divider />
          <div>
            <div className="flex flex-col flex-wrap justify-between items-start gap-2 sm:gap-0">
              <div className="w-full">
                <InputFieldWithButton
                  name="desc"
                  label={t("remarks")}
                  placeholder={t("description")}
                  type="text"
                  handleButtonClick={addRemarks}
                />
              </div>

              <div className="w-full mt-4">
                {props?.appointmentBookingData?.service_description?.map(
                  (ele, i) => (
                    <p
                      key={i}
                      className="flex justify-between items-center capitalize gap-3 pe-4"
                    >
                      {ele}

                      <MdOutlineCancel
                        onClick={() => removeRemarks(ele)}
                        size={14}
                        className="text-red-500"
                      />
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button onClick={() => handleBack()}>{t("backButton")} </Button>
            <Button
              onClick={() => setVisible(true)}
              className="bg-black border-none hover:shadow-lg text-white"
            >
              {t("bookButton")}
            </Button>
          </div>
        </div>
      )}

      <CustomModal
        title={t("modalText")}
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
            {t("confirm")}
          </Button>,
        ]}
      >
        <div>
          <div className="flex justify-between items">
            <p className="font-medium text-base">{t("modalHeading")}</p>
            <p>
              {
                appointmentBookingConfirmationData?.vehicle
                  ?.registeration_number
              }
            </p>
          </div>
          <div className="flex justify-between items mt-2">
            <p className="font-medium text-base">{t("slotTime")}</p>
            {appointmentBookingConfirmationData?.slot_details?.start_time && (
              <p>
                {dayjs(
                  appointmentBookingConfirmationData.slot_details.start_time,
                ).format("dddd, MMMM D, YYYY h:mm A")}
              </p>
            )}
          </div>

          <div className="my-4">
            <h2 className="font-medium text-base">{t("selectedPlans")}</h2>

            <div className="flex flex-wrap items-center gap-4">
              {appointmentBookingConfirmationData?.servicePlans?.map(
                (plan, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <h3 className="font-medium text-nowrap" key={index}>
                    {plan.name}
                  </h3>
                ),
              )}
            </div>
          </div>

          <div className="flex justify-between items">
            <p className="font-medium text-base">{t("total")}</p>
            <p className="font-bold">$ {PriceCalculator(totalAmount)}</p>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default CustomerAppointmentBookingConfirmation;
