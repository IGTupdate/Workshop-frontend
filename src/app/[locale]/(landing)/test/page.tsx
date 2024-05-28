// components/CarDetector.js
"use client";
import React, { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import Image from "next/image";

const CarDetector = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<any>();

  const handleImageChange = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0] || ""));
    setResult("");

    if (!imageRef.current) return;

    setLoading(true);
    const model = await mobilenet.load();
    const predictions = await model.classify(imageRef.current);
    setLoading(false);

    const carParts = [
      "car",
      "wheel",
      "tire",
      "headlight",
      "bumper",
      "mirror",
      "dashboard",
    ];
    const carPartPrediction = predictions.find((prediction) =>
      carParts.some((part) =>
        prediction.className.toLowerCase().includes(part),
      ),
    );

    if (carPartPrediction) {
      setResult(
        `Car part detected with ${Math.round(carPartPrediction.probability * 100)}% confidence.`,
      );
    } else {
      setResult("No car or car part detected.");
    }
  };

  // const handleDetect = async () => {
  //     if (!imageRef.current) return;

  //     setLoading(true);
  //     const model = await mobilenet.load();
  //     const predictions = await model.classify(imageRef.current);
  //     setLoading(false);

  //     const carParts = ["car", "wheel", "tire", "headlight", "bumper", "mirror", "dashboard", "engine"];
  //     const carPartPrediction = predictions.find((prediction) =>
  //         carParts.some(part => prediction.className.toLowerCase().includes(part))
  //     );

  //     if (carPartPrediction) {
  //         setResult(`Car part detected with ${Math.round(carPartPrediction.probability * 100)}% confidence.`);
  //     } else {
  //         setResult('No car or car part detected.');
  //     }
  // };

  console.log(result, "result");

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {
        <div>
          <Image
            src={image || ""}
            alt="Uploaded"
            ref={imageRef}
            className="mb-4 max-w-xs"
            width={100}
            height={100}
          />
          <button
            // onClick={handleDetect}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Detecting..." : "Detect Car"}
          </button>
        </div>
      }
      {result && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <h3 className="font-bold mb-2">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Car Detection</h1>
        <CarDetector />
      </main>
    </div>
  );
}
