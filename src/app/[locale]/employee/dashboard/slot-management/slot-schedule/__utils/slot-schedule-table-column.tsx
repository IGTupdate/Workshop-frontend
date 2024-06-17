import { TActiveSlotSchedule, TSlotSchedule } from "@/app/types/slot-schedule";
import { Button, Space, TableProps } from "antd";
import { formatTime } from "../../../utils/helper";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { AbilityTuple, MongoAbility, MongoQuery } from "@casl/ability";

export interface ISlotSchedule {
  _id: string;
  key: string;
  name: string;
  limit: number;
  details: string[];
}

export const Get_slot_schedule_columns = (
  setOpenDrawer: (newDrawerData: TActiveSlotSchedule) => void,
  handleSlotScheduleDeleteModal: (newDeleteModal: TSlotSchedule | null) => void,
  ability: MongoAbility<AbilityTuple, MongoQuery> | undefined,
  t: any,
) => {
  const slot_schedule_table_columns: TableProps<TSlotSchedule>["columns"] = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <p className="capitalize text-base font-semibold">{text}</p>
      ),
    },
    {
      title: t("limit"),
      dataIndex: "limit",
      key: "limit",
      render: (_, { slot_details }) => {
        const totalLimit = slot_details.reduce((accumulator, currValue) => {
          return accumulator + currValue.slot_limit;
        }, 0);

        return (
          <p className="p-1 text-center rounded-md bg-green-300 ">
            {totalLimit}
          </p>
        );
      },
    },
    {
      title: t("details"),
      key: "slot_details",
      dataIndex: "slot_details",
      render: (_, { slot_details }) => (
        <div style={{ maxWidth: 300 }} className="">
          {slot_details.map((slot, index) => {
            let color = slot.start_time.hour >= 12 ? "orange" : "geekblue";
            return (
              <div
                key={index}
                className={`my-2 py-2  ${slot_details?.length === index + 1 ? "border-none" : "border-b"}`}
              >
                <h4 className="p-2 py-1 font-semibold bg-yellow-100 border rounded-lg inline-block mb-2 ms-2">{`Slot : ${index + 1}`}</h4>
                <div className="grid grid-cols-3 gap-2">
                  <p className="flex flex-col items-center">
                    <span className="text-sm font-semibold">
                      {t("start_time")}
                    </span>{" "}
                    <span>{formatTime(slot.start_time)}</span>
                  </p>
                  <p className="flex flex-col items-center">
                    <span className="text-sm font-semibold">
                      {t("end_time")}
                    </span>{" "}
                    <span>{formatTime(slot.end_time)}</span>
                  </p>
                  <p className="flex flex-col items-center">
                    <span className="text-sm font-semibold">
                      {t("slot_limit")}
                    </span>{" "}
                    <span>{slot.slot_limit}</span>
                  </p>
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
      title: t("action"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {ability &&
            ability.can(casl_action.update, casl_subject.slot_schedule) && (
              <Button
                type="primary"
                onClick={() => {
                  setOpenDrawer(record);
                }}
              >
                {t("update")}
              </Button>
            )}

          {ability &&
            ability.can(casl_action.delete, casl_subject.slot_schedule) && (
              <Button
                onClick={() => {
                  handleSlotScheduleDeleteModal(record);
                }}
                type="primary"
                danger
              >
                {t("delete")}
              </Button>
            )}
        </Space>
      ),
    },
  ];

  return slot_schedule_table_columns;
};
