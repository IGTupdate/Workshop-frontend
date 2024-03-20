import LeftSection from '@/app/components/Auth/LeftSection'
import React from 'react'
import RightSection from './__components/RightSection'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="w-full h-full flex md:flex-row flex-col">
                <div className="xl:w-[60%] lg:w-[55%] md:w-1/2 w-full md:h-full h-[220px]">
                    <LeftSection primaryText="Welcome To Workshop" secondaryText="We value your contribution for us" />
                </div>
                <div className="md:flex-auto md:h-full">
                    <RightSection />
                </div>
            </div>
        </div>
    )
}

export default page