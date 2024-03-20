import Heading from '@/app/components/Heading'
import { Button, Input } from 'antd'
import React from 'react'

type Props = {}

const LogIn = (props: Props) => {
    return (

        <div className="w-full">
            <Heading
                type='heading1'
                primary={"Log in"}
                secondary={"Join Us: Log in for Seamless Integration"}
                primaryColor='text-black1'
            />
            <form className='w-full md:mt-10 mt-8'>
                {/* input field */}
                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Email</label>
                    <Input type='text'
                        size='large'
                        placeholder="Enter email"
                        className='w-full text'
                    />
                    {/* {errors.contactNumber && <span className='text-red-500 text-[11px] font-medium'>{errors.contactNumber.message}</span>} */}
                </div>

                {/* input field */}
                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Password</label>
                    <Input type='text'
                        size='large'
                        placeholder="Enter password"
                        className='w-full text'
                    />
                    {/* {errors.contactNumber && <span className='text-red-500 text-[11px] font-medium'>{errors.contactNumber.message}</span>} */}
                </div>

                <Button
                    size='large'
                    htmlType='submit'
                    className='bg-blue1 text-white1 font-semibold w-full'>
                    Log in
                </Button>

            </form>
        </div>
    )
}

export default LogIn