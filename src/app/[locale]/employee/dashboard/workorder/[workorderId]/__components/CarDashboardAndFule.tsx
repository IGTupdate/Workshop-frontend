"use client";
import { Image, Input, Select, Typography } from "antd";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import CustomCamera from "@/app/components/Camera/Camera";

const CarDashboardAndFule: React.FC = () => {
  // State to store captured images
  const [galleryImage, setGalleryImage] = useState<string[]>([]);
  // State to manage the camera on/off status
  const [onCamera, setOnCamera] = useState<boolean>(false);
  // State to manage the camera modal open/close status
  const [open, setOpen] = useState<boolean>(false);
  // State to manage the camera switch between user and environment
  const [switchCamera, setSwitchCamera] = useState<
    "user" | "environment" | undefined
  >("environment");
  // State to manage the visibility of the current image
  const [showCurrentImage, setShowCurrentImage] = useState(false);
  // State to store the current image being captured
  const [currentImage, setCurrentImage] = useState<string[]>([]);
  // State to store the value of the input field
  const [value, setValue] = useState("");
  // State to manage the input error message
  const [inputError, setInputError] = useState("");

  // Function to handle changes in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setValue(inputValue);
      setInputError("");
    } else {
      setInputError("Must be a number");
    }
  };

  // Function to handle the blur event on the input field
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    setValue(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  // Function to handle image capture from the camera
  const handleCapture = (dataUri: string) => {
    setCurrentImage((prev) => [...prev, dataUri]);
    setShowCurrentImage(true);
  };

  // Function to add image to the gallery
  const addImageToGallery = (value: boolean, image: string) => {
    if (currentImage.length <= 1) {
      setOpen(false);
      setOnCamera(false);
    }

    if (value) {
      setGalleryImage((prev) => [...prev, image]);
    }
    setCurrentImage((prev) => prev.filter((item) => item !== image));
  };

  // Function to start the camera
  const handleStartCamera = () => {
    setOnCamera(true);
    setOpen(true);
  };

  // Function to handle image change from file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnCamera(true);
    setOpen(true);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setCurrentImage((prev) => [...prev, ...imageUrls]);
      setShowCurrentImage(true);
    }
  };

  // Function to remove image from the gallery
  const removeImage = (index: number) => {
    setGalleryImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div className="flex flex-wrap justify-center items-center w-full gap-10">
          <div>
            <div>
              <h3 className="text-lg font-bold">Odometer Reading</h3>
              <p>Please Enter Current Meter Reading</p>
            </div>

            <div className="flex gap-4 items-end my-4">
              {/* CustomCamera component for capturing images */}
              <CustomCamera
                open={open}
                onCamera={onCamera}
                handleCapture={handleCapture}
                switchCamera={switchCamera}
                setOnCamera={setOnCamera}
                setSwitchCamera={setSwitchCamera}
                showCurrentImage={showCurrentImage}
                currentImage={currentImage}
                addImageToGallery={addImageToGallery}
                handleImageChange={handleImageChange}
                handleStartCamera={handleStartCamera}
              />

              <div className="flex justify-start flex-col relative">
                <Typography.Title className="text-start" level={5}>
                  Odometer Reading
                </Typography.Title>
                <Input
                  maxLength={7}
                  placeholder="Enter Odometer Reading"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={value}
                  style={{ width: 160 }}
                />
                {inputError && (
                  <p className="absolute bottom-[-25px] left-0 text-red-500">
                    {inputError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <h3 className="text-lg font-bold">Fuel Reading</h3>
              <p>Please Select Current Fuel Reading</p>
            </div>

            <div className="flex gap-4 items-end my-4">
              {/* CustomCamera component for capturing images */}
              <CustomCamera
                open={open}
                onCamera={onCamera}
                handleCapture={handleCapture}
                switchCamera={switchCamera}
                setOnCamera={setOnCamera}
                setSwitchCamera={setSwitchCamera}
                showCurrentImage={showCurrentImage}
                currentImage={currentImage}
                addImageToGallery={addImageToGallery}
                handleImageChange={handleImageChange}
                handleStartCamera={handleStartCamera}
              />

              <div className="flex justify-start flex-col relative">
                <Typography.Title className="text-start" level={5}>
                  Fuel Range
                </Typography.Title>
                <Select
                  placeholder={"Select Fule Range"}
                  style={{ width: 160, textAlign: "start" }}
                  onChange={handleSelect}
                  options={[
                    { value: "0-25", label: "0 To 25 %" },
                    { value: "25-50", label: "25 To 50 %" },
                    { value: "50-75", label: "50 To 75 %" },
                    { value: "75-100", label: "75 To 100 %" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display captured images */}
        {galleryImage.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {galleryImage.map((item, index) => (
              <div key={index} className="relative">
                <Image
                  height={"100%"}
                  width={"100%"}
                  src={item}
                  className="rounded-md"
                  alt={`Gallery Image ${index + 1}`}
                />
                <div className="absolute right-[-12px] top-[-12px] h-12 w-12 flex justify-center items-center rounded-full shadow-topDivSmall cursor-pointer">
                  <IoClose
                    onClick={() => removeImage(index)}
                    size={25}
                    color="white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CarDashboardAndFule;
