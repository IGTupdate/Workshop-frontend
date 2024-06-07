"use client";
import { updateWorkOrder } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder, TWorkOrderObservation } from "@/app/types/work-order";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { Button, Image, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCarAlt, FaCarBattery, FaCarCrash, FaCarSide } from "react-icons/fa";
import CarPartImageModel from "../prepare/__components/CarPartImageModel";
import AddMoreInspectionCategory from "../prepare/__components/AddMoreInspectionCategory";
import { IoSettingsSharp } from "react-icons/io5";
import CustomCamera from "@/app/components/Camera/Camera";
import { FaCheck } from "react-icons/fa6";

type CarPart = {
  id: string;
  icon: JSX.Element;
  label: string;
};

type CapturedImages = {
  [key: string]: string[];
};

const carParts: CarPart[] = [
  { id: "Front", icon: <FaCarAlt size={50} />, label: "Front" },
  { id: "Side", icon: <FaCarSide size={50} />, label: "Side" },
  { id: "Back", icon: <FaCarCrash size={50} />, label: "Back" },
  { id: "Engine", icon: <FaCarBattery size={50} />, label: "Engine" },
];

const getCategoryIcon = (category: string) => {
  const result = carParts.find((el) => {
    return el.id === category;
  });
  if (result) return result.icon;
  return <IoSettingsSharp size={50} />;
};
type Props = {
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  workOrder: Partial<TWorkOrder>;
};

const InspectVehicle = ({ setSteps, workOrder }: Props) => {
  // const [selectedPart, setSelectedPart] = useState<string | null>(null);
  // const [capturedImages, setCapturedImages] = useState<CapturedImages>({});

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [observations, setObservations] = useState<TWorkOrderObservation[]>([]);

  useEffect(() => {
    setObservations(() => {
      return carParts.map((itm) => {
        return {
          category: itm.id,
          images: [],
          details: "",
        };
      });
    });
  }, []);

  useEffect(() => {
    if (workOrder.observations) {
      // filling
      let newObservations = [...workOrder.observations];
      const filteredKnownObservationDoesNotSaved = observations.filter(
        (obs) => {
          const isExist = newObservations.find((el) => {
            return obs.category === el.category;
          });

          return !isExist;
        },
      );

      newObservations = [
        ...newObservations,
        ...filteredKnownObservationDoesNotSaved,
      ];
      setObservations(newObservations);
    }
  }, [workOrder]);

  const handleOpenModal = (category: string) => {
    setShowModal(category);
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const getPreSavedCategoryData = (category: string) => {
    console.log(category);
    const data = observations?.find((obs) => {
      return obs.category === category;
    });
    console.log(data);
    return data || { category, images: [] as string[] };
  };

  const handleSaveAndContinue = async () => {
    try {
      setLoading(true);
      const response = await updateWorkOrder(workOrder._id || "", {
        observations: observations,
      });
      toast.success("Updated Successfully");
      setSteps("2");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveObservation = (data: TWorkOrderObservation) => {
    console.log(data);
    setObservations((prv) => {
      return prv.map((el) => {
        if (el.category === data.category) return data;
        else return el;
      });
    });
    handleCloseModal();
  };

  const addObservation = (toAddObs: TWorkOrderObservation) => {
    const foundObs = observations.find(
      (obs) => obs.category === toAddObs.category,
    );
    if (foundObs) {
      return false;
    }
    setObservations((prv) => {
      return [...prv, toAddObs];
    });
    return true;
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
            {observations.map((obs, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <Button onClick={() => handleOpenModal(obs.category)}>
                  {obs.images.length > 0 ? (
                    <FaCheck size={50} />
                  ) : (
                    getCategoryIcon(obs.category)
                  )}
                  <div>{obs.category}</div>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-10 text-white1">
            <AddMoreInspectionCategory
              onAddCategory={(data: string) => {
                return addObservation({
                  category: data,
                  images: [],
                  details: "",
                });
              }}
            />
          </div>

          <CarPartImageModel
            workOrderId={workOrder._id || ""}
            openModal={showModal !== null}
            handleCloseModal={handleCloseModal}
            handleSaveObservation={handleSaveObservation}
            observation={
              showModal
                ? getPreSavedCategoryData(showModal)
                : { category: "", images: [] as string[] }
            }
          />

          {/* {selectedPart && showModal && (
            <CarPartModal
              part={selectedPart}
              showModal={showModal}
              setShowModal={setShowModal}
              capturedImages={capturedImages[selectedPart] || []}
            />
          )} */}
        </main>
      </div>

      <div className="flex justify-end items-center gap-4 mt-4">
        <Button
          disabled={loading}
          onClick={() => setSteps("0")}
          loading={loading}
        >
          Back
        </Button>
        <Button
          onClick={handleSaveAndContinue}
          htmlType="submit"
          type="primary"
        >
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
                {/* <IoClose
                  onClick={() => removeImage(index)}
                  size={25}
                  color="white"
                /> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};
