"use client";

import { Button, Input, Space, Typography } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

const { Text } = Typography;

export type InputField = {
  name: string;
  label: string;
  placeholder: string;
  type: string; //"text" | "number" | "email"; // Adjust as needed,
  handleButtonClick: any;
  suggestions?: string[];
};

type Props = InputField & {};

const InputFieldWithButton = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  const t = useTranslations("CustomerAppointmentBookingConfirmation");

  const [suggestions, setSuggestions] = useState<string[] | undefined>(
    props.suggestions,
  );

  const handleButtonClick = (value: string) => {
    if (value.trim() !== "") {
      // Ensure input value is not empty or whitespace
      props.handleButtonClick(value.trim());
      setInputValue(""); // Clear input value
    }
  };

  const handleSetInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setSuggestions((prv) => {
        return props.suggestions?.filter((el) => {
          return el
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase());
        });
      });
      console.log("fetched");
    };
    // Set a timeout to fetch data after 500ms
    const handler = setTimeout(() => {
      if (inputValue.trim() !== "") {
        fetchData();
      } else {
        setSuggestions(undefined);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  return (
    <div>
      <label className="font-medium mb-2 block text-black1" htmlFor="name">
        {props.label}
      </label>
      <Space.Compact style={{ width: "100%" }}>
        <div className="relative" style={{ width: "100%" }}>
          <Input
            type={props.type}
            placeholder={props.placeholder}
            value={inputValue}
            onChange={handleSetInputValue}
          />

          {suggestions && inputValue.length > 0 && (
            <div className="absolute z-10 bg-white1 rounded-md w-full py-4 shadow border mb-10">
              <ul>
                {suggestions.length > 0 ? (
                  suggestions?.map((el, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setInputValue(el);
                          handleButtonClick(el);
                        }}
                        className="py-1 px-4 hover:bg-gray-100 cursor-pointer "
                      >
                        {el}
                      </li>
                    );
                  })
                ) : (
                  <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer ">
                    No Suggestion Found.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <Button
          onClick={() => {
            handleButtonClick(inputValue);
          }}
          type="primary"
        >
          {t("submitButton")}
        </Button>
      </Space.Compact>
    </div>
  );
};

export default InputFieldWithButton;
