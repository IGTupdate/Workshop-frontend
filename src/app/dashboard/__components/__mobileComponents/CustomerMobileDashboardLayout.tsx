import React from 'react'
import { ChildrenProps } from '../__utils/types'
import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'

const CustomerMobileDashboardLayout = ({ children }: ChildrenProps) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default CustomerMobileDashboardLayout