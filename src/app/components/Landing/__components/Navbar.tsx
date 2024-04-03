import { Button, Flex } from 'antd';
import Image from 'next/image';

type Props = {}

const LandingNavbar = (props: Props) => {
  return (
    <Flex justify='space-between' align='center' className=' w-full'>
        <Image
            src={"/images/logo-1.png"}
            alt='Logo'
            height={50}
            width={200}
        />
        <Flex justify='space-between' className=''>
            <Button size='large' type='link'  href='/dashboard'><span className='text-lg text-customYellow text-opacity-80 hover:text-opacity-70 duration-200 transition-all'>Book an Appointment</span></Button>
            <Button size='large' type='link'  href='/login'><span className='text-lg text-customLightGray hover:text-opacity-85'>Login</span></Button>
        </Flex>
    </Flex>
  )
}

export default LandingNavbar