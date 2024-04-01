import React from "react";

type Props = {
  params: {
    appointmentId: string;
  };
};

const page = (props: Props) => {
  return <div>appointmentId - {props.params.appointmentId}</div>;
};

export default page;
