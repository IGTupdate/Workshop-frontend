import React from "react";
import UpdateTasks from "./update/page";

const Page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-white rounded-xl p-4">
        <h2 className="text-xl font-semibold">Update Tasks</h2>
      </div>
      <UpdateTasks />
    </div>
  );
};

export default Page;
