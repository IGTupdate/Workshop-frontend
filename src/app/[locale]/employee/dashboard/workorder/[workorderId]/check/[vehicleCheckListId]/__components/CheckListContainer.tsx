"use client";

import { IWorkorderChecklist } from "@/app/types/workorder-checklist";
import { vehicleChecklistStatusEnum } from "@/app/utils/constants/checklistenum";
import { Button, Radio, Typography } from "antd";

import React from "react";

import { Controller, useForm } from "react-hook-form";
import CheckListDetailContainer from "./CheckListDetailContainer";

const { Title } = Typography;

type Props = {
  vehicleCheckList: IWorkorderChecklist;
};

const CheckListContainer: React.FC<Props> = (props) => {
  console.log(props.vehicleCheckList);
  const { control, watch, handleSubmit, setValue, getValues } =
    useForm<IWorkorderChecklist>({
      defaultValues: {
        checklist: props.vehicleCheckList.checklist,
      },
    });

  const checkList = watch("checklist");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {checkList.map((levelData, index) => (
          <div key={index} className="mb-8">
            <div>
              <Title level={4}>Level {levelData.level}</Title>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {levelData.categories.map((category, _index) => (
                <div key={_index}>
                  <table className="w-full text-left border">
                    <thead className="bg-gray-200 ">
                      <tr>
                        <th className="p-2 md:w-4/5 w-3/5 border">
                          {category.name}
                        </th>
                        <th className="md:w-1/3 w-1/4">
                          <ul className="flex justify-around">
                            <li title="GOOD">B</li>
                            <li title="BAD">M</li>
                            <li title="NOT AVAILABLE">Y/N</li>
                            {/* <li>Details</li> */}
                          </ul>
                        </th>
                        <th className="p-2 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.tasks.map((task, __index) => (
                        <tr key={__index}>
                          <td className="p-2">{task.name}</td>
                          <td className="">
                            {/* <div> */}
                            <Controller
                              name={`checklist.${index}.categories.${_index}.tasks.${__index}.status`}
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
                            />
                          </td>
                          <td className="w-full flex justify-end">
                            {/* <Button type="primary" icon={<TbListDetails />} /> */}
                            <CheckListDetailContainer
                              levelIndex={index}
                              categoryIndex={_index}
                              taskIndex={__index}
                              control={control}
                              setValue={setValue}
                              getValues={getValues}
                              watch={watch}
                            />
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
