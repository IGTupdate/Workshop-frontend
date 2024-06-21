"use client";

import { TActiveRamp, TRampDetails } from "@/app/types/ramp";
import { TRampManageSchema } from "@/app/validators/ramp";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Switch,
  Typography,
} from "antd";
import Link from "next/link";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { RAMP_INITIAL_DATA } from "../_utils/constants";
import {
  rampCreateApi,
  rampUpdateApi,
} from "@/app/services/operations/workorder/workorder";
import dayjs from "dayjs";
import Watermark from "@/app/components/Text/WatermarkText";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";

const { Text } = Typography;

type Props = {
  drawerData: TActiveRamp | null; // Provide a default value for drawerData
  setDrawerData: React.Dispatch<React.SetStateAction<TActiveRamp>>;
  setRampLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const RampDrawer = ({ drawerData, setDrawerData, setRampLoading }: Props) => {
  const closeDrawer = () => {
    setDrawerData(null);
  };

  const ability = useAbility();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(TRampManageSchema),
  });

  useEffect(() => {
    // console.log(drawerData)
    if (drawerData && drawerData.type === "ramp") {
      setValue("name", drawerData.value.name);
      setValue("location", drawerData.value.location || "");
      setValue("isActive", drawerData.value.isActive);
    } else if (drawerData && drawerData.type === "newramp") {
      setValue("name", RAMP_INITIAL_DATA.name);
      setValue("location", RAMP_INITIAL_DATA.location);
    }
  }, [drawerData]);

  const onSubmit = async (data: TRampDetails) => {
    // console.log(data, drawerData)
    if (!drawerData || drawerData.type === "workorder") return;
    if (drawerData.type === "newramp") {
      const res = await rampCreateApi(data);
      // console.log(res);
    } else {
      const res = await rampUpdateApi({ ...data, _id: drawerData.value._id });
      // console.log(res);
    }
    setRampLoading(true);
    closeDrawer();
  };

  console.log(ability && ability.can(casl_action.update, casl_subject.ramp));

  return (
    <Drawer
      title={
        drawerData && drawerData.type === "newramp"
          ? "Create New Ramp"
          : drawerData && drawerData.type === "ramp"
            ? "Update Ramp"
            : `Ramp Details`
      }
      width={480}
      onClose={closeDrawer}
      open={drawerData !== null}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      footer={
        <Space>
          {drawerData && drawerData.type !== "workorder" && (
            <Button onClick={closeDrawer}>Cancel</Button>
          )}
          {ability &&
            ability.can(casl_action.update, casl_subject.ramp) &&
            drawerData &&
            drawerData.type !== "workorder" && (
              <Button type="primary" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            )}
        </Space>
      }
    >
      <Form className="w-full" layout="vertical">
        {drawerData && drawerData.type !== "workorder" && (
          <Row className="w-full mb-4">
            <label
              className="font-medium mb-2 block text-black1"
              htmlFor="name"
            >
              Ramp Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <Input {...field} placeholder="Please enter Ramp Name" />
                );
              }}
            />
            {errors.name && <Text type="danger">{errors.name.message}</Text>}
          </Row>
        )}
        {drawerData && drawerData.type !== "workorder" && (
          <Row className="w-full mb-4">
            <label
              className="font-medium mb-2 block text-black1"
              htmlFor="name"
            >
              Location
            </label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => {
                return <Input {...field} placeholder="Please enter Location" />;
              }}
            />
          </Row>
        )}
        {drawerData && drawerData.type === "ramp" && (
          <Row className="w-full mb-4 flex gap-3">
            <label
              className="font-medium mb-2 block text-black1"
              htmlFor="name"
            >
              Is Active
            </label>
            <Switch
              className="bg-[rgba(0,0,0,0.45)]"
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={drawerData.value.isActive}
              onChange={() => {
                setDrawerData({
                  type: "ramp",
                  value: {
                    ...drawerData?.value,
                    name: getValues("name"),
                    location: getValues("location"),
                    isActive: !drawerData.value.isActive,
                  },
                });
              }}
            />
            <p>{drawerData.value.isActive ? "true" : "false"}</p>
          </Row>
        )}
        {drawerData && drawerData.type === "workorder" && drawerData.value && (
          <div>
            <label
              className="font-medium mb-2 block text-black1"
              htmlFor="name"
            >
              Assigned Work Orders
            </label>
            {drawerData.value.map((ele, i) => (
              <div key={i} className="flex justify-between items-center pb-4">
                <div
                  className={`flex w-1/2 flex-col ps-6 relative before:content-[''] before:absolute ${drawerData.value.length - 1 === i ? "before:h-0" : "before:h-full"} before:w-[1px] before:bg-slate-300 before:left-[0.2em] before:top-[1.15rem]
                                                              `}
                >
                  <h3 className='font-medium relative before:content-[""] before:absolute before:h-2 before:w-2 before:rounded-full before:bg-customYellow before:left-[-1.8em] before:top-1/2 before:translate-y-[-50%]'>
                    OrderId
                  </h3>
                  <Link href={`/employee/dashboard/workorder/${ele._id}`}>
                    {ele.orderNumber}
                  </Link>
                </div>
                <div className="flex w-1/2 flex-col">
                  <h3 className="font-medium">Estimated Time of Completion</h3>
                  <p>
                    {ele.estimatedTimeOfCompletion
                      ? dayjs(ele.estimatedTimeOfCompletion).format(
                          "DD-MM-YYYY hh:mm A",
                        )
                      : "Time is unavailable"}
                  </p>
                </div>
              </div>

              // <Card key={i} className=" my-4 ">
              //   <p>
              //     OrderId: &nbsp;
              //     <Link href={`/employee/dashboard/workorder/${ele._id}`}>
              //       {ele.orderNumber}
              //     </Link>
              //   </p>
              //   {ele.estimatedTimeOfCompletion && <p>Estimated Time of Completion: {dayjs(ele.estimatedTimeOfCompletion).format('DD-MM-YYYY hh:mm A')}</p>}
              // </Card>
            ))}
            {drawerData.value.length === 0 && (
              <div className="relative mt-8">
                <Watermark text="No Work Orders Assigned" />
              </div>
            )}
          </div>
        )}
      </Form>
    </Drawer>
  );
};

export default RampDrawer;
