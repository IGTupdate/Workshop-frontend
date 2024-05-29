"use client";
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
