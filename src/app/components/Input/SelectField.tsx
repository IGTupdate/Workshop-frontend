import { Select, Typography } from "antd";
import React from "react";

const { Text } = Typography;

type Props = {
  mode: "multiple" | "single" | "tags";
  name: string;
  label: string;
  placeholder: string;
  error: string;
  setValue: any;
  defaultValue?: string[] | string;
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
      {props.mode === "single" ? (
        <Select
          allowClear
          showSearch
          className="w-full"
          placeholder={props?.placeholder}
          filterOption={filterOption}
          defaultValue={props.defaultValue || ""}
          options={props.options}
          onChange={(value) => {
            props.setValue(props.name, value);
          }}
        />
      ) : (
        <Select
          mode="multiple"
          placeholder={props.placeholder}
          allowClear
          defaultValue={props.defaultValue || []}
          showSearch
          className="w-full"
          filterOption={filterOption}
          options={props.options}
          onChange={(value) => {
            props.setValue(props.name, value);
          }}
        />
      )}
      {props.error && <Text type="danger"> {props.error}</Text>}
    </div>
  );
};

export default SelectField;
