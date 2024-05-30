"use client";
import { Input, Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import CustomCamera from "@/app/components/Camera/Camera";

const CarDashboardAndFule: React.FC = () => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [onCamera, setOnCamera] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [switchCamera, setSwitchCamera] = useState<
    "user" | "environment" | undefined
  >("environment");
  const [showCurrentImage, setShowCurrentImage] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null | undefined>(
    "",
  );
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setValue(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    setValue(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  const handleCapture = (dataUri: string) => {
    setCurrentImage(dataUri);
    setShowCurrentImage(true);
  };

  const AddImageOnGallery = (value: boolean) => {
    if (value) {
      if (currentImage) {
        setCapturedImages((prev) => [...prev, currentImage]);
      }
    }
    setShowCurrentImage(false);
  };

  const handleStartCamera = () => {
    setOnCamera(true);
    setOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(false);
    setOnCamera(false);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setCapturedImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center space-y-4">
        <div>
          <h3 className="text-lg font-bold">Odometer & Fuel Reading</h3>
          <p>Please Enter Current Meter & Fuel Reading</p>
        </div>

        <CustomCamera
          open={open}
          onCamera={onCamera}
          handleCapture={handleCapture}
          switchCamera={switchCamera}
          setOnCamera={setOnCamera}
          setSwitchCamera={setSwitchCamera}
          showCurrentImage={showCurrentImage}
          currentImage={currentImage}
          AddImageOnGallery={AddImageOnGallery}
          handleImageChange={handleImageChange}
          handleStartCamera={handleStartCamera}
        />

        <div className="flex justify-start flex-col">
          <Tooltip
            trigger={["focus"]}
            title={"Odometer Reading"}
            placement="topLeft"
            overlayClassName="numeric-input"
          >
            <Input
              maxLength={16}
              placeholder="Enter Odometer Reading"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Tooltip>
        </div>

        {capturedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {capturedImages.map((item, index) => (
              <div key={index} className="relative">
                <Image
                  src={item}
                  alt="Captured"
                  width={100}
                  height={100}
                  className="mb-4 w-full h-full mx-auto rounded-lg shadow-md object-cover object-center"
                />
                <MdOutlineCancel
                  onClick={() => removeImage(index)}
                  size={25}
                  className="absolute right-[-12px] top-[-12px] text-red-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CarDashboardAndFule;
