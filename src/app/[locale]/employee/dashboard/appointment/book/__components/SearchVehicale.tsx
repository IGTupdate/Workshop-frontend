import React, { useState } from "react";
import { vehicleNumberInputFields } from "../__utils/vehicle-create-input";
import InputField from "@/app/components/Input/InputField";
import {
  TvehicleCreateSchema,
  TVehicleSearchSchema,
  vehicleSearchSchema,
} from "@/app/validators/vehicle";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type props = {
  handleBack: () => void;
  handleCheckVehicle: (data: TVehicleSearchSchema) => Promise<void>;
};

const SearchVehicale = ({ handleBack, handleCheckVehicle }: props) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(vehicleSearchSchema),
  });

  return (
    <div className="w-full sm:w-1/2">
      {vehicleNumberInputFields.map((field, index) => {
        return (
          <InputField
            key={index}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            control={control}
            upperCase={true}
            error={
              errors[field.name as keyof TVehicleSearchSchema]
                ? errors[field.name as keyof TVehicleSearchSchema]?.message ||
                  ""
                : ""
            }
          />
        );
      })}

      <div className="mt-4 flex justify-start gap-4">
        <Button disabled={loading} onClick={handleBack}>
          Back
        </Button>
        <Button
          type="primary"
          disabled={loading}
          onClick={handleSubmit(handleCheckVehicle)}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default SearchVehicale;
