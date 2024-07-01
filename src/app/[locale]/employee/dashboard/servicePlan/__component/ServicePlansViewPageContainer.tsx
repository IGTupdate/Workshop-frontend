import { Table } from "antd";
import React from "react";
import { ServicePlansTableContainer } from "./ServicePlansTabelColumns";
import { TServicePlans } from "@/app/types/service";

type props = {
  servicePlans: TServicePlans[];
};

const ServicePlansViewPageContainer = ({ servicePlans }: props) => {
  return (
    <div className="overflow-hidden rounded-xl shadow-xl">
      <Table
        scroll={{ x: 980 }}
        pagination={false}
        dataSource={[...servicePlans].reverse()}
        columns={ServicePlansTableContainer()}
      />
    </div>
  );
};

export default ServicePlansViewPageContainer;
