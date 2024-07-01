"use client";
import { Button, Divider, Input, InputRef, Select, Space } from "antd";
import React, { useRef, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
let index = 0;

type props = {
  options: { value: string; label: string }[];
  label: string;
  placeholder: string;
  name: string;
  control?: any;
  mode: "single" | "multiple";
  setValue?: any;
};

const SelectCreateField = ({
  options,
  name,
  mode,
  control,
  setValue,
  label,
  placeholder,
}: props) => {
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="w-full">
      <label className="font-medium mb-2 block text-black1" htmlFor="name">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        // defaultValue={
        //     props.defaultValue || (props.mode === "multiple" ? [] : "")
        // }
        render={({ field }) => (
          <Select
            mode={mode === "single" ? undefined : mode}
            className="w-full"
            showSearch
            placeholder={placeholder}
            onChange={(value) => {
              field.onChange(value);
              setValue(name, value);
            }}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    // value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add {name}
                  </Button>
                </Space>
              </>
            )}
            options={options}
          />
        )}
      />
    </div>
  );
};

export default SelectCreateField;
