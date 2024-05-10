import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICaslData {
  action: string[];
  subject: string /** an array of fields to which user has (or not) access */;
  fields?: string[] /** an object of conditions which restricts the rule scope */;
  conditions?: any /** indicates whether rule allows or forbids something */;
  inverted?: boolean /** message which explains why rule is forbidden */;
  reason?: string;
}

interface IAccessSlice {
  accessData: ICaslData[] | [];
  accessLoading: boolean;
}

const initialState: IAccessSlice = {
  accessData: [],
  accessLoading: false,
};

export const accessDataSlice = createSlice({
  name: "accessData",
  initialState,
  reducers: {
    setAccessLoading: (state, action: PayloadAction<boolean>) => {
      state.accessLoading = action.payload;
    },
    setAccessData: (state, action: PayloadAction<ICaslData[] | []>) => {
      state.accessData = action.payload;
    },
  },
});

export const { setAccessLoading, setAccessData } = accessDataSlice.actions;
export const accessReducer = accessDataSlice.reducer;
