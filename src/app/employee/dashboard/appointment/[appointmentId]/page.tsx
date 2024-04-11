import React from "react";
import AppointmentPageContiner from "./__components/AppointmentPageContiner";

type Props = {
  params: {
    appointmentId: string;
  };
};

const page = (props: Props) => {
  return <div>
      <AppointmentPageContiner appointmentId={props.params.appointmentId}/>
    </div>;
};

export default page;
