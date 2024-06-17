import React from "react";
import { ChildrenProps } from "../__utils/types";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CustomerMobileFooter from "./CustomerMobileFooter";
import CustomMobileHeader from "./CustomMobileHeader";

const CustomerMobileDashboardLayout = ({ children }: ChildrenProps) => {
  return (
    <Layout>
      <CustomMobileHeader />
      <Content>{children}</Content>
      <CustomerMobileFooter />
    </Layout>
  );
};

export default CustomerMobileDashboardLayout;
