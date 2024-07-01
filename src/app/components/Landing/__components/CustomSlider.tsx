"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image, { StaticImageData } from "next/image";
// Assuming FaCar is imported from react-icons/fa

// Define a type for each slider item

type SliderItem = {
  text: string;
  Image: string | StaticImageData;
};

type Props = {
  SliderItems: () => SliderItem[];
};

const CustomSlider: React.FC<Props> = ({ SliderItems }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {SliderItems().map((item, index) => (
          // <SwiperSlide key={index}>
          <div
            key={index}
            className="rounded-3xl p-8 shadow-sm transbox h-[292px]"
          >
            <div className="h-full flex flex-col justify-between">
              <h3 className="text-customWhite font-bold font-RobotoFlex text-2xl md:text-3xl pe-10">
                {item.text}
              </h3>
              <p className="text-customWhite flex justify-end">
                {/* <item.Icon size={100} /> */}

                <div className="relative h-screen w-screen">
                  <Image
                    src={item.Image}
                    alt="image"
                    height={0}
                    width={0}
                    fill
                  />
                </div>
              </p>
              {/* Render the icon */}
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default CustomSlider;
