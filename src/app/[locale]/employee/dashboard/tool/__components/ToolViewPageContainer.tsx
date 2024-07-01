import { Table } from "antd";
import React from "react";
import { toolData } from "../utils/fake";
import { ToolColumns } from "./ToolColumns";

const ToolViewPageContainer = () => {
  return (
    <div>
      <div className="overflow-hidden rounded-xl shadow-xl">
        <Table
          scroll={{ x: 980 }}
          pagination={false}
          dataSource={toolData}
          columns={ToolColumns()}
        />
      </div>
    </div>
  );
};

export default ToolViewPageContainer;
