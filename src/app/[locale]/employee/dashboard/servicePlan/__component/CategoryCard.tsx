import { Badge, Card } from "antd";
import React from "react";
import { MdDelete } from "react-icons/md";

type props = {
  id: string;
  isActive?: boolean | undefined;
  showBadge: boolean | undefined;
  name: string;
  vehicle_type: string;
  onClick?: any;
};

const CategoryCard = ({
  id,
  isActive,
  showBadge,
  name,
  vehicle_type,
  onClick,
}: props) => {
  return (
    <Card className="w-full shadow-lg">
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-xl font-semibold capitalize">{name}</h2>
        {showBadge ? (
          <Badge
            status={isActive ? "processing" : "default"}
            text={isActive ? "Active" : "InActive"}
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex relative justify-between items-center">
        <p className="text-gray-600 capitalize">Vehicle Type: {vehicle_type}</p>
        {!showBadge && (
          <MdDelete
            size={20}
            color="red"
            onClick={(e) => onClick(e, id)}
            className="relative z-10"
          />
        )}
      </div>
    </Card>
  );
};

export default CategoryCard;
