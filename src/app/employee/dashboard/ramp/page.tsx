'use client';
import { getAllRampStatus } from '@/app/services/operations/workorder/workorder';
import { TActiveRamp, TRampDetails } from '@/app/types/ramp';
import { Button, Table } from 'antd'; // Import Space from Ant Design
import { useEffect, useState } from 'react';
import RampDrawer from './__components/RampDrawer';
import { ramp_table_columns } from './_utils/ramp_table_columns';

const Page = () => {
  const [rampData, setRampData] = useState([]);
  const [rampLoading, setRampLoading] = useState(true);
  const [drawerData, setDrawerData] = useState<TActiveRamp>(null);

  const allRampsData = async () => {
    try {
      const rampDetails = await getAllRampStatus();
      const rampDetailsWithKeys = rampDetails.map((ramp: TRampDetails, index: number) => ({
        ...ramp,
        key: index.toString(),
      }));
      setRampData(rampDetailsWithKeys);
    } catch (err) { }
    setRampLoading(false);
  };

  useEffect(() => {
    if (rampLoading) allRampsData();
  }, [rampLoading]);

  // console.log(rampData)

  const handleRampDrawer = (newDrawerData: TActiveRamp) => {
    setDrawerData(newDrawerData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl">
        <h2 className="text-xl font-semibold">Ramp Details</h2>
        <Button onClick={() => handleRampDrawer({
          type: 'newramp',
          value: 'NEW_RAMP'
        })} type="primary">
          Add Ramp
        </Button>
      </div>

      <div className="shadow-xl overflow-hidden rounded-xl">
        <Table
          dataSource={rampData}
          pagination={false}
          columns={ramp_table_columns(handleRampDrawer)}
          scroll={{ x: 980 }}
        />
      </div>

      <RampDrawer drawerData={drawerData} setDrawerData={setDrawerData} setRampLoading={setRampLoading} />
    </div>
  );
};

export default Page;
