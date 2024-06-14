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
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { NEW_VEHICLE_CHECKLIST_CATEGORY_TASK } from "../../__utils/constant";

const { Title } = Typography;

type TVehicleCheckListCategoryContainerProps = {
  control: Control<TvehicleCheckListCreateYupSchema>;
  index: number;
  categoryIndex: number;
  errors: FieldErrors<TvehicleCheckListCreateYupSchema>;
};

const VehicleCheckListCategoryContainer = ({
  control,
  index,
  categoryIndex,
}: TVehicleCheckListCategoryContainerProps) => {
  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: `checklist.${index}.categories.${categoryIndex}.tasks`,
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <Title level={5}>Tasks</Title>
        <button
          className="border bg-black rounded-full"
          type="button"
          onClick={() => appendTask(NEW_VEHICLE_CHECKLIST_CATEGORY_TASK)}
        >
          <CiCirclePlus className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {taskFields.map((task, __index) => (
          <div key={task.id} className="mb-4">
            <div className="flex gap-2 justify-between items-end">
              <div className="w-full">
                <InputField
                  name={`checklist[${index}].categories[${categoryIndex}].tasks[${__index}].name`}
                  control={control}
                  error={""}
                  label={`Task ${__index + 1}`}
                  placeholder=""
                  type="text"
                />
              </div>
              <button type="button" onClick={() => removeTask(__index)}>
                <MdCancel className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCheckListCategoryContainer;
