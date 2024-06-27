import { TTask } from "@/app/types/work-order";
import { useEffect, useState } from "react";
import { workOrderTaskStatusText } from "../../../__utils/workOrderTaskStatus";
import WorkOrderTaskUpdateModal from "./WorkOrderTaskUpdateModal";

type Props = {
  tasks: TTask[];
};

const WorkOrderTaskListContainer = (props: Props) => {
  const [tasks, setTasks] = useState<TTask[]>([]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const handleUpdateTask = (task: TTask) => {
    setTasks((prv) => {
      return prv.map((tt) => {
        return tt._id == task._id ? task : tt;
      });
    });
  };

  console.log(tasks);
  return (
    <div>
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-300">
              <th className="w-1/2 text-left p-2">Tasks</th>
              <th className="w-1/6 text-left p-2">Status</th>
              <th className="w-1/6 text-left p-2">Remarks</th>
              <th className="w-1/6 text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((tt, index) => {
              return (
                <tr key={index} className="border py-2">
                  <td className="p-2">
                    <div>
                      <h2 className="font-medium text-md">{tt.title}</h2>
                      <p className="text-[12px]">{tt.description}</p>
                    </div>
                  </td>
                  <td className="p-2">
                    <div>{workOrderTaskStatusText[tt.status]}</div>
                  </td>
                  <td className="p-2">
                    <div>{tt.remarks || ""}</div>
                  </td>
                  <td className="p-2">
                    <WorkOrderTaskUpdateModal
                      task={tt}
                      handleUpdateTask={handleUpdateTask}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkOrderTaskListContainer;
