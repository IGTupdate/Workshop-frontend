import { Space, Table, TableProps, Tag } from "antd";

export interface ISlotSchedule {
  _id: string;
  key: string;
  name: string;
  limit: number;
  details: string[];
}

export const get_slot_schedule_columns = (
  setOpenDrawer: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const slot_schedule_table_columns: TableProps<ISlotSchedule>["columns"] = [
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
    },
    {
      title: "Details",
      key: "details",
      dataIndex: "details",
      render: (_, { details }) => (
        <div style={{ maxWidth: 300 }} className="flex flex-wrap gap-2">
          {details.map((tag, index) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={index}>
                {tag.toUpperCase()}
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
              setOpenDrawer(record._id);
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
