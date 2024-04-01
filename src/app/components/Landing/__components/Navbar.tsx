import { Button, Flex } from 'antd';
import Image from 'next/image';

type Props = {}

const LandingNavbar = (props: Props) => {
  return (
    <Flex justify='space-between' className=' w-full'>
        <Image
            src={"/images/Logo.png"}
            alt='Logo'
            height={50}
            width={200}
        />
        <Flex justify='space-between' className=''>
            <Button size='large' type='link'  href='/dashboard'><span className='text-lg text-red-400 hover:text-red-300 duration-200 transition-all'>Book an Appointment</span></Button>
            <Button size='large' type='link'  href='/login'><span className='text-lg'>Login</span></Button>
        </Flex>
    </Flex>
  )
}

export default LandingNavbar