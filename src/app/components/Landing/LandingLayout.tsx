'use client'
import { Flex, Layout } from 'antd';
import React, { useEffect, useRef } from 'react';
import LandingNavbar from './__components/Navbar';
import SlotSchedule from './__components/SlotSchedule';
import SlotDetails from './__components/SlotDetails';
import { useAppSelector } from '@/app/store/reduxHooks';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  // Ref for the SlotDetails component
  const slotDetailsRef = useRef<HTMLDivElement>(null);
  const slotData = useAppSelector((state) => state.slot.slotData)

  // Function to scroll to SlotDetails component
  const scrollToSlotDetails = () => {
    if (slotDetailsRef.current) {
      slotDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <Header className='flex items-center justify-center w-full h-20'>
        <LandingNavbar/>
      </Header>
      <Content>
        <Flex vertical gap={100}>
          <SlotSchedule scrollToSlotDetails={scrollToSlotDetails} />
          { slotData && (<div ref={slotDetailsRef}>
              <SlotDetails/>
            </div>)
          }
        </Flex>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default App;
