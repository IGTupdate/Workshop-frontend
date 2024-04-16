import { TActiveSlotSchedule, TSlotSchedule } from "@/app/types/slot-schedule";
import { Space, TableProps, Tag, Typography } from "antd";

export interface ISlotSchedule {
  _id: string;
  key: string;
  name: string;
  limit: number;
  details: string[];
}
const { Text, Title } = Typography

export const get_slot_schedule_columns = (
  setOpenDrawer: (newDrawerData: TActiveSlotSchedule) => void,
  handleSlotScheduleDeleteModal: (newDeleteModal: TSlotSchedule | null) => void
) => {
  const slot_schedule_table_columns: TableProps<TSlotSchedule>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Limit",
      dataIndex: "limit",
      key: "limit",
      render: (_, { slot_details }) => {
        return slot_details.reduce((accumalator, currvalue) => {
          return (accumalator += currvalue.slot_limit);
        }, 0);
      },
    },
    {
      title: "Details",
      key: "slot_details",
      dataIndex: "slot_details",
      render: (_, { slot_details }) => (
        <div style={{ maxWidth: 300 }} className="">
          {slot_details.map((slot, index) => {
            let color = slot.start_time.hour >= 12 ? "orange" : "geekblue";
            return (<div key={index} className="mb-2 pb-2 border-b">
              <div className="grid grid-cols-2 gap-2">
                <p>Start Time : {slot.start_time.hour}:{slot.start_time.minute}</p>
                <p>End Time :{slot.end_time.hour}:{slot.end_time.minute}</p>
              </div>
              <p>Slot Limit : {slot.slot_limit}</p>
            </div>
              // <Tag color={color} key={index}>
              //   {`${slot.start_time.hour}:${slot.start_time.minute} - ${slot.end_time.hour}:${slot.end_time.minute} = ${slot.slot_limit}`}
              // </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              setOpenDrawer(record);
            }}
          >
            Update{" "}
          </button>
          <button onClick={() => {
            handleSlotScheduleDeleteModal(record)
          }} className="text-red-500">Delete</button>
        </Space>
      ),
    },
  ];

  return slot_schedule_table_columns;
};
