import { TActiveSlotSchedule, TSlotSchedule } from "@/app/types/slot-schedule";
import { Button, Space, TableProps, Tag, Typography } from "antd";
import { formatTime } from "../../../utils/helper";

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
      render: (text: string) => <p className="capitalize text-base font-semibold">{text}</p>,
    },
    {
      title: "Limit",
      dataIndex: "limit",
      key: "limit",
      render: (_, { slot_details }) => {
          const totalLimit = slot_details.reduce((accumulator, currValue) => {
              return accumulator + currValue.slot_limit;
          }, 0);
      
          return <p className="p-1 text-center rounded-md bg-green-300 ">{totalLimit}</p>;
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
            return (<div key={index} className={`my-2 py-2  ${slot_details?.length === index+1?"border-none":"border-b"}`}>
              <h4 className="p-2 py-1 font-semibold bg-yellow-100 border rounded-lg inline-block mb-2 ms-2">{`Slot : ${index+1}`}</h4>
              <div className="grid grid-cols-3 gap-2">
                  <p className="flex flex-col items-center"><span className="text-sm font-semibold">Start Time</span>  <span>{formatTime(slot.start_time)}</span></p>
                  <p className="flex flex-col items-center"><span className="text-sm font-semibold">End Time</span>  <span>{formatTime(slot.end_time)}</span></p>
              <p className="flex flex-col items-center"><span className="text-sm font-semibold">Slot Limit</span>  <span>{slot.slot_limit}</span></p>

              </div>

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
          <Button
          type="primary"
            onClick={() => {
              setOpenDrawer(record);
            }}
          >
            Update
          </Button>
          <Button onClick={() => {
            handleSlotScheduleDeleteModal(record)
          }}
          type="primary"
          danger
          >Delete</Button>
        </Space>
      ),
    },
  ];

  return slot_schedule_table_columns;
};
