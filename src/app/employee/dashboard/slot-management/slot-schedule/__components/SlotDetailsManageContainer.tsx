"use client";

import React from "react";
import { Button, Col, Input, Row, Typography } from "antd";
import { Control, Controller, useFieldArray, } from "react-hook-form";

import { TSlotScheduleManage } from "@/app/validators/slot-schedule";
import { NEW_SLOT_SCHEDULE_INITIAL_DATA } from "../__utils/constant";
type Props = {
  control: Control<TSlotScheduleManage, any>,
  errors:any
};



const SlotDetailsManageContainer = (props: Props) => {

  const { fields, append, remove, } = useFieldArray({
    control: props.control,
    name: "slot_details"
  });
  const addSlotDetail = () => {
    append(NEW_SLOT_SCHEDULE_INITIAL_DATA.slot_details)
  };
  const removeSlotDetail = (toDeleteIndex: number) => {
    remove(toDeleteIndex)
  };

  return (
    <div className="w-full">
      <Typography className="mb-4 font-semibold">Slot Details</Typography>

      {
        fields.map((slot_details, index) => {
          return <div key={slot_details.id} className="mb-8">

            <div className="flex justify-between items-center mb-2">
            <Typography className="p-2 py-1 font-semibold bg-yellow-100 border rounded-lg inline-block">Slot : {index + 1}</Typography>
            <div className="flex justify-end">
              <Button
                type="primary"
                danger
                onClick={(e) => {
                  removeSlotDetail(index);
                }}
              >
                Remove
              </Button>
            </div>

            </div>
            <div className="mb-4">
              <Typography className="font-semibold mb-2">Start Time</Typography>
              <Row gutter={16}>
                <Col span={12}>
                  <label className='mb-2 block text-black1' htmlFor="name">Hour</label>
                  <Controller
                    name={`slot_details.${index}.start_time.hour`}
                    control={props.control}
                    render={({ field }) => {
                      return <Input {...field} type="number" placeholder="Enter Hour" min={0} max={24} />
                    }} />
                    {props.errors?.slot_details && <span className="text-xs text-red-500">{props.errors?.slot_details[index]?.start_time?.hour?.message}</span>}
                </Col>
                <Col span={12}>
                  <label className='mb-2 block text-black1' htmlFor="name">Minute</label>
                  <Controller
                    name={`slot_details.${index}.start_time.minute`}
                    control={props.control}
                    render={({ field }) => {
                      // {field.}
                      return <Input {...field} type="number" placeholder="Enter Minute" min={0} max={59}/>
                    }} />
                    {props.errors?.slot_details?.[index]?.start_time?.minute && <span className="text-xs text-red-500">{props.errors?.slot_details[index]?.start_time.minute?.message}</span>}
                </Col>
              </Row>
            </div>
            <div className="mb-4">
              <Typography className="font-semibold mb-2">End Time</Typography>
              <Row gutter={16}>
                <Col span={12}>
                  <label className='mb-2 block text-black1' htmlFor="name">Hour</label>
                  <Controller
                    name={`slot_details.${index}.end_time.hour` as const}
                    control={props.control}
                    render={({ field }) => {
                      return <Input {...field} type="number" placeholder="Enter Hour" />
                    }} />
                </Col>
                <Col span={12}>
                  <label className='mb-2 block text-black1' htmlFor="name">Minute</label>
                  <Controller
                    name={`slot_details.${index}.end_time.minute`}
                    control={props.control}
                    render={({ field }) => {
                      return <Input {...field} type="number" placeholder="Enter Hour" />
                    }} />
                </Col>
              </Row>
            </div>

            <Row className="w-full">
              <label className="font-semibold mb-2" htmlFor="Limit">Limit</label>
              <Controller
                name={`slot_details.${index}.slot_limit`}
                control={props.control}
                render={({ field }) => {
                  return <Input {...field} type="number" placeholder="Enter Limit" />
                }} />
            </Row>
          </div>
        })
      }

      <div className="flex justify-end">
        <Button
          onClick={addSlotDetail}
          className="bg-black1 border hover:outline-black1 hover:border-black1 text-white1 font-medium text-md"
        >
          Add More
        </Button>
      </div>
    </div>
  );
};

export default SlotDetailsManageContainer;
