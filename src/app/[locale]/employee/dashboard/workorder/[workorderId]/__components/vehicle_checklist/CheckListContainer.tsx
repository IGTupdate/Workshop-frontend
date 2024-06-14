"use client";

import {
  IChecklist,
  ICheckListVehicle,
  ICheckListTask,
  IVehicleChecklist,
} from "@/app/types/checklist";
import { IWorkorderChecklist } from "@/app/types/workorder-checklist";
import { vehicleChecklistStatusEnum } from "@/app/utils/constants/checklistenum";
import { Button, Radio, Typography } from "antd";
import React from "react";

import { Controller, useForm } from "react-hook-form";

const { Title } = Typography;

type Props = {
  vehicleCheckList: IWorkorderChecklist;
};

const CheckListContainer: React.FC<Props> = (props) => {
  console.log(props.vehicleCheckList);
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      checkList: props.vehicleCheckList.checklist,
    },
  });

  const checkList = watch("checkList");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {checkList.map((levelData, index) => (
          <div key={index} className="mb-4">
            <div>
              <Title level={4}>Level {levelData.level}</Title>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {levelData.categories.map((category, _index) => (
                <div key={_index}>
                  <table className="w-full text-left border">
                    <thead className="bg-gray-200 ">
                      <tr>
                        <th className="p-2 w-2/3">{category.name}</th>
                        <th>
                          <ul className="flex justify-around">
                            <li title="GOOD">B</li>
                            <li title="BAD">M</li>
                            <li title="NOT AVAILABLE">Y/N</li>
                          </ul>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.tasks.map((task, __index) => (
                        <tr key={__index}>
                          <td className="p-2 w-2/3">{task.name}</td>
                          <td>
                            {/* <Controller
                              name={`checkList.${index}.categories.${_index}.tasks.${__index}.status`}
                              control={control}
                              render={({ field }) => (
                                <Radio.Group
                                  {...field}
                                  className="flex justify-around"
                                >
                                  <Radio
                                    value={vehicleChecklistStatusEnum.GOOD}
                                  ></Radio>
                                  <Radio
                                    value={vehicleChecklistStatusEnum.BAD}
                                  ></Radio>
                                  <Radio
                                    value={
                                      vehicleChecklistStatusEnum.NOT_AVAILABLE
                                    }
                                  ></Radio>
                                </Radio.Group>
                              )}
                            /> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckListContainer;
