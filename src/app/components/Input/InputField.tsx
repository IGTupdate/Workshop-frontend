import { Input, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const { Text } = Typography;

export type InputField = {
  name: string;
  label: string;
  placeholder: string | undefined;
  type: string; //"text" | "number" | "email"; // Adjust as needed,
  error: string | undefined;
  control: any;
};

type Props = InputField & {
  upperCase?: boolean;
};

const InputField = (props: Props) => {
  return (
    <div>
      <label className="font-medium mb-2 block text-black1" htmlFor="name">
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => {
          return (
            <Input
              type={props.type}
              {...field}
              placeholder={props.placeholder}
              className={`${props.upperCase ? "uppercase" : ""}`}
            />
          );
        }}
      />
      {props.error && <Text type="danger"> {props.error}</Text>}
    </div>
  );
};

export default InputField;
