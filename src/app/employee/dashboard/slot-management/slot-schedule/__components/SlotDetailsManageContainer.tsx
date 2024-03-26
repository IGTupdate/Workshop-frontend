"use client";

import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { TSlotDetail } from "@/app/types/slot-schedule";
const { Option } = Select;

type Props = {};

const SlotDetailsManageContainer = (props: Props) => {
  const [slotDetails, setSlotDetails] = useState([
    {
      startTime: {
        hour: 10,
        minute: 50,
      },
      endTime: {
        hour: 12,
        minute: 25,
      },
      slot_limit: 5,
    },
    {
      startTime: {
        hour: 10,
        minute: 50,
      },
      endTime: {
        hour: 12,
        minute: 25,
      },
      slot_limit: 5,
    },
  ]);

  const addSlotDetail = () => {
    setSlotDetails((prv) => {
      return [
        ...prv,
        {
          startTime: {
            hour: 10,
            minute: 50,
          },
          endTime: {
            hour: 12,
            minute: 25,
          },
          slot_limit: 5,
        },
      ];
    });
  };

  const removeSlotDetail = (toDeleteIndex: number) => {
    setSlotDetails((prv) => {
      return prv.filter((slot, index) => {
        return toDeleteIndex !== index;
      });
    });
  };

  return (
    <div className="w-full">
      <Typography className="mb-2">Slot Details</Typography>

      {/* slots */}
      {slotDetails.map((slot, index) => {
        return (
          <div>
            <Typography>Slot : {index + 1}</Typography>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="hour"
                  label="Hour"
                  className="m-0"
                  rules={[
                    { required: true, message: "Please enter user name" },
                  ]}
                >
                  <Input type="number" placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="minute"
                  label="Minute"
                  className="m-0"
                  rules={[
                    { required: true, message: "Please enter user name" },
                  ]}
                >
                  <Input type="number" placeholder="Please enter user name" />
                </Form.Item>
              </Col>
            </Row>

            <Row className="w-full">
              <Form.Item
                className="w-full"
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please enter Schedule name" },
                ]}
              >
                <Input placeholder="Please enter Schedule name" />
              </Form.Item>
            </Row>

            <div className="mb-2 flex justify-end">
              <button
                className="text-red-500"
                type="button"
                onClick={(e) => {
                  removeSlotDetail(index);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex justify-end">
        <Button
          onClick={addSlotDetail}
          className="bg-black1 border hover:border-black1 text-white1 font-medium text-md"
        >
          Add More
        </Button>
      </div>
    </div>
  );
};

export default SlotDetailsManageContainer;
