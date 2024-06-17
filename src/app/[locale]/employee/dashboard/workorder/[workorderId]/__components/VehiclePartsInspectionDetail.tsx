import { TWorkOrderObservation } from "@/app/types/work-order";
import { Button, Typography } from "antd";
import ImageViewerInModal from "@/app/components/ImageViewer/ImageViewerInModal";
import { GiTyre } from "react-icons/gi";
import { useState } from "react";
import Image from "next/image";
import { getCategoryIcon } from "../__utils/car_parts_icon";

const { Title } = Typography;

type Props = {
  observations: TWorkOrderObservation[];
};

const VehiclePartsInspectionDetail = (props: Props) => {
  const [openGallery, setOpenGallery] = useState(-1);
  return (
    <div>
      <Title level={4} className="mb-8">
        Observations
      </Title>
      <div className="flex gap-10 flex-wrap">
        {props.observations.map((item, index) => {
          return (
            <div key={index}>
              <div className="relative flex flex-col items-center">
                <Button htmlType="button" onClick={() => setOpenGallery(index)}>
                  {getCategoryIcon(item.category)}
                </Button>
              </div>
              <div>
                <h2 className="text-md font-semibold text-center mt-4">
                  {item.category}
                </h2>
              </div>
              <ImageViewerInModal
                images={item.images}
                onClose={() => setOpenGallery(-1)}
                open={index === openGallery}
                title={item.category}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehiclePartsInspectionDetail;
