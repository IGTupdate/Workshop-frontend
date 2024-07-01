"use client";

import { useEffect, useState } from "react";
import CheckListContainer from "./CheckListContainer";
import { demodata } from "../../../__components/vehicle_checklist/demodata";
import { IVehicleChecklist } from "@/app/types/checklist";
import { Typography } from "antd";
import {
  IWorkorderChecklist,
  IWorkorderChecklistTask,
} from "@/app/types/workorder-checklist";
import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { useParams } from "next/navigation";
import {
  vehicleChecklistStatusEnum,
  vehicleTypeEnum,
} from "@/app/utils/constants/checklistenum";
import Loader from "@/app/components/Loader";

const { Title } = Typography;

type Props = {};

const VehicleCheckListContainer: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const [mechanicCheckList, setMechanicCheckList] =
    useState<IWorkorderChecklist | null>(null);

  const params = useParams();

  useEffect(() => {
    loadMechanicCheckList();
  }, []);

  const loadMechanicCheckList = async () => {
    setMechanicCheckList(demodata);
    try {
      console.log(params);
      const response = await getAllVehicleCheckList(
        `_id=${params.vehicleCheckListId}`,
      );

      if (response.data.length) {
        const vehicleChecklist = response.data[0] as IVehicleChecklist;
        setMechanicCheckList({
          checklist: vehicleChecklist.checklist.map((level) => {
            return {
              level: level.level,
              categories: level.categories.map((category) => {
                return {
                  name: category.name,
                  // ...category,
                  tasks: category.tasks.map((task) => {
                    return {
                      name: task.name,
                      status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
                      description: {
                        images: [],
                        text: "",
                      },
                    } as IWorkorderChecklistTask;
                  }),
                };
              }),
            };
          }),
          vehicle: {
            type: vehicleTypeEnum.CAR,
            brand: "",
            model: "",
          },
        });
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <CheckListContainer
                mechanicCheckList={demodata}
            /> */}

      {/* {
        loading ? <Loader /> : */}
      <div>
        <div className="mb-4">
          <Title level={4}>Perform Check on Vehicle</Title>
        </div>

        {mechanicCheckList ? (
          <CheckListContainer vehicleCheckList={mechanicCheckList} />
        ) : (
          <div>No Checklist found</div>
        )}
      </div>
      {/* } */}
    </div>
  );
};

export default VehicleCheckListContainer;
