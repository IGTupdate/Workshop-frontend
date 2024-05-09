"use client";
import CustomModel from "@/app/components/Model/CustomModel";
import { Button, Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const Page = () => {
  const [language, setLanguage] = useState("english");
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    setVisible(true);
  };

  const handleOk = () => {
    setLanguage(selectedLanguage);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className=" flex flex-col gap-4 pt-28 pb-32 p-4 sm:p-0 min-h-screen sm:min-h-full">
      <h1 className="text-lg font-bold bg-white p-4 rounded-xl">Settings</h1>
      <div className=" flex flex-wrap gap-4 bg-white p-4 items-center justify-between max-w-full sm:max-w-[80%] w-full mx-auto rounded-xl shadow-xl">
        <h1>Language Selection</h1>
        <Select
          defaultValue={language}
          style={{ width: 200 }}
          onChange={handleLanguageChange}
        >
          <Option value="english">English</Option>
          <Option value="spanish">Spanish</Option>
        </Select>
      </div>
      <CustomModel
        title="Change Language"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="changeLanguage" onClick={() => handleOk()}>
            Change Language
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to change the language to{" "}
          {selectedLanguage.toUpperCase()}?
        </p>
      </CustomModel>
    </div>
  );
};

export default Page;
