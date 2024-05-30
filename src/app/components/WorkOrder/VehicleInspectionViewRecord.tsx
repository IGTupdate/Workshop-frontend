"use client";

import { Typography } from "antd";
import React, { useState } from "react";
import ImageViewerInModal from "@/app/components/ImageViewer/ImageViewerInModal";
import { GiTyre } from "react-icons/gi";
import VehiclePartsInspectionDetail from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/VehiclePartsInspectionDetail";

const { Title, Text } = Typography;

type Props = {};

const VehicleInspectionViewRecord = (props: Props) => {
  const [openGallery, setOpenGaller] = useState(-1);

  const inspection = [
    {
      category: "Front Wheel",
      images: [
        "https://ukvehicledata.co.uk/images/redcar.png",
        "https://ukvehicledata.co.uk/images/redcar.png",
      ],
    },
    {
      category: "Headlight",
      images: [
        "https://ukvehicledata.co.uk/images/redcar.png",
        "https://tse4.mm.bing.net/th?id=OIP.rvWthQFa1xgBSWEkfmZL0QHaFa&pid=Api&P=0&h=180",
        "https://pic3.zhimg.com/v2-94c7f950e5abb065681930ce15f2cf22_b.jpg",
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-xl shadow-xl">
      <div>
        {/* <div className='flex gap-6'>
          {
            inspection.map((item, index) => {
              return <div key={index}>
                <div className='border  rounded-full w-40 h-40'>
                  <button className='w-full h-full p-4' onClick={() => setOpenGaller(index)}>
                    <GiTyre className='w-full h-full' />
                  </button>
                </div>
                <div>
                  <h2 className='text-md font-semibold text-center mt-2'>{item.category}</h2>
                </div>
                <ImageViewerInModal
                  images={item.images}
                  onClose={() => setOpenGaller(-1)}
                  open={index === openGallery}
                  title={item.category}
                />
              </div>
            })
          }
        </div> */}

        <VehiclePartsInspectionDetail observations={inspection} />
      </div>
    </div>
  );
};

export default VehicleInspectionViewRecord;
