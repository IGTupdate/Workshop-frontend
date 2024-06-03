"use client";

import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdCameraAlt, MdCameraswitch, MdFileUpload } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import Image from "next/image";

type Props = {
  addImage: (url: string) => void;
};

const CameraInputField = (props: Props) => {
  // State to manage the camera on/off status
  const [onCamera, setOnCamera] = useState<boolean>(false);
  // State to manage the camera switch between user and environment
  const [switchCamera, setSwitchCamera] = useState<
    "user" | "environment" | undefined
  >("environment");
  // State to store the current image being captured
  const [currentImage, setCurrentImage] = useState<string[]>([]);

  const laptopVideoStreamRef = useRef<MediaStream | null>(null);
  const deviceVideoStreamRef = useRef<MediaStream | null>(null);

  // Function to start the camera
  const handleStartCamera = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        if (device.kind === "videoinput") {
          navigator.mediaDevices
            .getUserMedia({
              video: { deviceId: device.deviceId },
            })
            .then((stream) => {
              console.log("Camera started:", device.label);
              if (device.label.includes("laptop")) {
                laptopVideoStreamRef.current = stream;
              } else {
                deviceVideoStreamRef.current = stream;
              }
              setOnCamera(true);
            })
            .catch((err) => {
              console.error("Error accessing the camera: ", err);
            });
        }
      });
    });
  };

  // close camer
  const closeCamera = () => {
    if (laptopVideoStreamRef.current) {
      laptopVideoStreamRef.current.getTracks().forEach((track) => track.stop());
      laptopVideoStreamRef.current = null;
    }
    if (deviceVideoStreamRef.current) {
      deviceVideoStreamRef.current.getTracks().forEach((track) => track.stop());
      deviceVideoStreamRef.current = null;
    }
    setOnCamera(false);
    setCurrentImage([]);
  };

  // switch camera
  const handleSwitchCamera = () => {
    setSwitchCamera(switchCamera === "user" ? "environment" : "user");
  };

  // Function to handle image change from file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnCamera(true);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setCurrentImage((prev) => [...prev, ...imageUrls]);
    }
  };

  const handleCapture = (dataUri: string) => {
    setCurrentImage((prev) => [...prev, dataUri]);
  };

  const addCurrentImage = (img: string) => {
    setCurrentImage((prv) => {
      return [...prv, img];
    });
  };

  const removeCurrentImage = (index: number) => {
    setCurrentImage((prv) => {
      return prv.filter((img, ind) => index !== ind);
    });
  };

  const saveImage = (index: number) => {
    // save to the server by calling api
    // currentImage[index]

    const savedImageUrl = "url of the iamge";
    props.addImage(savedImageUrl);
    removeCurrentImage(index);
  };

  useEffect(() => {
    return () => {
      closeCamera(); // Ensure camera is stopped when component unmounts
    };
  }, []);

  console.log(onCamera, "oncamera");

  return (
    <div>
      {/* Button to start the camera */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handleStartCamera}
          className="flex justify-center items-center gap-2 h-12 w-12 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
        >
          <MdCameraAlt size={24} />
        </button>
      </div>

      {/* camera container */}
      <div>
        {/* {onCamera && ( */}
        <Modal
          open={onCamera}
          closeIcon={null}
          footer={null}
          width={"100%"}
          styles={{
            content: { backgroundColor: "transparent", padding: "0" }, // turns the Modal transparent
          }}
          wrapClassName="camera-modal"
        >
          {/* Label to upload images from the file system */}
          <div className="absolute left-[35%] translate-x-[-35%] bottom-8 flex justify-center items-center z-10">
            <label className="cursor-pointer">
              <FaImage size={25} color="white" />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Camera component to take pictures */}
          <Camera
            onTakePhoto={handleCapture}
            idealFacingMode={switchCamera} // Use the environment (rear) camera
            isMaxResolution={true}
            isFullscreen={true}
            isImageMirror={true}
          />

          {/* Close camera button */}
          <IoMdClose
            onClick={closeCamera}
            size={30}
            className="absolute right-0 top-0 text-white cursor-pointer"
          />

          {/* Button to switch between front and rear camera */}
          <MdCameraswitch
            onClick={handleSwitchCamera}
            size={30}
            className="absolute right-[35%] translate-x-[-35%] bottom-8 text-white cursor-pointer"
          />

          {/* Display the current captured image */}
          {currentImage && currentImage.length > 0 && (
            <>
              {[...currentImage].reverse().map((item, index) => (
                <div key={index}>
                  <Image
                    src={item || ""}
                    width={100}
                    height={100}
                    alt="image"
                    className="absolute bg-white left-0 top-0 mb-4 w-full h-full mx-auto rounded-lg shadow-md object-cover object-center z-10"
                  />

                  {/* Buttons to add image to gallery or discard it */}
                  <div className="absolute bottom-10 left-1/2 translate-x-[-50%] flex justify-center items-center gap-4 z-10">
                    <div
                      className="h-20 w-20 flex justify-center items-center rounded-full shadow-md bg-[#00000054]"
                      onClick={() => saveImage(index)} // abcd is url
                    >
                      <FiCheck
                        size={30}
                        color="white"
                        className="cursor-pointer"
                      />
                    </div>

                    <div
                      className="h-20 w-20 flex justify-center items-center rounded-full shadow-md bg-[#00000054]"
                      onClick={() => removeCurrentImage(index)}
                    >
                      <IoMdClose
                        size={30}
                        color="white"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </Modal>
        {/* )} */}
      </div>
    </div>
  );
};

export default CameraInputField;
