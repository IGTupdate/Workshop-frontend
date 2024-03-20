"use client"
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export default function StoreProvider({ children }: Props) {
  return <Provider store={store}>
    <Toaster/>
      {children}
    </Provider>;
}
