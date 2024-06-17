"use client";

import InputField from "@/app/components/Input/InputField";
import SelectField from "@/app/components/Input/SelectField";
import TextAreaField from "@/app/components/Input/TextArea";
import {
  TworkOrderAdditionalWorkCreateRequest,
  workOrderAdditionalWorkCreateRequest,
} from "@/app/validators/workorder";
import { Button, Divider, Input } from "antd";
import React, { useEffect } from "react";
import {
  useFieldArray,
  useForm,
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  FieldArrayWithId,
} from "react-hook-form";
import { NEW_ADDITIONAL_WORK } from "../__utils/constant";
import { MdOutlineCancel } from "react-icons/md";

import { TbPlus } from "react-icons/tb";
import { AiFillPlusCircle } from "react-icons/ai";

type Props = {
  control: Control<TworkOrderAdditionalWorkCreateRequest>;
  errors: FieldErrors<TworkOrderAdditionalWorkCreateRequest>;
  setValue: UseFormSetValue<TworkOrderAdditionalWorkCreateRequest>;
  getValues: UseFormGetValues<TworkOrderAdditionalWorkCreateRequest>;
};

const RequestAdditionalWorkFormContainer = (props: Props) => {
  const { control, errors, setValue, getValues } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const addAdditionalTask = () => {
    append(NEW_ADDITIONAL_WORK.tasks);
  };

  const removeAdditionalTask = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <TextAreaField
        name="description"
        control={control}
        error={errors.description ? errors.description.message : ""}
        label="Description"
        placeholder="Request Description"
      />
      <div className="mt-4">
        {fields.map((tasks, index) => {
          return (
            <div key={index} className="mb-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <InputField
                  type="text"
                  control={control}
                  label="Title"
                  placeholder="Enter Task Title"
                  name={`tasks.${index}.title`}
                  error={
                    errors.tasks && errors.tasks[index]?.title?.message
                      ? errors.tasks[index]?.title?.message || ""
                      : ""
                  }
                />

                <SelectField
                  control={control}
                  name={`tasks.${index}.critical`}
                  error={
                    errors.tasks && errors.tasks[index]?.critical?.message
                      ? errors.tasks[index]?.critical?.message || ""
                      : ""
                  }
                  label="Critical Task"
                  mode="single"
                  placeholder={"Critical Task"}
                  setValue={setValue}
                  options={[
                    {
                      value: true,
                      label: "Yes",
                    },
                    {
                      value: false,
                      label: "No",
                    },
                  ]}
                />

                <div className="col-span-2">
                  <TextAreaField
                    control={control}
                    error={
                      errors.tasks && errors.tasks[index]?.description?.message
                        ? errors.tasks[index]?.description?.message || ""
                        : ""
                    }
                    label="Description"
                    name={`tasks.${index}.description`}
                    placeholder="Enter Task Description"
                  />
                </div>

                <div className="col-span-2">
                  <PartsRequiredInTask
                    index={index}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex justify-end items-center mt-4">
                <Button
                  danger
                  type="primary"
                  onClick={(e) => {
                    if (fields?.length > 1) removeAdditionalTask(index);
                  }}
                >
                  Remove
                </Button>
              </div>
              <Divider />
            </div>
          );
        })}

        <div>
          <Button
            onClick={addAdditionalTask}
            className="bg-black1 border hover:outline-black1 hover:border-black1 text-white1 font-medium text-md"
          >
            Add Task
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <InputField
          label="Estimated Cost"
          control={control}
          error={errors.estimatedCost ? errors.estimatedCost.message : ""}
          name="estimatedCost"
          placeholder="Enter Estimated  Cost "
          type="number"
        />
      </div>
    </div>
  );
};

type TPropsPartsRequired = {
  control: Control<TworkOrderAdditionalWorkCreateRequest>;
  errors: FieldErrors<TworkOrderAdditionalWorkCreateRequest>;
  index: number;
};

const PartsRequiredInTask = (props: TPropsPartsRequired) => {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: `tasks.${props.index}.partsRequired`,
  });

  const addPartsRequiredInAdditionaltask = () => {
    append(NEW_ADDITIONAL_WORK.tasks[0].partsRequired);
  };

  const removePartsRequiredInAdditionaltask = (index: number) => {
    remove(index);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium block text-black1">Parts Required</label>

        {/* <div className='flex justify-end mt-2'> */}

        <AiFillPlusCircle
          size={22}
          onClick={addPartsRequiredInAdditionaltask}
          className="cursor-pointer text-slate-950 hover:text-slate-900"
        />
        {/* <Button type='primary' onClick={addPartsRequiredInAdditionaltask}>Add Parts</Button> */}
        {/* </div> */}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <label className="col-span-2 font-medium mb-2 block text-black1">
          Name
        </label>
        <label className=" font-medium mb-2 block text-black1">Price</label>
      </div>

      {fields.map((el, ind) => {
        return (
          <div key={ind} className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <InputField
                control={props.control}
                name={`tasks.${props.index}.partsRequired.${ind}.partName`}
                label=""
                error={""}
                placeholder="Part Name"
                type="text"
              />
            </div>
            <div className="flex justify-between items-center gap-2">
              <InputField
                control={props.control}
                name={`tasks.${props.index}.partsRequired.${ind}.price`}
                label=""
                error={""}
                placeholder="price"
                type="number"
              />
              <button
                onClick={() => {
                  if (fields?.length > 1)
                    removePartsRequiredInAdditionaltask(ind);
                }}
              >
                <MdOutlineCancel size={14} className="text-red-500 mt-2" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestAdditionalWorkFormContainer;
