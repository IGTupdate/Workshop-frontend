'use client';
import { Flex, Layout } from 'antd';
import React, { useEffect, useRef } from 'react';
import LandingNavbar from './__components/Navbar';
import SlotSchedule from './__components/SlotSchedule';
import SlotDetails from './__components/SlotDetails';
import { useAppSelector } from '@/app/store/reduxHooks';
import EmployeeLogin from './__components/EmployeeLogin';
import AboutUsFooter from './__components/AboutUs';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  // Ref for the SlotDetails component
  const slotDetailsRef = useRef<HTMLDivElement>(null);
  const slotData = useAppSelector((state) => state.slot.slotData);

  // Function to scroll to SlotDetails component
  const scrollToSlotDetails = () => {
    if (slotDetailsRef.current) {
      slotDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* <Header className='flex items-center justify-center w-full bg-customGray mb-0'> */}
      <LandingNavbar />
      {/* </Header> */}
      <Content>
        <Flex vertical>
          <SlotSchedule scrollToSlotDetails={scrollToSlotDetails} />
          <div ref={slotDetailsRef} className={`${slotData ? "h-screen flex justify-center items-center flex-col" : " invisible"}`}>
            {(<div>
              <SlotDetails />
            </div>)
            }
          </div>
          <EmployeeLogin />
        </Flex>
      </Content>
      <Footer className=' p-0 mt-[100px]'>
        <AboutUsFooter />
      </Footer>
    </Layout>
  );
};

export default App;
