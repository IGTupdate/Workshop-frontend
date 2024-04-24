"use client";

import { Button, Input, Space, Typography } from "antd";
import React, { useRef } from "react";
import { Controller } from "react-hook-form";

const { Text } = Typography;

export type InputField = {
  name: string;
  label: string;
  placeholder: string;
  type: string; //"text" | "number" | "email"; // Adjust as needed,
  handleButtonClick: any;
};

type Props = InputField & {};

const InputFieldWithButton = (props: Props) => {
  const inputRef = useRef<any>();
  return (
    <div>
      <label className="font-medium mb-2 block text-black1" htmlFor="name">
        {props.label}
      </label>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          ref={inputRef}
          type={props.type}
          placeholder={props.placeholder}
        />
        <Button
          onClick={() => {
            if (
              inputRef.current &&
              inputRef.current.input &&
              inputRef.current.input.value
            ) {
              props.handleButtonClick(inputRef.current.input.value);
              inputRef.current.input.value = "";
              inputRef.current.input.setAttribute("value", "");
            }
          }}
          type="primary"
        >
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
};

export default InputFieldWithButton;
