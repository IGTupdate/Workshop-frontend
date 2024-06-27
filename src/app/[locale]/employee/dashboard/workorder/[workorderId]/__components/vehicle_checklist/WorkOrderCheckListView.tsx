import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { IWorkorderChecklist } from "@/app/types/workorder-checklist";
import { vehicleChecklistStatusEnum } from "@/app/utils/constants/checklistenum";
import { Button, Radio, Typography } from "antd";
import React from "react";
import WorkOrderCheckListTaskDetailView from "./WorkOrderCheckListTaskDetailView";

const { Title } = Typography;

type Props = {
  type?: string;
  checklist: IWorkorderChecklist | null;
};

const WorkOrderCheckListView = (props: Props) => {
  return (
    <div>
      <div>
        <Title level={4}>
          CheckList - <span className="capitalize">{props.type}</span>
        </Title>
      </div>

      {props.checklist && (
        <div>
          {props.checklist?.checklist.map((levelData, index) => {
            return (
              <div key={index} className="mb-4">
                <div>
                  <h2>Level : {levelData.level}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {levelData.categories.map((category, _index) => {
                    return (
                      <div key={_index}>
                        <div>
                          <h2 className="text-lg font-medium capitalize">
                            {category.name}
                          </h2>
                          <div></div>
                        </div>
                        <div className="">
                          <ul>
                            {category.tasks.map((task, __index) => {
                              return (
                                <li key={__index} className="py-1 border-b">
                                  <div className="flex justify-between">
                                    <h3 className="capitalize">{task.name}</h3>
                                    <div className="flex gap-4 items-center">
                                      <Radio.Group
                                        name="status"
                                        value={task.status}
                                      >
                                        <Radio
                                          value={
                                            vehicleChecklistStatusEnum.GOOD
                                          }
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
                                      <div>
                                        <WorkOrderCheckListTaskDetailView
                                          task={task}
                                        />
                                      </div>
                                      {/* <div className='w-4 h-4 border bg-gray-500 rounded-full'></div>
                                                                    <div className='w-4 h-4 border bg-gray-500 rounded-full'></div>
                                                                    <div className='w-4 h-4 border bg-gray-500 rounded-full'></div> */}
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <DescriptionItem
          title="Remarks"
          content={
            (props?.checklist?.remarks && props.checklist.remarks.toString()) ||
            "-"
          }
        />
      </div>
    </div>
  );
};

export default WorkOrderCheckListView;
