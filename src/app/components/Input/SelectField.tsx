import { Select, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const { Text } = Typography;

type Props = {
  mode: "multiple" | "single" | "tags";
  name: string;
  label: string;
  placeholder: string;
  error: string;
  setValue: any;
  defaultValue?: string[] | string;
  control: any; // ensure this prop is passed to use with Controller
  options: {
    value: any;
    label: string;
  }[];
};

const SelectField = (props: Props) => {
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <label className="font-medium mb-2 block text-black1" htmlFor="name">
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={
          props.defaultValue || (props.mode === "multiple" ? [] : "")
        }
        render={({ field }) => (
          <Select
            {...field}
            mode={props.mode === "single" ? undefined : props.mode}
            allowClear
            showSearch
            className="w-full"
            placeholder={props.placeholder}
            filterOption={filterOption}
            options={props.options}
            onChange={(value) => {
              field.onChange(value);
              props.setValue(props.name, value);
            }}
          />
        )}
      />
      {props.error && <Text type="danger"> {props.error}</Text>}
    </div>
  );
};

export default SelectField;
