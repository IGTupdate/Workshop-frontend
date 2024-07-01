"use client";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import ToolViewPageContainer from "./__components/ToolViewPageContainer";

const Page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold">Tools</h2>
        <Link href={`/employee/dashboard/tool/create`}>
          <Button type="primary">Enter Tool</Button>
        </Link>
      </div>

      <div className="mb-4 flex justify-end">
        <div>
          <Button type="primary">Clear Filter</Button>
        </div>
      </div>
      <div>
        <ToolViewPageContainer />
      </div>
    </div>
  );
};

export default Page;
