import * as yup from "yup";

export const EnterTool = yup.object({
  name: yup.string().required(),
  category: yup.string().required(),
  location: yup.string().required(),
  initialStatus: yup.string().required(),
  quantity: yup.number().required(),
});

export type TEnterTool = yup.InferType<typeof EnterTool>;
