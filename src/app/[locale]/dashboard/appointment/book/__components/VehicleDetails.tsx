import CustomModal from "@/app/components/Model/CustomModel";
import { TVehicle } from "@/app/types/vehicle";
import { formatDateAndTime } from "@/app/utils/dateFormatter";
import { Button, Descriptions } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

type Props = {
  vehicleDetails: TVehicle;
  setVehicleId: React.Dispatch<React.SetStateAction<string>>;
  setUpdateVehicleId: React.Dispatch<React.SetStateAction<string>>;
  onDeleteVehicle: (_id: string) => void;
};

const VehicleDetails = (props: Props) => {
  const { vehicleDetails, setVehicleId, setUpdateVehicleId } = props;

  const [visible, setVisible] = useState(false);

  const t = useTranslations("VehicleDetails");

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="hidden sm:block">
        <Descriptions
          column={2}
          className="p-4 pb-0 bg-white rounded-xl shadow-xl"
        >
          <Descriptions.Item
            label={t("vehicleMakeLabel")}
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.vehicle_make}
          </Descriptions.Item>
          <Descriptions.Item
            label={t("vehicleLabel")}
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.vehicle_model}
          </Descriptions.Item>
          <Descriptions.Item
            label={t("vinLabel")}
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.vin}
          </Descriptions.Item>
          <Descriptions.Item
            label={t("registrationLabel")}
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.registeration_number}
          </Descriptions.Item>
          <Descriptions.Item
            label={t("ownerLabel")}
            className="font-semibold uppercase"
          >
            {vehicleDetails.owner}
          </Descriptions.Item>
          <Descriptions.Item
            label={t("createdAtLabel")}
            className="font-semibold text-nowrap uppercase"
          >
            {formatDateAndTime(vehicleDetails.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item
            label=""
            contentStyle={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Button
              type="primary"
              onClick={() => setVehicleId(vehicleDetails._id)}
            >
              {t("selectButton")}
            </Button>
            <Button
              type="primary"
              onClick={() => setUpdateVehicleId(vehicleDetails._id)}
            >
              {t("updateButton")}
            </Button>
            <Button type="primary" onClick={() => setVisible(true)}>
              {t("deleteButton")}
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className="block sm:hidden">
        <div className="p-4 bg-white rounded-xl shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-antGreay">{t("vehicleMakeLabel")}</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.vehicle_make}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-antGreay">{t("vehicleLabel")}</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.vehicle_model}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-antGreay">{t("vinLabel")}</p>{" "}
              <p className="font-semibold text-nowrap">{vehicleDetails.vin}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-antGreay">{t("createdAtLabel")}</p>{" "}
              <p className="font-semibold text-nowrap">
                {formatDateAndTime(vehicleDetails.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-antGreay">{t("ownerLabel")}</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.owner}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-antGreay">{t("registrationLabel")}</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.registeration_number}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 items-center flex-wrap">
            <Button
              type="primary"
              onClick={() => setVehicleId(vehicleDetails._id)}
            >
              {t("selectButton")}
            </Button>
            <Button
              type="primary"
              onClick={() => setUpdateVehicleId(vehicleDetails._id)}
            >
              {t("updateButton")}
            </Button>
            <Button type="primary" onClick={() => setVisible(true)}>
              {t("deleteButton")}
            </Button>
          </div>
        </div>
      </div>

      <CustomModal
        title={t("modalTitle")}
        open={visible}
        onCancel={handleCancel}
        footer={[
          // <Button key="cancel" onClick={() => handleCancel()}>
          //   Cancel
          // </Button>,
          <Button
            type="primary"
            key="confirm"
            onClick={() => {
              props.onDeleteVehicle(vehicleDetails._id);
              setVisible(false);
            }}
          >
            {t("modalButton")}
          </Button>,
        ]}
      >
        <p>{t("modalText")}</p>
      </CustomModal>
    </>
  );
};

export default VehicleDetails;
