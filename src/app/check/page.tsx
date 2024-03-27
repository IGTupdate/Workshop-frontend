"use client"

import { createSlotSchedule } from "../services/operations/appointment/slotSchedule";

const data = {
    "name": "Regular Schedule",
    "total_slots": 3,
    "slot_details": [
        {
            "start_time": { "hour": 10, "minute": 0 },
            "end_time": { "hour": 12, "minute": 0 },
            "slot_limit": 5
        },
        {
            "start_time": { "hour": 10, "minute": 0 },
            "end_time": { "hour": 11, "minute": 0 },
            "slot_limit": 5
        },
         {
            "start_time": { "hour": 14, "minute": 0 },
            "end_time": { "hour": 15, "minute": 0 },
            "slot_limit": 5
        }
    ]
}

// Define the type for the slot schedule data
interface SlotScheduleData {
    name: string;
    total_slots: number;
    slot_details: {
        start_time: { hour: number; minute: number };
        end_time: { hour: number; minute: number };
        slot_limit: number;
    }[];
}

type FormData = {
    slotScheduleData: SlotScheduleData; // Correct type definition
};

export default function Check() {
    // Function to handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(data);
        try{
            const res = await createSlotSchedule(data)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Submit button */}
            <button type="submit">Submit</button>
        </form>
    );
}