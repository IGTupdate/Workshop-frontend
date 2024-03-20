import React from 'react';
import Image from 'next/image';
import Heading from '@/app/components/Heading';

type Props = {
    primaryText: string,
    secondaryText: string
}

const LeftSection = (props: Props) => {
    return (
        <div className='w-full md:h-full h-[135%] relative object-cover overflow-hidden text-white1 bg-black1'>

            <Image
                src={"/images/auth-side-img.jpg"}
                alt='auth-side-img'
                fill={true}
                className='object-cover absolute z-[0]'
            />
            <div className='w-full h-full absolute z-[1] bg-[rgba(0,0,0,0.7)]'>
                <div className='w-full h-full flex justify-center items-center'>
                    <div>
                        <Heading
                            type="heading1"
                            primary={props.primaryText}
                            secondary={props.secondaryText}
                            primaryColor='text-white1'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSection