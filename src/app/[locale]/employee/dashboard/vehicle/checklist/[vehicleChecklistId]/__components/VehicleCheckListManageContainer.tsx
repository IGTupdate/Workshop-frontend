"use client";

import InputField from "@/app/components/Input/InputField";
import {
  TvehicleCheckListCreateYupSchema,
  vehicleCheckListCreateYupSchema,
} from "@/app/validators/vehicle-checklist";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Collapse, CollapseProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { NEW_VEHICLE_CHECKLIST } from "../../__utils/constant";
// import VehicleCheckListLevelContainer from "./VehicleCheckListLevelContainer";
import SelectField from "@/app/components/Input/SelectField";
import { vehicleTypeEnum } from "@/app/utils/constants/checklistenum";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { createVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { useRouter } from "next/navigation";
import VehicleCheckListLevelContainer from "../../create/__components/VehicleCheckListLevelContainer";
import { IVehicleChecklist } from "@/app/types/checklist";

const { Title } = Typography;

type Props = {
  handleOnSave: (data: TvehicleCheckListCreateYupSchema) => void;
  defaultData?: IVehicleChecklist;
};

const VehicleCheckListManageContainer = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [collapsableItem, setCollapsableItem] = useState<
    CollapseProps["items"]
  >([]);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      checklist: [NEW_VEHICLE_CHECKLIST],
      vehicle: {
        brand: "",
        model: "",
        type: "",
      },
    },
    resolver: yupResolver(vehicleCheckListCreateYupSchema),
  });

  const { fields: checklistFields, append: appendChecklist } = useFieldArray({
    control,
    name: "checklist",
  });

  useEffect(() => {
    if (props.defaultData?.checklist) {
      setValue("checklist", props.defaultData.checklist);
    }
    if (props.defaultData?.vehicle) {
      setValue("vehicle", props.defaultData.vehicle);
    }
  }, [props.defaultData]);

  useEffect(() => {
    setCollapsableItem(() => {
      return checklistFields.map((el, index) => {
        return {
          key: index,
          label: (
            <div className="flex justify-between items-center">
              <h2>Level {index + 1}</h2>
              <button
                type="button"
                className="absolute z-10 right-0"
                onClick={() => {
                  removeValueInArray("checklist", index);
                }}
              >
                <MdDeleteOutline className="text-red-500 w-6 h-6" />
              </button>
            </div>
          ),
          children: (
            <VehicleCheckListLevelContainer
              errors={errors}
              index={index}
              // appendValueInArray={appendValueInArray}
              // removeValueInArray={removeValueInArray}
              control={control}
            />
          ),
        };
      });
    });
  }, [checklistFields]);

  const appendValueInArray = (name: any, data: any) => {
    const currentValue = getValues(name) || [];
    setValue(name, [...currentValue, data]);
  };

  const removeValueInArray = (name: any, index: number) => {
    const currentValue = getValues(name) || [];
    if (currentValue.length <= 1) return;
    const updatedValue = currentValue.filter(
      (_: any, ind: number) => ind !== index,
    );
    setValue(name, updatedValue);
  };

  const onSubmit = async (data: TvehicleCheckListCreateYupSchema) => {
    console.log(data);

    try {
      setLoading(true);
      await props.handleOnSave(data);
      // const response = await createVehicleCheckList(data)
      // toast.success(response.message)
      // console.log(response);
      // router.push(`/employee/dashboard/vehicle/checklist`);
    } catch (err: any) {
      toast.error(COMMON_ERROR);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* vehicle type */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Title level={5}>Checklist Vehicle Detail</Title>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <SelectField
                name="vehicle.type"
                label="Vehicle Type"
                error=""
                mode="single"
                options={[
                  { label: "Car", value: vehicleTypeEnum.CAR },
                  { label: "Truch", value: vehicleTypeEnum.TRUCK },
                ]}
                placeholder="Select Type"
                setValue={setValue}
                control={control}
                defaultValue={""}
              />
            </div>

            <div>
              <InputField
                name="vehicle.brand"
                control={control}
                error={errors.vehicle?.brand?.message || ""}
                label="Vehicle Brand"
                placeholder="Toyato"
                type="text"
              />
            </div>

            <div>
              <InputField
                name="vehicle.model"
                control={control}
                error={errors.vehicle?.model?.message || ""}
                label="Vehicle Model"
                placeholder="ZX10"
                type="text"
              />
            </div>

            <div>
              <InputField
                name="vehicle.year"
                control={control}
                error={errors.vehicle?.year?.message || ""}
                label="Vehicle Year"
                placeholder="2010"
                type="number"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <Title level={5}>CheckList : </Title>

            <div>
              <button
                type="button"
                className="bg-yellow-400 text-white rounded-full"
                onClick={() => {
                  appendValueInArray("checklist", NEW_VEHICLE_CHECKLIST);
                }}
              >
                <CiCirclePlus className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <Collapse items={collapsableItem} defaultActiveKey={["1"]} />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            loading={loading}
            disabled={loading}
            htmlType="submit"
            type="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleCheckListManageContainer;
