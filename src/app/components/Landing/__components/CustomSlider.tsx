import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { IconType } from "react-icons/lib";
// Assuming FaCar is imported from react-icons/fa

// Define a type for each slider item
type SliderItem = {
  text: string;
  Icon: IconType;
};

type Props = {
  SliderItems: () => SliderItem[]; // Define the type for SliderItems prop
};

const CustomSlider: React.FC<Props> = ({ SliderItems }) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {SliderItems().map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{ backdropFilter: "blur(10px)" }} // Add blur effect style
              className="rounded-2xl p-6 shadow-sm"
            >
              <div>
                <h3 className="text-customWhite font-bold font-RobotoFlex text-3xl">
                  {item.text}
                </h3>
                <p className="text-customWhite flex justify-end mt-6">
                  <item.Icon size={80} />
                </p>{" "}
                {/* Render the icon */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CustomSlider;
