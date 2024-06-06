"use client";

import { TVehicle } from "@/app/types/vehicle";
import {
  TvehicleCreateSchema,
  TVehicleSearchSchema,
  vehicleCreateSchema,
} from "@/app/validators/vehicle";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import InputField from "@/app/components/Input/InputField";
import toast from "react-hot-toast";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import {
  createVehicle,
  getVehicleByCustomerId,
  getVehicles,
} from "@/app/services/operations/appointment/vehicle";
import { useAppDispatch } from "@/app/store/reduxHooks";
import { setVehicleLoading } from "@/app/store/slices/customerVehicleSlice";
import { usePathname, useRouter } from "next/navigation";
import SearchVehicale from "./SearchVehicale";
import { useTranslations } from "next-intl";
import {
  VehicleCreateInputFields,
  vehicleCreateInputFields,
} from "../__utils/vehicle-create-input";
import SelectField from "@/app/components/Input/SelectField";

const { Text } = Typography;

type Props = {
  setVehicleId: React.Dispatch<React.SetStateAction<string>>;
  customer_id?: string;
  customer?: boolean;
  vehicle?: number;
};

const VehicleCreateContainer = (props: Props) => {
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("VehicleCreateInputFields");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(vehicleCreateSchema),
  });

  const onSubmit = async (data: TvehicleCreateSchema) => {
    if (props.customer_id) {
      data.customer_id = props.customer_id;
    }
    setLoading(true);
    try {
      const response = (await createVehicle(data)) as TVehicle;
      // console.log(response);
      if (response) {
        props.setVehicleId(response?._id);
      }
    } catch (err: any) {
      // console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
      if (props?.customer) dispatch(setVehicleLoading(true));
    }
  };

  const handleBack = () => {
    if (props.vehicle == 0) {
      router.push(pathname);
    } else {
      props.setVehicleId("");
    }
  };

  // check vehicle

  const handleCheckVehicle = async (
    data: TvehicleCreateSchema | TVehicleSearchSchema,
  ) => {
    try {
      setValue("registeration_number", data.registeration_number);

      const result = await getVehicles(
        "registeration_number" + "=" + data.registeration_number,
      );

      if (result?.length > 0) {
        let vehicleData = [...result];

        if (props?.customer_id) {
          vehicleData[0]["customer_id"] = props?.customer_id
            ? props?.customer_id
            : "";
        }

        const response = (await createVehicle(vehicleData[0])) as TVehicle;

        props.setVehicleId(response._id);

        dispatch(getVehicleByCustomerId());
      } else {
        setModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(modal, "modal");

  return (
    <>
      {modal ? (
        <SearchVehicale
          handleBack={handleBack}
          handleCheckVehicle={handleCheckVehicle}
        />
      ) : (
        <div className="w-full">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {VehicleCreateInputFields(t).map((field, index) => {
              return (
                <>
                  {field.name !== "vehicle_type" ? (
                    <InputField
                      key={index}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      control={control}
                      upperCase={true}
                      error={
                        errors[field.name as keyof TvehicleCreateSchema]
                          ? errors[field.name as keyof TvehicleCreateSchema]
                              ?.message || ""
                          : ""
                      }
                    />
                  ) : (
                    <SelectField
                      key={index}
                      mode={"single"}
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      error={
                        errors[field.name as keyof TvehicleCreateSchema]
                          ? errors[field.name as keyof TvehicleCreateSchema]
                              ?.message || ""
                          : ""
                      }
                      setValue={setValue}
                      defaultValue={"car"}
                      options={[
                        { label: "CAR", value: "car" },
                        { label: "TRUCK", value: "truck" },
                      ]}
                      control={control}
                    />
                  )}
                </>
              );
            })}
          </div>
          <div className="mt-4 flex justify-start gap-4">
            <Button disabled={loading} onClick={handleBack}>
              {t("backButton")}
            </Button>
            <Button
              type="primary"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              {t("saveButton")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleCreateContainer;
