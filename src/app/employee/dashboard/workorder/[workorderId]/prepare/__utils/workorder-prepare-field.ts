export const workorder_prepare_input_field = [
    {
        name: "servicePlan",
        label: "Service Plan",
        placeholder: " ",
        type: "select",
        options: [
            {
                value: "Periodic",
                label: "Periodic"
            },
            {
                value: "Custom",
                label: "Custom"
            }
        ]
    },
    {
        name: "estimatedCost",
        label: "Estimated Cost",
        placeholder: "50 ",
        type: "text",
    },
    {
        name: "estimatedTimeOfCompletion",
        label: "Time of Completion",
        placeholder: "14:00 ",
        type: "date-time",
    },
    {
        name: "notes",
        label: "Notes",
        placeholder: "Write query",
        type: "textarea",
    },
    {
        name: "observations",
        label: "Observations",
        placeholder: "Vehicle Observations",
        type: "text",
    }

]