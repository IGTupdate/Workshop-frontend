"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "../store/reduxHooks";
import { getCustomerAuthInitData } from "../services/operations/auth/common";

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