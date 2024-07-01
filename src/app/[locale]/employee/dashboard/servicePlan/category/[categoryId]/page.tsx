import React from "react";
import UpdateCategory from "./update/page";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-white rounded-xl p-4">
        <h2 className="text-xl font-semibold">Update Category</h2>
      </div>
      <UpdateCategory />
    </div>
  );
};

export default page;
