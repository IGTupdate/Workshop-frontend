import React from "react";
import Robot from "../../../../../../public/images/robot.webp";
import Scaner from "../../../../../../public/images/scaner.webp";
import Code from "../../../../../../public/images/code.webp";
import Users from "../../../../../../public/images/usersIcon.webp";
import Image from "next/image";

const Icons = () => {
  const data = [
    { Icon: Robot },
    { Icon: Scaner },
    { Icon: Code },
    { Icon: Users },
  ];

  return (
    <div className="container">
      <div className="flex justify-center xl:justify-between items-center gap-8 flex-wrap py-12">
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              boxShadow:
                "-5px -5px 10px 0px #00000040 inset,5px 5px 12.6px 4px #0000004D inset",
              height: "364px",
              width: "270px",
            }}
            className="py-8 rounded-xl flex justify-center items-center"
          >
            <Image src={item.Icon} alt="Icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Icons;
