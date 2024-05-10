"use client";
import React, { useEffect } from "react";
import { getCustomerAuthInitData } from "./services/operations/auth/common";
import { useAppDispatch } from "./store/reduxHooks";

const App = ({
  children,
  refreshToken,
}: Readonly<{
  children: React.ReactNode;
  refreshToken: string | undefined;
}>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (refreshToken) dispatch(getCustomerAuthInitData());
  }, []);

  return <>{children}</>;
};

export default App;
