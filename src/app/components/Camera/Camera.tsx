import { Modal } from "antd";
import Image from "next/image";
import React from "react";
import { FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdCameraAlt, MdCameraswitch, MdFileUpload } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css"; // Import CSS

type Props = {
  open: boolean;
  onCamera: boolean;
  handleCapture: (dataUri: string) => void;
  switchCamera: "user" | "environment" | undefined;
  setOnCamera: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchCamera: React.Dispatch<
    React.SetStateAction<"user" | "environment" | undefined>
  >;
  showCurrentImage: boolean;
  currentImage: string[];
  addImageToGallery: (value: boolean, image: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartCamera: () => void;
};

const CustomCamera = ({
  open,
  onCamera,
  handleCapture,
  switchCamera,
  setOnCamera,
  setSwitchCamera,
  showCurrentImage,
  currentImage,
  addImageToGallery,
  handleImageChange,
  handleStartCamera,
}: Props) => {
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

      {onCamera && (
        <Modal
          open={open}
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
            isImageMirror={true}
            isFullscreen={true}
            imageType={"png"}
          />

          {/* Close camera button */}
          <IoMdClose
            onClick={() => setOnCamera(false)}
            size={30}
            className="absolute right-0 top-0 text-white cursor-pointer"
          />

          {/* Button to switch between front and rear camera */}
          <MdCameraswitch
            onClick={() =>
              setSwitchCamera(switchCamera === "user" ? "environment" : "user")
            }
            size={30}
            className="absolute right-[35%] translate-x-[-35%] bottom-8 text-white cursor-pointer"
          />

          {/* Display the current captured image */}
          {showCurrentImage && (
            <>
              {currentImage?.length > 0 &&
                [...currentImage].reverse().map((item, index) => (
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
                        onClick={() => addImageToGallery(true, item)}
                      >
                        <FiCheck
                          size={30}
                          color="white"
                          className="cursor-pointer"
                        />
                      </div>

                      <div
                        className="h-20 w-20 flex justify-center items-center rounded-full shadow-md bg-[#00000054]"
                        onClick={() => addImageToGallery(false, item)}
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
      )}
    </div>
  );
};

export default CustomCamera;
