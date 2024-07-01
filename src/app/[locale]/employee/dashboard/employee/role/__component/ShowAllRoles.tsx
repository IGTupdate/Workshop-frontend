import React from "react";

interface ActionItem {
  _id: string;
  action: string;
  fields: any[];
  role: string;
  accessProvided: boolean;
}
type props = {
  resource: string;
  actions: ActionItem[];
  index: number;
};

const ShowAllRoles = ({ resource, actions, index }: props) => {
  return (
    <div className={`p-6 rounded-lg shadow-md border bg-white border-gray-200`}>
      <h3 className="text-xl font-semibold mb-2 capitalize">
        {resource.split("_").join(" ")}
      </h3>

      <div className="mt-3">
        {actions.map((action) => (
          <div
            key={action._id}
            className="flex justify-between items-center border-b border-gray-200 py-2"
          >
            <div
              className={`${action?.accessProvided ? "text-black" : "text-red-400"}`}
            >
              <p className="text-sm capitalize">
                <strong>Action:</strong> {action.action}
              </p>
              {/* <p className="text-sm text-gray-700"><strong>Role:</strong> {action.role}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllRoles;
