import React from 'react';
import { IoIosCheckmark } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { minutesToHoursConverter, PriceCalculator } from '@/app/utils/helper';



interface Task {
    name: string,
    price: number,
    // Add any other properties of a task here
}

interface Category {
    name: string,
    // Add any other properties of a category here
}

interface Plan {
    _id: string,
    name: string,
    description: string[],
    price: number,
    duration?: string, // Assuming duration is in minutes
    category: Category,
    tasks?: Task[],
    // Add any other properties of a plan here
}

interface Props {
    plan: Plan;
}

const ServicePlans: React.FC<Props> = ({ plan }) => {
    return (
        <div key={plan._id}>

            {/* category */}
            <p className='mb-4 text-3xl font-bold'>{plan.category.name}</p>

            <div className='bg-white p-4 pt-8 sm:pt-4 rounded-xl shadow-lg mb-4 relative'>

                {/* bag */}
                {
                    plan.duration && <div className="flex items-center gap-2 absolute right-0 top-0 sm:top-5 p-2 py-1 bg-slate-400 text-white">
                        <IoMdTime className='text-lg' />
                        <p className='text-base'>{minutesToHoursConverter(plan.duration)} Hrs Taken</p>
                    </div>
                }

                {/* heading */}
                <div className="heading">
                    <h3 className='font-bold text-2xl'>{plan.name}</h3>
                    <p className='font-semibold text-lg'>{plan.description}</p>
                </div>

                {/* tasks */}
                {plan?.tasks?.length > 0 && <div className="flex flex-wrap justify-between items-center mt-4">
                    {plan?.tasks.map(task => (
                        <p className='w-1/2 flex items-center gap-2' key={task.name}><span className='flex flex-wrap justify-center items-center h-[15px] w-[15px] rounded-full bg-green-200'><IoIosCheckmark className='text-green-400 text-lg' /></span> <span>{task.name}</span></p>
                    ))}
                </div>}

                {/* price */}
                <p className='flex items-center gap-2 mt-4'>
                    <span className='line-through text-base font-semibold text-antGreay'>
                        ₹ {PriceCalculator(plan.price)}
                    </span>
                    <span className='text-xl font-semibold'>₹ {plan.price}</span></p>

            </div>
        </div>
    );
};

export default ServicePlans;
