import React from 'react';
import AddStarsToNumber from '../__utils/AddStarsToNumber';
import Image from 'next/image';
import MasterCard from '../../../../../public/images/mastercard.png';

const SliderContent = () => {
    return (
        <div className="flex flex-col justify-between bg-black rounded-xl p-4 h-28">
            <p className='text-white'>{AddStarsToNumber(1234567895532458)}</p>
            <div className="flex justify-between items-center">
                <p className='text-white'>Enrique H.</p>
                <Image src={MasterCard} alt='MasterCard' />
            </div>
        </div>
    );
};

export default SliderContent;
