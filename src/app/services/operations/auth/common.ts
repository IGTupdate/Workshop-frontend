import { RootState } from "@/app/store/store";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { apiConnector } from "../../apiConnector";
import { authEndpoints } from "../../apis";
import { setAuthData } from "@/app/store/slices/authSlice";
import { setAccessData } from "@/app/store/slices/accessSlice";

const { GET_CUSTOMER_AUTH_INIT } = authEndpoints;

export const getCustomerAuthInitData =
  (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    try {
      const response = await apiConnector({
        method: "GET",
        url: GET_CUSTOMER_AUTH_INIT,
      });

      if (response.data.success) {
        dispatch(setAuthData(response.data.data.user));
        dispatch(setAccessData(response.data.data.access));
      }
    } catch (err) {}
  };
