"use client";

import React, { useState } from "react";
import { Button, Drawer, Form, Input, Row, Select, Space } from "antd";
import SlotDetailsManageContainer from "./SlotDetailsManageContainer";

type Props = {
  openDrawer: string | null;
  setOpenDrawer: React.Dispatch<React.SetStateAction<string | null>>;
};

const SlotScheduleUpdateDrawer = (props: Props) => {
  // open drawer has of _id of the slot schedule which need to be edit and if it has new key word then the create new slot

  const closeDrwer = () => {
    props.setOpenDrawer(null);
  };

  const saveSlotSchedule = () => {
    console.log("saved");
  };

  return (
    <Drawer
      title="Create a new Schedule"
      width={480}
      onClose={closeDrwer}
      open={props.openDrawer !== null}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={closeDrwer}>Cancel</Button>
          <Button
            onClick={saveSlotSchedule}
            className="bg-blue1 text-white1 font-medium text-md"
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form className="w-full" layout="vertical" hideRequiredMark>
        <Row className="w-full">
          <Form.Item
            className="w-full"
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter Schedule name" }]}
          >
            <Input placeholder="Please enter Schedule name" />
          </Form.Item>
        </Row>

        <SlotDetailsManageContainer />
      </Form>
    </Drawer>
  );
};

export default SlotScheduleUpdateDrawer;
