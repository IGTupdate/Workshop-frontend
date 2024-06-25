"use client";

import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { createCheckListForWorkOrder } from "@/app/services/operations/workorder/workorder";
import { TVehicle } from "@/app/types/vehicle";
import { IVehicleChecklist } from "@/app/types/vehicle-checklist";
import {
  vehicleChecklistStatusEnum,
  vehicleTypeEnum,
} from "@/app/utils/constants/checklistenum";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { TworkOrderCheckListYupSchema } from "@/app/validators/vehicle-checklist";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VehicleCheckListBasedOnTypeContainer from "../../__components/vehicle_checklist/VehicleCheckListBasedOnTypeContainer";
import CheckListContainer from "../../check/[vehicleCheckListId]/__components/CheckListContainer";
import { IWorkorderChecklist } from "@/app/types/workorder-checklist";
import Loader from "@/app/components/Loader";

const { Title } = Typography;

type Props = {
  workOrderVehicle: TVehicle | null;
  workOrdeId: string;
  workOrderChecklist?: Record<string, string | IWorkorderChecklist>;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
};

const PrepareVehicleCheck = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [vehicleCheckLists, setVehicleCheckLists] = useState<
    IVehicleChecklist[]
  >([]);

  const [workOrderInitialChecklist, setWorkOrderInitialChecklist] =
    useState<IWorkorderChecklist | null>();
  const [checkListToBePerFormed, setCheckListToBePerformed] =
    useState<TworkOrderCheckListYupSchema | null>(null);

  console.log(props.workOrderChecklist);

  useEffect(() => {
    if (
      props.workOrderChecklist &&
      props.workOrderChecklist["initial"] &&
      typeof props.workOrderChecklist["initial"] !== "string"
    ) {
      setWorkOrderInitialChecklist(props.workOrderChecklist["initial"]);
    }

    loadAllCheckList();
  }, []);

  useEffect(() => {
    if (workOrderInitialChecklist) {
      setCheckListToBePerformed(() => {
        return {
          type: "initial",
          checklist: {
            checklist: workOrderInitialChecklist.checklist.map((level) => {
              return {
                categories: level.categories.map((category) => {
                  return {
                    name: category.name,
                    tasks: category.tasks.map((task) => {
                      return {
                        name: task.name,
                        status: task.status as vehicleChecklistStatusEnum,
                        description: {
                          images: task.description?.images || [],
                          text: task.description?.text || "",
                        },
                      };
                    }),
                  };
                }),
                level: level.level,
              };
            }),
            remarks: workOrderInitialChecklist.remarks || [],
            vehicle: workOrderInitialChecklist.vehicle,
          },
        };
      });
    }
  }, [workOrderInitialChecklist]);

  const loadAllCheckList = async () => {
    setLoading(true);
    try {
      const response = await getAllVehicleCheckList("type=initial");
      console.log(response);
      setVehicleCheckLists(response.data as IVehicleChecklist[]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelecteCheckListToBePerformed = (checkListId: string) => {
    const selectedCheckList = vehicleCheckLists.find(
      (el) => el._id === checkListId,
    );
    if (!selectedCheckList) {
      return;
    }
    setCheckListToBePerformed({
      type: selectedCheckList.type,
      checklist: {
        checklist: selectedCheckList.checklist.map((level) => {
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
  };

  const handleSaveCheckList = async (data: TworkOrderCheckListYupSchema) => {
    try {
      const response = await createCheckListForWorkOrder(
        props.workOrdeId as string,
        data,
      );
      if (response) {
        toast.success("Inital Check Saved Successfully");
        props.setSteps("2");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    }
  };

  return (
    <div>
      <div className="my-4 flex justify-between">
        <Title level={4}>Perform Check on Vehicle</Title>

        {checkListToBePerFormed && (
          <Button
            type="primary"
            onClick={() => {
              setCheckListToBePerformed(null);
            }}
          >
            Change CheckList
          </Button>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {checkListToBePerFormed ? (
            <div>
              <CheckListContainer
                workorderId={props.workOrdeId}
                vehicleCheckList={checkListToBePerFormed}
                handleOnCheckListSave={handleSaveCheckList}
              />
            </div>
          ) : (
            <div>
              <VehicleCheckListBasedOnTypeContainer
                heading="All Available Checks"
                checkListItem={vehicleCheckLists}
                onCheckListSelect={handleSelecteCheckListToBePerformed}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PrepareVehicleCheck;
