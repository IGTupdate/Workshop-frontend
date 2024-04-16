"use client"

import { getAppointmentByAppointmentId } from '@/app/services/operations/appointment/appointment'
import { TAppointment } from '@/app/types/appointment'
import React, { useEffect, useState } from 'react'
import AdvisorAvailabilityContainer from './EmployementAvailabilityContainer'
import AppointmentDetails from '@/app/components/Appointment/AppointmentDetails'
import Loader from '@/app/components/Loader'
import { Divider } from 'antd'
import { employeeRole } from '@/app/utils/constants/employee-roles'
import EmployementAvailabilityContainer from './EmployementAvailabilityContainer'
import WorkOrderAppointmentContiner from './WorkOrderAppointmentContiner'
import { TworkOrderCreate } from '@/app/validators/workorder'

type Props = {
    appointmentId: string | undefined
}

const CreateWorkOrder = (props: Props) => {

    const [workOrderCreateData, setWorkOrderCreateData] = useState<TworkOrderCreate>({
        appointmentId: "",
        advisorId: ""
    })



    return (
        <div>
            <WorkOrderAppointmentContiner appointmentId={props.appointmentId} />
            <EmployementAvailabilityContainer role={employeeRole.advisor} />
            <div>

            </div>
        </div>
    )
}

export default CreateWorkOrder