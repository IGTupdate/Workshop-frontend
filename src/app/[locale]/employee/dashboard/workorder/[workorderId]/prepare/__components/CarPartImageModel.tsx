"use client";

import CameraInputField from "@/app/components/Input/CameraInputField";
import { deleteImageFromServer } from "@/app/services/operations/upload/upload";
import { updateWorkOrder } from "@/app/services/operations/workorder/workorder";
import { TWorkOrderObservation } from "@/app/types/work-order";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { Button, Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

type Props = {
  observation: TWorkOrderObservation;
  openModal: boolean;
  handleCloseModal: any;
  workOrderId: string;
  handleSaveObservation: (data: TWorkOrderObservation) => void;
};

const CarPartImageModel = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [vehicleObservationData, setVehicleObservation] =
    useState<TWorkOrderObservation>({
      category: "",
      images: [],
      details: "",
    });

  useEffect(() => {
    setVehicleObservation((prv) => {
      return {
        ...prv,
        ...props.observation,
      };
    });
  }, [props.observation]);

  const removeImage = (index: number) => {
    // delete image from the server
    deleteImageFromServer(vehicleObservationData.images[index]);

    // remvoe from the state
    setVehicleObservation((prv) => {
      return {
        ...prv,
        images: prv.images.filter((item, ind) => {
          return ind !== index;
        }),
      };
    });
  };

  const addImage = (url: string) => {
    console.log(url);
    setVehicleObservation((prv) => {
      return {
        ...prv,
        images: [...prv.images, url],
      };
    });
  };

  const saveVehicleObservation = async () => {
    if (vehicleObservationData.images.length > 0) {
      props.handleSaveObservation(vehicleObservationData);
    }
  };

  return (
    <div>
      <Modal
        open={props.openModal}
        title={`Capture Image for ${props.observation.category}`}
        onCancel={props.handleCloseModal}
        // cancelButtonProps={{ onClick: props.handleCloseModal, disabled: loading }}
        // okButtonProps={{ disabled: loading }}
        onOk={saveVehicleObservation}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <CameraInputField addImage={addImage} />

        {vehicleObservationData.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {vehicleObservationData.images.map((item, index) => (
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
        {/* 
                <div className='mt-5 flex justify-end'>
                    <Button type='primary'>Save</Button>
                </div> */}
      </Modal>
    </div>
  );
};

export default CarPartImageModel;
