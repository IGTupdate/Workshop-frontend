import Watermark from "@/app/components/Text/WatermarkText";
import {
  TAddionalTaskRequest,
  TAdditonalWorkRequest,
} from "@/app/types/work-order";
import { Button, Drawer, Space } from "antd";
import React, { ChangeEvent } from "react";

type Props = {
  onClose: any;
  open: boolean;
  selectedAdditionalTasks: TAdditonalWorkRequest[];
  selectedTasks: string[];
  setSelectedTasks: any;
  ApprovedAdditionalWorks: any;
};

const AdditionalWorksDrawer = ({
  onClose,
  open,
  selectedAdditionalTasks,
  selectedTasks,
  setSelectedTasks,
  ApprovedAdditionalWorks,
}: Props) => {
  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    id: string,
  ): void {
    const { checked } = event.target;

    setSelectedTasks((prevSelectedTasks: string[]) =>
      checked
        ? [...prevSelectedTasks, id]
        : prevSelectedTasks.filter((item) => item !== id),
    );
  }

  return (
    <div>
      <Drawer
        title="Basic Drawer"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              // disabled={slotScheduleDrawerLoading}
              htmlType="submit"
              onClick={() =>
                ApprovedAdditionalWorks(selectedAdditionalTasks[0]._id)
              }
              type="primary"
            >
              Approve
            </Button>
          </Space>
        }
      >
        {selectedAdditionalTasks.length > 0 ? (
          selectedAdditionalTasks[0].tasks?.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <input
                  type="checkBox"
                  checked={selectedTasks.includes(item._id)}
                  id={item._id}
                  onChange={(e) => handleChange(e, item._id)}
                />
                <p>{item.title}</p>
              </div>
              <p>
                {item.partsRequired.map((part) => (
                  <span key={part.partId}>{part.partName}</span>
                ))}
              </p>
            </div>
          ))
        ) : (
          <div className="relative mt-8">
            <Watermark text="No Additional Tasks Found" />
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AdditionalWorksDrawer;
