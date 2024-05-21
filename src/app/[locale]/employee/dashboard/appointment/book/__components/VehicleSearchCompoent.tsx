"use client";

import { getVehicles } from "@/app/services/operations/appointment/vehicle";
import { TVehicle } from "@/app/types/vehicle";
import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { NEW_VEHICLE } from "../__utils/constant";
import { TAppointmentBook } from "@/app/types/appointment";

type Props = {
  setVehicleId: React.Dispatch<React.SetStateAction<string>>;
  setAppointmentBookingData: React.Dispatch<
    React.SetStateAction<TAppointmentBook>
  >;
};

const VehicleSearchCompoent = (props: Props) => {
  const [selectOptions, setSelectOptions] = useState([NEW_VEHICLE]);
  const [vehicles, setVehicles] = useState<TVehicle[]>([]);

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearch = (value: string) => {
    console.log(value);
  };

  const onChange = (value: string) => {
    props.setVehicleId(() => {
      return value;
    });
  };

  useEffect(() => {
    setSelectOptions(() => {
      const newOptions = vehicles.map((vehicle) => {
        return {
          value: vehicle._id,
          label: vehicle.registeration_number,
        };
      });
      return [NEW_VEHICLE, ...newOptions];
    });
  }, [vehicles]);

  /* search use effect */
  useEffect(() => {
    (async function () {
      try {
        const data = (await getVehicles()) as TVehicle[];
        setVehicles(() => {
          return data;
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleBack = () => {
    props.setVehicleId("");
    props.setAppointmentBookingData((prv) => {
      return {
        ...prv,
        customer_id: "",
      };
    });
  };

  return (
    <div className="mt-5">
      <label className="font-medium mb-2 block text-black1" htmlFor="name">
        Serach Vehicle
      </label>
      <Select
        className="w-[360px]"
        showSearch
        placeholder="Search Vehicle @MP"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={selectOptions}
      />

      <div className="mt-4">
        <Button onClick={handleBack}>Back</Button>
      </div>
    </div>
  );
};

export default VehicleSearchCompoent;
