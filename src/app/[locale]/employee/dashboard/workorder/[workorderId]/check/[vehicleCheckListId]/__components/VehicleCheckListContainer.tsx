"use client";

import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { IVehicleChecklist } from "@/app/types/vehicle-checklist";
import {
  vehicleChecklistStatusEnum,
  vehicleTypeEnum,
} from "@/app/utils/constants/checklistenum";
import { TworkOrderCheckListYupSchema } from "@/app/validators/vehicle-checklist";
import { Typography } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckListContainer from "./CheckListContainer";
import Loader from "@/app/components/Loader";
import { createCheckListForWorkOrder } from "@/app/services/operations/workorder/workorder";
import toast from "react-hot-toast";
import { COMMON_ERROR } from "@/app/utils/constants/constant";

const { Title } = Typography;

type Props = {};

const VehicleCheckListContainer: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const [mechanicCheckList, setMechanicCheckList] =
    useState<TworkOrderCheckListYupSchema | null>(null);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    loadMechanicCheckList();
  }, []);

  const loadMechanicCheckList = async () => {
    // setMechanicCheckList(demodata);
    try {
      console.log(params);
      const response = await getAllVehicleCheckList(
        `_id=${params.vehicleCheckListId}`,
      );

      if (response.data.length) {
        const vehicleChecklist = response.data[0] as IVehicleChecklist;
        setMechanicCheckList({
          type: "technical",
          checklist: {
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
                      };
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
            remarks: [],
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

  console.log(mechanicCheckList);

  const handleOnCheckListSave = async (data: TworkOrderCheckListYupSchema) => {
    try {
      console.log(data);

      const response = await createCheckListForWorkOrder(
        params.workorderId as string,
        data,
      );
      if (response) {
        toast.success("CheckList Saved");

        router.push(`/employee/dashboard/workorder/${params.workorderId}`);
      } else throw "";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || COMMON_ERROR);
      console.log(err);
    }
  };

  return (
    <div>
      {/* <CheckListContainer
                mechanicCheckList={demodata}
            /> */}

      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="mb-4">
            <Title level={4}>Perform Check on Vehicle</Title>
          </div>

          {mechanicCheckList ? (
            <CheckListContainer
              vehicleCheckList={mechanicCheckList}
              workorderId={(params.workorderId as string) || ""}
              handleOnCheckListSave={handleOnCheckListSave}
            />
          ) : (
            <div>No Checklist found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleCheckListContainer;
