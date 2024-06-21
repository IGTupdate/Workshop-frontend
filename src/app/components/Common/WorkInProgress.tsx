import React from "react";

type Props = {
  text?: string;
};

const WorkInProgress = (props: Props) => {
  return (
    <div className="text-md mb-4">
      {props.text || "Right Now these functionality is not configured."}
    </div>
  );
};

export default WorkInProgress;
