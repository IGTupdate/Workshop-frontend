import { TVehicle } from '@/app/types/vehicle'
import React from 'react'
import { Button, Descriptions } from 'antd';
import { formatDateAndTime } from '@/app/utils/dateFormatter';

type Props = {
    vehicleDetails: TVehicle,
    setVehicleId: React.Dispatch<React.SetStateAction<string>>
}

const VehicleDetails = (props: Props) => {
  const { vehicleDetails, setVehicleId } = props;

  return (
    <Descriptions className=' p-4 pb-0 bg-white'>
      <Descriptions.Item label="Vehicle Make">{vehicleDetails.vehicle_make}</Descriptions.Item>
      <Descriptions.Item label="Vehicle Model">{vehicleDetails.vehicle_model}</Descriptions.Item>
      <Descriptions.Item label="VIN">{vehicleDetails.vin}</Descriptions.Item>
      <Descriptions.Item label="Registration Number">{vehicleDetails.registeration_number}</Descriptions.Item>
      <Descriptions.Item label="Owner">{vehicleDetails.owner}</Descriptions.Item>
      <Descriptions.Item label="Created At">{formatDateAndTime(vehicleDetails.createdAt)}</Descriptions.Item>
      <Descriptions.Item label="" contentStyle={{ display: 'flex', justifyContent: 'end', gap: '10px'}}>
        <Button onClick={() => setVehicleId(vehicleDetails._id)}>Select Vehicle</Button>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default VehicleDetails;
