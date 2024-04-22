import React from 'react';

export type THeadingStyle1Props = {
    type: "heading1",
    primary: string,
    secondary?: string,
    primaryColor?: string,
    secondaryColor?: string,

};


// custom heading cumponent to use acrosss the applicaiton having text-black1 and text-gray1 as default text colors
const HeadingStyle1 = (props: THeadingStyle1Props) => {
    return (
        <div className={`${props.primaryColor || "text-black1"} mb-4`}>

            {/* primary heading */}
            <h2 className='lg:text-4xl text-2xl font-semibold mb-1'>{props.primary}</h2>

            {/* secondary heading */}
            {
                props?.secondary &&
                <p className={`${props.secondaryColor || "text-gray1"} text-sm font-medium`}>
                    {props.secondary}
                </p>
            }
        </div>
    );
};

export default HeadingStyle1;