'use client'
import { Table, Typography, Button, List } from 'antd';
import { FC, useState } from 'react';
import CustomModal from '@/app/components/Model/CustomModel';

const { Title } = Typography;

interface Ramp {
  _id: string;
  name: string;
  assigned_workOrder: string[];
  workOrders: WorkOrder[];
}

interface WorkOrder {
  workOrderId: string;
  appointmentId: string;
  startTime: string;
  endTime: string;
  nextAvailableAt: string;
}

interface RampListProps {
  ramps: Ramp[];
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const RampList: FC<RampListProps> = ({ ramps, onUpdate, onDelete }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRamp, setSelectedRamp] = useState<Ramp | null>(null);

  const handleDetailsClick = (ramp: Ramp) => {
    setSelectedRamp(ramp);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const generateRandomWorkOrder = (): WorkOrder => {
    const randomId = Math.random().toString(36).substring(7);
    return {
      workOrderId: randomId,
      appointmentId: `AP-${randomId}`,
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      nextAvailableAt: '10:30 AM'
    };
  };

  const renderItem = () => {
    const workOrders: WorkOrder[] = [];
    for (let i = 0; i < 3; i++) {
      workOrders.push(generateRandomWorkOrder());
    }

    return workOrders.map((workOrder, index) => (
      <List.Item key={index}>
        <p><strong>Work Order ID:</strong> {workOrder.workOrderId}</p>
        <p><strong>Appointment ID:</strong> {workOrder.appointmentId}</p>
        <p><strong>Start Time:</strong> {workOrder.startTime}</p>
        <p><strong>End Time:</strong> {workOrder.endTime}</p>
        <p><strong>Next Available At:</strong> {workOrder.nextAvailableAt}</p>
      </List.Item>
    ));
  };

  const assignedWorkOrderLength = (assigned_workOrder: string[]) => assigned_workOrder.length;

  const columns = [
    {
      title: 'Ramp Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Assigned Work Orders Count',
      dataIndex: 'assigned_workOrder',
      key: 'assigned_workOrder',
      render: assignedWorkOrderLength,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Ramp) => (
        <span className='flex gap-4'>
          <Button type="primary" onClick={() => onUpdate && onUpdate(record._id)}>Update</Button>
          <Button type="dashed" onClick={() => onDelete && onDelete(record._id)}>Delete</Button>
          <Button onClick={() => handleDetailsClick(record)}>Details</Button>
        </span>
      ),
    },
  ];

  const detailsColumns = [
    {
      title: 'Work Order ID',
      dataIndex: 'workOrderId',
      key: 'workOrderId',
    },
    {
      title: 'Appointment ID',
      dataIndex: 'appointmentId',
      key: 'appointmentId',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Next Available At',
      dataIndex: 'nextAvailableAt',
      key: 'nextAvailableAt',
    },
  ];

  return (
    <div>
      <Title level={2}>Ramps</Title>
      <Table dataSource={ramps} columns={columns} pagination={false} />

      <CustomModal
        title={`Details of Ramp: ${selectedRamp?.name}`}
        open={visible}
        onCancel={handleCloseModal}
        footer={[]}
      >
        <Title level={4}>Assigned Work Orders</Title>
        <Table dataSource={selectedRamp?.workOrders} columns={detailsColumns} pagination={false} />
      </CustomModal>
    </div>
  );
};

export default RampList;
