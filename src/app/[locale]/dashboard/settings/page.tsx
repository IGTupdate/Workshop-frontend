"use client";
import CustomModel from "@/app/components/Model/CustomModel";
import { Button, Select } from "antd";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const { Option } = Select;

const Page = () => {
  const [language, setLanguage] = useState("english");
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localeActive = useLocale();

  console.log(pathname, "router");

  const onChangeLocale = (value: string) => {
    var segments = pathname.split("/");
    var spSegment = segments[1];

    startTransition(() => {
      // Replace the segment containing 'locale' with the new locale value
      var newPathname = pathname.replace(`/${spSegment}/`, `/${value}/`);
      router.replace(newPathname);
    });
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
          defaultValue={localeActive}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChangeLocale}
          options={[
            {
              value: "en",
              label: "English",
            },
            {
              value: "sp",
              label: "Spanish",
            },
          ]}
        />
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
