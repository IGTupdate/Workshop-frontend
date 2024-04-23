import { TVehicle } from '@/app/types/vehicle';
import { formatDateAndTime } from '@/app/utils/dateFormatter';
import { Button, Descriptions } from 'antd';
import React from 'react';

type Props = {
  vehicleDetails: TVehicle,
  setVehicleId: React.Dispatch<React.SetStateAction<string>>;
  setUpdateVehicleId: React.Dispatch<React.SetStateAction<string>>;
  onDeleteVehicle: (_id: string) => void;
};

const VehicleDetails = (props: Props) => {
  const { vehicleDetails, setVehicleId, setUpdateVehicleId } = props;

  return (
    <Descriptions className=' p-4 pb-0 bg-white rounded-xl shadow-xl'>
      <Descriptions.Item label="Vehicle Make" className='font-semibold text-nowrap'>{vehicleDetails.vehicle_make}</Descriptions.Item>
      <Descriptions.Item label="Vehicle Model" className='font-semibold text-nowrap'>{vehicleDetails.vehicle_model}</Descriptions.Item>
      <Descriptions.Item label="VIN" className='font-semibold text-nowrap'>{vehicleDetails.vin}</Descriptions.Item>
      <Descriptions.Item label="Registration Number" className='font-semibold text-nowrap'>{vehicleDetails.registeration_number}</Descriptions.Item>
      <Descriptions.Item label="Owner" className='font-semibold'>{vehicleDetails.owner}</Descriptions.Item>
      <Descriptions.Item label="Created At" className='font-semibold text-nowrap'>{formatDateAndTime(vehicleDetails.createdAt)}</Descriptions.Item>
      <Descriptions.Item label="" contentStyle={{ display: 'flex', justifyContent: 'end', gap: '10px', flexWrap: 'wrap' }}>
        <Button type='primary' onClick={() => setVehicleId(vehicleDetails._id)}>Select Vehicle</Button>
        <Button type='primary' onClick={() => setUpdateVehicleId(vehicleDetails._id)}>Update Vehicle</Button>
        <Button type='primary' onClick={() => props.onDeleteVehicle(vehicleDetails._id)}>Delete Vehicle</Button>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default VehicleDetails;
