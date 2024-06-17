"use client";
import { Button } from "antd";
import React, { useState } from "react";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css"; // Import CSS
import { MdCameraAlt, MdFileUpload, MdOutlineCancel } from "react-icons/md";

const CarDashboardAndFule: React.FC = () => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [onCamera, setOnCamera] = useState<boolean>(false);

  const handleCapture = (dataUri: string) => {
    setCapturedImages((prev) => [...prev, dataUri]);
    setOnCamera(false);
  };

  const handleStartCamera = () => {
    setOnCamera(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {onCamera && (
          <Camera
            onTakePhoto={handleCapture}
            idealFacingMode={"environment"} // Use the environment (rear) camera
          />
        )}

        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer">
              <MdFileUpload size={24} />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <button
            onClick={handleStartCamera}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
          >
            <MdCameraAlt size={24} />
          </button>
        </div>

        {capturedImages.length > 0 && (
          <div className="flex flex-wrap justify-center items-center w-full gap-4">
            {capturedImages.map((item, index) => (
              <div key={index} className="relative w-full h-80">
                <img
                  src={item}
                  alt="Captured"
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
