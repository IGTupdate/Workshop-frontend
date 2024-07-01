import { TAdditonalWorkRequest } from "@/app/types/work-order";
import { Button } from "antd";
import React from "react";

type Props = {
  item: TAdditonalWorkRequest;
  ApprovedAdditionalWorks: any;
};

const TaskComponent = ({ item, ApprovedAdditionalWorks }: Props) => {
  return (
    <>
      {item.tasks.map((task) => (
        <div
          key={task._id}
          className={`bg-gray-100 p-3 rounded-md shadow-md my-2 w-full`}
        >
          <p>
            <strong>Task Description:</strong> {task.description}
          </p>
          <p>
            <strong>Approved:</strong> {task.approved ? "Yes" : "No"}
          </p>
          <p>
            <strong>Critical:</strong> {task.critical ? "Yes" : "No"}
          </p>
          <div className="mt-2">
            <h4 className="font-semibold text-lg">{task.title}</h4>
            {task.partsRequired.map((part) => (
              <div key={part.partId} className="mt-1">
                <p>
                  <strong>Part Name:</strong> {part.partName}
                </p>
                <p>
                  <strong>Price:</strong> ${part.price}
                </p>
              </div>
            ))}
          </div>

          {/* <Button
            onClick={() => ApprovedAdditionalWorks(item._id)}
            className="mt-2"
          >
            Approve
          </Button> */}
        </div>
      ))}
    </>
  );
};

export default TaskComponent;
