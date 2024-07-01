import React from "react";

interface WatermarkProps {
  text: string;
}

const Watermark: React.FC<WatermarkProps> = ({ text }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-gray-300 text-xl font-semibold opacity-90">
        {text}
      </div>
    </div>
  );
};

export default Watermark;
