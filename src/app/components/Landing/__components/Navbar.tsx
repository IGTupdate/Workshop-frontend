import { Button, Flex } from 'antd';
import Image from 'next/image';

type Props = {};

const LandingNavbar = (props: Props) => {
  return (
    <Flex align='center' gap='large' className='w-full flex-wrap bg-customGray p-4 justify-center sm:justify-between'>
      <Image
        src={"/images/logo-2.webp"}
        alt='Logo'
        height={55}
        width={150}
      />
      <Flex justify='space-between' align='center' className='flex-wrap' gap='large'>
        <Button size='large' type='link' href='/dashboard' className='h-max p-0'><span className='text-lg text-customYellow text-opacity-80 hover:text-opacity-70 duration-200 transition-all'>Book An Appointment</span></Button>
        <Button size='large' type='link' href='/login' className='h-max p-0'><span className='text-lg font-semibold leading-[25px] bg-customYellow py-2 px-4 rounded-xl text-white  hover:bg-opacity-85 transition-colors duration-200'>Login</span></Button>
      </Flex>
    </Flex>
  );
};

export default LandingNavbar;