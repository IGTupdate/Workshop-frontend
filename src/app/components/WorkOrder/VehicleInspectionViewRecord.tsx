"use client";

import { Typography } from "antd";
import React, { useState } from "react";
import ImageViewerInModal from "@/app/components/ImageViewer/ImageViewerInModal";
import { GiTyre } from "react-icons/gi";
import VehiclePartsInspectionDetail from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/VehiclePartsInspectionDetail";
import { TWorkOrderObservation } from "@/app/types/work-order";

const { Title, Text } = Typography;

type Props = {
  observations: TWorkOrderObservation[];
};

const VehicleInspectionViewRecord = (props: Props) => {
  // const inspection = [
  //   {
  //     category: "Front Wheel",
  //     images: [
  //       "https://ukvehicledata.co.uk/images/redcar.png",
  //       "https://ukvehicledata.co.uk/images/redcar.png",
  //     ],
  //   },
  //   {
  //     category: "Headlight",
  //     images: [
  //       "https://ukvehicledata.co.uk/images/redcar.png",
  //       "https://tse4.mm.bing.net/th?id=OIP.rvWthQFa1xgBSWEkfmZL0QHaFa&pid=Api&P=0&h=180",
  //       "https://pic3.zhimg.com/v2-94c7f950e5abb065681930ce15f2cf22_b.jpg",
  //     ],
  //   },
  // ];

  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-xl shadow-xl">
      <div>
        <VehiclePartsInspectionDetail observations={props.observations} />
      </div>
    </div>
  );
};

export default VehicleInspectionViewRecord;
