"use client";
import { useState } from "react";
import { Modal, Button, Image } from "antd";
import { FaCarSide, FaCarAlt, FaCarCrash, FaCarBattery } from "react-icons/fa";
import CustomCamera from "@/app/components/Camera/Camera";
import { MdCameraAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";

type CarPart = {
  id: string;
  icon: JSX.Element;
  label: string;
};

type CapturedImages = {
  [key: string]: string[];
};

const carParts: CarPart[] = [
  { id: "front", icon: <FaCarAlt size={50} />, label: "Front" },
  { id: "side", icon: <FaCarSide size={50} />, label: "Side" },
  { id: "back", icon: <FaCarCrash size={50} />, label: "Back" },
  { id: "engine", icon: <FaCarBattery size={50} />, label: "Engine" },
];

type Props = {
  setSteps: React.Dispatch<React.SetStateAction<string>>;
};

const InspectVehicle = ({ setSteps }: Props) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [capturedImages, setCapturedImages] = useState<CapturedImages>({});
  const [showModal, setShowModal] = useState<string | null>(null);

  const handleIconClick = (part: string) => {
    setSelectedPart(part);
    setShowModal(part);
  };

  const onSubmit = async () => {
    setSteps("2");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-6">
        <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
          <div>
            <h3 className="text-lg font-bold">Car Inspection</h3>
            <p>Click on the car parts to capture images</p>
          </div>

          <div className="flex gap-4 my-4">
            {carParts.map((part) => (
              <div
                key={part.id}
                className="relative flex flex-col items-center"
              >
                <Button onClick={() => handleIconClick(part.id)}>
                  {part.icon}
                  <div>{part.label}</div>
                </Button>
              </div>
            ))}
          </div>

          {selectedPart && showModal && (
            <CarPartModal
              part={selectedPart}
              showModal={showModal}
              setShowModal={setShowModal}
              capturedImages={capturedImages[selectedPart] || []}
            />
          )}
        </main>
      </div>

      <div className="flex justify-end items-center gap-4 mt-4">
        <Button onClick={() => setSteps("0")}>Back</Button>
        <Button onClick={onSubmit} htmlType="submit" type="primary">
          Save & Continue
        </Button>
      </div>
    </>
  );
};

export default InspectVehicle;

type CarPartModalProps = {
  part: string;
  showModal: string | null;
  setShowModal: (showModal: string | null) => void;
  capturedImages: string[];
};

const CarPartModal = ({ part, showModal, setShowModal }: CarPartModalProps) => {
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

  return (
    <Modal
      open={part === showModal}
      footer={null}
      onCancel={() => setShowModal("")}
      title={`Capture Image for ${part}`}
    >
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
    </Modal>
  );
};
