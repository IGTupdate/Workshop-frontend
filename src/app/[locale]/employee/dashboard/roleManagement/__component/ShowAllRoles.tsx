import React from "react";

type props = {
  action: string;
  resource: string;
  role: string;
  id: string;
};

const ShowAllRoles = ({ action, resource, role, id }: props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-2 capitalize">
        {action} {resource.split("_").join(" ")}
      </h3>
      <p className="text-gray-700">
        <strong>Access ID:</strong> {id}
      </p>
    </div>
  );
};

export default ShowAllRoles;
