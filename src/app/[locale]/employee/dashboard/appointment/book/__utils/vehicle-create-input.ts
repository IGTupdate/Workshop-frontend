"use client";
import { useTranslations } from "next-intl";

export const vehicleCreateInputFields = [
  {
    name: "registeration_number",
    label: "Registration number",
    placeholder: "MP09PD4567",
    type: "text",
  },
  {
    name: "vin",
    label: "VIN",
    placeholder: "Enter VIN",
    type: "text",
  },
  {
    name: "vehicle_model",
    label: "Vehicle Model",
    placeholder: "Enter vehicle model",
    type: "text",
  },
  {
    name: "vehicle_make",
    label: "Vehicle Make",
    placeholder: "Enter vehicle make",
    type: "text",
  },
  {
    name: "owner",
    label: "Owner",
    placeholder: "Enter owner name",
    type: "text",
  },
];

export const VehicleCreateInputFields = (t: any) => {
  // const t = useTranslations("VehicleCreateInputFields");

  return [
    {
      name: "registeration_number",
      label: t("registrationLabel"),
      // label: "registeration_number",
      placeholder: "MP09PD4567",
      type: "text",
    },
    {
      name: "vin",
      label: t("vinLabel"),
      placeholder: t("vinPlaceholder"),
      type: "text",
    },
    {
      name: "vehicle_model",
      label: t("vehicleLabel"),
      placeholder: t("vehiclePlaceholder"),
      type: "text",
    },
    {
      name: "vehicle_make",
      label: t("vehicleMakeLabel"),
      placeholder: t("vehicleMakePlaceholder"),
      type: "text",
    },
    {
      name: "owner",
      label: t("ownerLabel"),
      placeholder: t("ownerPlaceholder"),
      type: "text",
    },
  ];
};

export const VehicleNumberInputFields = () => {
  const t = useTranslations("VehicleNumberInputFields");

  return [
    {
      name: "registeration_number",
      label: t("label"),
      placeholder: "MP 09 PD 4567",
      type: "text",
    },
  ];
};
