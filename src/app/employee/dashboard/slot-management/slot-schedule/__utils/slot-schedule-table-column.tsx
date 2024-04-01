import { TActiveSlotSchedule, TSlotSchedule } from "@/app/types/slot-schedule";
import { Space, TableProps, Tag } from "antd";

export interface ISlotSchedule {
  _id: string;
  key: string;
  name: string;
  limit: number;
  details: string[];
}

export const get_slot_schedule_columns = (
  setOpenDrawer: (newDrawerData: TActiveSlotSchedule) => void
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
        <div style={{ maxWidth: 300 }} className="flex flex-wrap gap-2">
          {slot_details.map((slot, index) => {
            let color = slot.start_time.hour >= 12 ? "orange" : "geekblue";
            return (
              <Tag color={color} key={index}>
                {`${slot.start_time.hour}:${slot.start_time.minute} - ${slot.end_time.hour}:${slot.end_time.minute} = ${slot.slot_limit}`}
              </Tag>
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
              console.log("it works");
              setOpenDrawer(record);
            }}
          >
            Update{" "}
          </button>
          <button className="text-red-500">Delete</button>
        </Space>
      ),
    },
  ];

  return slot_schedule_table_columns;
};
