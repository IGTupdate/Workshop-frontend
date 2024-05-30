import { Modal } from "antd";
import Image from "next/image";
import React from "react";
import { FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdCameraAlt, MdCameraswitch, MdFileUpload } from "react-icons/md";
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
    currentImage: string | null | undefined;
    AddImageOnGallery: (value: boolean) => void;
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
    AddImageOnGallery,
    handleImageChange,
    handleStartCamera,
}: Props) => {
    return (
        <div>
            {onCamera && (
                <Modal
                    open={open}
                    closeIcon={null}
                    footer={null}
                    width={"100%"}
                    styles={{
                        content: { backgroundColor: "transparent", padding: "0" }, // turns the Modal red
                    }}
                    wrapClassName="camera-modal"
                >

                    <div className="absolute left-5 bottom-8 flex justify-center items-center">
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


                    <Camera
                        onTakePhoto={handleCapture}
                        idealFacingMode={switchCamera} // Use the environment (rear) camera
                        isMaxResolution={true}
                        isImageMirror={true}
                        isFullscreen={true}
                        imageType={"png"}
                    />

                    <IoMdClose
                        onClick={() => setOnCamera(false)}
                        size={30}
                        className="absolute right-0 top-0 text-slate-500 cursor-pointer"
                    />

                    <MdCameraswitch
                        onClick={() =>
                            setSwitchCamera(switchCamera === "user" ? "environment" : "user")
                        }
                        size={35}
                        className="absolute right-[35%] translate-x-[-35%] bottom-8 text-white cursor-pointer"
                    />

                    {showCurrentImage && (
                        <div>
                            <Image
                                src={currentImage || ""}
                                width={100}
                                height={100}
                                alt="image"
                                className="absolute left-0 top-0 mb-4 w-full h-full mx-auto rounded-lg shadow-md object-cover object-center z-10"
                            />

                            <div className="absolute bottom-10 left-1/2 translate-x-[-50%] flex justify-center items-center gap-4 z-10">
                                <div
                                    className="h-20 w-20 flex justify-center items-center rounded-full shadow-md bg-[#00000054]"
                                    onClick={() => AddImageOnGallery(true)}
                                >
                                    <FiCheck size={30} color="white" className="cursor-pointer" />
                                </div>

                                <div
                                    className="h-20 w-20 flex justify-center items-center rounded-full shadow-md bg-[#00000054]"
                                    onClick={() => AddImageOnGallery(false)}
                                >
                                    <IoMdClose
                                        size={30}
                                        color="white"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            )}

            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={handleStartCamera}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
                >
                    <MdCameraAlt size={24} />
                </button>
            </div>
        </div>
    );
};

export default CustomCamera;
