import CustomCamera from "@/app/components/Camera/Camera";
import CameraInputField from "@/app/components/Input/CameraInputField";
import InputField from "@/app/components/Input/InputField";
import { deleteImageFromServer } from "@/app/services/operations/upload/upload";
import { Button, Image, Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";

type Props = {
  control: any;
  levelIndex: number;
  categoryIndex: number;
  taskIndex: number;
  setValue: any;
  getValues: any;
  watch: any;
};

const CheckListDetailContainer = (props: Props) => {
  console.log("hello abcd");
  const [openModal, setOpenModal] = useState(false);

  const {} = useForm();

  const handleOk = () => {
    handleOnCloseModal();
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOnCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={handleOpenModal}
        icon={<TbListDetails />}
      />
      <Modal
        title="Description"
        open={openModal}
        onOk={handleOk}
        onCancel={handleOnCloseModal}
      >
        <div>
          <InputField
            control={props.control}
            name={`checklist.${props.levelIndex}.categories.${props.categoryIndex}.tasks.${props.taskIndex}.description.text`}
            error=""
            label="Text Description"
            placeholder="Have issue in the ..."
            type="text"
          />
        </div>
        <div className="mt-5">
          <h2 className="font-medium mb-2 block text-black1">Images</h2>
          <div className="flex">
            <CameraInputField
              addImage={(url: string) => {
                console.log(url);
                const currentImages =
                  props.getValues(
                    `checklist.${props.levelIndex}.categories.${props.categoryIndex}.tasks.${props.taskIndex}.description.images`,
                  ) || [];
                props.setValue(
                  `checklist.${props.levelIndex}.categories.${props.categoryIndex}.tasks.${props.taskIndex}.description.images`,
                  [...currentImages, url],
                );
              }}
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-4">
              {props
                .watch(
                  `checklist.${props.levelIndex}.categories.${props.categoryIndex}.tasks.${props.taskIndex}.description.images`,
                )
                ?.map((el: string, index: number) => {
                  return (
                    <div key={index} className="relative">
                      <Image src={el} alt="odomterreading" width={200} />
                      <div className="absolute right-[-12px] top-[-12px] h-12 w-12 flex justify-center items-center rounded-full shadow-topDivSmall cursor-pointer">
                        <IoClose
                          onClick={() => {
                            const oldImages = props
                              .getValues(
                                `checklist.${props.levelIndex}.categories.${props.categoryIndex}.tasks.${props.taskIndex}.description.images`,
                              )
                              .filter((_: any, ind: number) => {
                                if (ind !== index) {
                                  deleteImageFromServer(_ as string);
                                  return true;
                                }
                                return false;
                              });
                            props.setValue(
                              `checklist.${props.levelIndex}.categories.${props.categoryIndex}.tasks.${props.taskIndex}.description.images`,
                              oldImages,
                            );
                          }}
                          size={25}
                          color="white"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckListDetailContainer;
