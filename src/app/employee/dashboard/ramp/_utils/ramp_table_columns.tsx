'use client';
import { TActiveRamp, TRamp } from "@/app/types/ramp";
import { TWorkOrder } from "@/app/types/work-order";
import { Button, Space, TableProps } from "antd";

export interface IRampData {
  _id: string;
  key: string;
  name: string;
  assigned_workOrder: TWorkOrder[];
}

export const ramp_table_columns = (
  setOpenDrawer: (newDrawerData: TActiveRamp) => void
) => {
  const ramp_table_columns: TableProps<TRamp>["columns"] = [
    {
      title: "Ramp Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <p className="uppercase font-semibold">{text}</p>,
    },
    {
      title: 'Assigned Work Orders',
      key: 'assigned_workOrder',
      dataIndex: 'assigned_workOrder',
      render: (assigned_workOrder: TWorkOrder[]) => (
        <>
          <Button onClick={() => setOpenDrawer({
            type: 'workorder',
            value: assigned_workOrder
          })}>Show Details</Button>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: TRamp) => (
        <Space size="middle">
          <Button type="primary" onClick={() => setOpenDrawer({
            type: 'ramp',
            value: record
          })}>Update</Button>
          {/* <button onClick={() => handleRampDeleteModal(record)} className="text-red-500">Delete</button> */}
        </Space>
      ),
    },
  ];

  return ramp_table_columns;
};
