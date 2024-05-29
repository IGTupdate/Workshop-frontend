// // components/CarDetector.js
"use client";
// import React, { useState, useRef } from "react";
// import * as mobilenet from "@tensorflow-models/mobilenet";
// import "@tensorflow/tfjs";
// import Image from "next/image";

// const CarDetector = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const imageRef = useRef<any>();

//   const handleImageChange = async (e: any) => {
//     setImage(URL.createObjectURL(e.target.files[0] || ""));
//     setResult("");
//   };

//   // const handleDetect = async () => {
//   //   if (!imageRef.current) return;

//   //   setLoading(true);
//   //   const model = await mobilenet.load();
//   //   const predictions = await model.classify(imageRef.current);
//   //   setLoading(false);

//   //   const carParts = ["car", "wheel", "tire", "headlight", "bumper", "mirror", "dashboard", "engine"];
//   //   const carPartPrediction = predictions.find((prediction) =>
//   //     carParts.some(part => prediction.className.toLowerCase().includes(part))
//   //   );

//   //   if (carPartPrediction) {
//   //     setResult(`Car part detected with ${Math.round(carPartPrediction.probability * 100)}% confidence.`);
//   //   } else {
//   //     setResult('No car or car part detected.');
//   //   }
//   // };

//   console.log(result, "result");

//   return (
//     <div className="flex flex-col items-center">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="mb-4"
//       />
//       {
//         <div>
//           <Image
//             src={image || ""}
//             alt="Uploaded"
//             ref={imageRef}
//             className="mb-4 max-w-xs"
//             width={100}
//             height={100}
//           />
//           <button
//             // onClick={handleDetect}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             {loading ? "Detecting..." : "Detect Car"}
//           </button>
//         </div>
//       }
//       {result && (
//         <div className="mt-4 p-4 bg-gray-200 rounded">
//           <h3 className="font-bold mb-2">Result:</h3>
//           <p>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
//       <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         <h1 className="text-4xl font-bold mb-8">Car Detection</h1>
//         <CarDetector />
//       </main>
//     </div>
//   );
// }

import { useState, useRef, ChangeEventHandler, ChangeEvent } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import { MdOutlineCancel } from "react-icons/md";

const CarDashboardAndFule: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [onCamera, setOnCamera] = useState<boolean>(false);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
    }
  };

  const handleCapture = async () => {
    const video = videoRef.current;

    if (video && video.srcObject) {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (!canvas) {
        alert("No canva found");
        return;
      }
      const context = canvas.getContext("2d");

      if (!context) {
        alert("No canva found");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageUrl);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }

      setOnCamera(false);
    }
  };

  const handleStartCamera = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    try {
      setCapturedImage("");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        setStream(stream); // Save the stream to state
        setOnCamera(true);
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      setOnCamera(false);
    }
  };

  const handelSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
  };

  return (
    // <form onSubmit={handelSubmit}>
    <div className="flex flex-col items-center justify-center py-6">
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center space-y-4">
        <div className="relative">
          {capturedImage ? (
            <div className="relative">
              <img
                src={capturedImage}
                alt="Captured"
                className="mb-4 w-full h-80 mx-auto rounded-lg shadow-md object-cover object-center"
              />
              <MdOutlineCancel
                onClick={() => setCapturedImage(null)}
                size={25}
                className="absolute right-[-12px] top-[-12px] text-red-500 cursor-pointer"
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-80 rounded-lg shadow-md"
            />
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {!showOptions && (
          <button
            onClick={() => setShowOptions(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Image
          </button>
        )}

        {showOptions && (
          <div className="space-y-4">
            <div className="flex w-full justify-center items-center">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex w-full justify-center items-center gap-3">
              <button
                onClick={handleStartCamera}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Start Camera
              </button>
              {onCamera && (
                <button
                  onClick={handleCapture}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                >
                  Capture
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
    // </form>
  );
};

export default CarDashboardAndFule;
