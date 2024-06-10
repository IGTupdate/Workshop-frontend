import { TWorkOrderObservation } from "@/app/types/work-order";
import { Typography } from "antd";
import ImageViewerInModal from "@/app/components/ImageViewer/ImageViewerInModal";
import { GiTyre } from "react-icons/gi";
import { useState } from "react";
import Image from "next/image";

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
              <div className="border  rounded-full overflow-hidden w-40 h-40">
                <button
                  className="w-full h-full p-10 relative"
                  onClick={() => setOpenGallery(index)}
                >
                  <Image
                    fill={true}
                    src={"/images/logo-2.webp"}
                    objectFit="content"
                    alt={item.category}
                  />
                </button>
              </div>
              <div>
                <h2 className="text-md font-semibold text-center mt-2">
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
