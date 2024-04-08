import { Button } from 'antd'
import React from 'react'

type Props = {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const CustomerDetailContainer = (props: Props) => {
    return (
        <div>

            CustomerDetailContainer

            <Button onClick={() => {
                props.setCurrentStep(2);
            }}>Proceed for now as demo customer</Button>
        </div>
    )
}

export default CustomerDetailContainer