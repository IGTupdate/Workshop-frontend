"use client";

import { Button, Input, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<any>();


  const handleButtonClick = () => {
    if (inputValue.trim() !== "") { // Ensure input value is not empty or whitespace
      props.handleButtonClick(inputValue.trim());
      setInputValue(""); // Clear input value
    }
  };
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          onClick={handleButtonClick}
          type="primary"
        >
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
};

export default InputFieldWithButton;
