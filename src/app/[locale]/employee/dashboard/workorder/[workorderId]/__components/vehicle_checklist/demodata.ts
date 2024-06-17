import { IVehicleChecklist } from "@/app/types/checklist";
import { IWorkorderChecklist } from "@/app/types/workorder-checklist";
import {
  vehicleChecklistStatusEnum,
  vehicleTypeEnum,
} from "@/app/utils/constants/checklistenum";

export const demodata: IWorkorderChecklist = {
  checklist: [
    {
      level: 1,
      categories: [
        {
          name: "Interior",
          tasks: [
            {
              name: "Tyre Status",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
            {
              name: "Tyre Back",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
          ],
        },
        {
          name: "Lights",
          tasks: [
            {
              name: "Head Light",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
            {
              name: "Back Light",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
          ],
        },
        {
          name: "Engine",
          tasks: [
            {
              name: "Carborator",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
          ],
        },
      ],
    },
    {
      level: 2,
      categories: [
        {
          name: "Interior",
          tasks: [
            {
              name: "Tyre Status",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
            {
              name: "Tyre Back",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
          ],
        },
        {
          name: "Lights",
          tasks: [
            {
              name: "Head Light",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
            {
              name: "Back Light",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
          ],
        },
        {
          name: "Engine",
          tasks: [
            {
              name: "Carborator",
              status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
              description: {
                text: "",
                images: [],
              },
            },
          ],
        },
      ],
    },
  ],
  vehicle: {
    type: vehicleTypeEnum.TRUCK,
    brand: "",
    model: "",
    year: 2010,
  },
};
