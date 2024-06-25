import { IChecklist } from "@/app/types/vehicle-checklist";
import React from "react";

type Props = {
  levelData: IChecklist;
};

const VehicleCheckListLevelViewContainer = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {props.levelData.categories.map((category, index) => {
          return (
            <div key={index} className="p-3 border">
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <ul className="px-3">
                {category.tasks.map((el, _index) => {
                  return (
                    <li key={_index} className="list-disc text-md  font-medium">
                      {el.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleCheckListLevelViewContainer;
