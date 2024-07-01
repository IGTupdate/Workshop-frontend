"use client";

import InputField from "@/app/components/Input/InputField";
import { TvehicleCheckListCreateYupSchema } from "@/app/validators/vehicle-checklist";
import { Typography } from "antd";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormWatch,
} from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { NEW_VEHICLE_CHECKLIST_CATEGORY } from "../../__utils/constant";
import VehicleCheckListCategoryContainer from "./VehicleCheckListCategoryContainer";
import { CiCirclePlus } from "react-icons/ci";

const { Title } = Typography;

type TVehicleCheckListLevelContainerProps = {
  // removeValueInArray: (name: any, index: number) => void;
  // appendValueInArray: (name: any, index: any) => void;
  index: number;
  control: Control<TvehicleCheckListCreateYupSchema>;
  errors: FieldErrors<TvehicleCheckListCreateYupSchema>;
};

const VehicleCheckListLevelContainer = ({
  // removeValueInArray,
  // appendValueInArray,
  index,
  control,
  errors,
}: TVehicleCheckListLevelContainerProps) => {
  const {
    fields: categoriesFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: `checklist.${index}.categories`,
  });

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <Title level={5}>Categories</Title>

          <button
            type="button"
            className="bg-yellow-400 text-white rounded-full"
            onClick={() => {
              // appendValueInArray(
              //   `checklist.${index}.categories`,
              //   NEW_VEHICLE_CHECKLIST_CATEGORY,
              // );
              appendTask(NEW_VEHICLE_CHECKLIST_CATEGORY);
            }}
          >
            <CiCirclePlus className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {categoriesFields.map((category, _index) => {
            return (
              <div key={_index} className="border p-3 relative">
                <div className="absolute right-0 top-0 ">
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => {
                      removeTask(_index);
                    }}
                  >
                    {/* <MdCancel className="w-6 h-6 text-red-500" /> */}
                    Remove
                  </button>
                </div>
                <div className="mb-4">
                  <InputField
                    control={control}
                    error={""}
                    label="Category Name"
                    name={`checklist[${index}].categories[${_index}].name`}
                    placeholder=""
                    type="text"
                  />
                </div>
                <div>
                  <VehicleCheckListCategoryContainer
                    errors={errors}
                    control={control}
                    index={index}
                    categoryIndex={_index}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VehicleCheckListLevelContainer;
