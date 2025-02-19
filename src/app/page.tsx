"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  // State for tracking which boxes are black and the click order
  const [blackBoxes, setBlackBoxes] = useState(new Set());
  const [clickOrder, setClickOrder] = useState<any>([]);
  const [isResetting, setIsResetting] = useState(false);

  // Handle box click
  const handleBoxClick = (index: number) => {
    if (isResetting) return; // Prevent clicks during reset animation

    if (!blackBoxes.has(index)) {
      const newBlackBoxes = new Set(blackBoxes);
      newBlackBoxes.add(index);
      setBlackBoxes(newBlackBoxes);
      setClickOrder([...clickOrder, index]);
    }
  };

  // Handle reset with animated sequence
  const handleReset = async () => {
    if (isResetting) return;
    setIsResetting(true);

    // Reset boxes in the original click order
    const newBlackBoxes = new Set(blackBoxes);

    for (const index of clickOrder) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      newBlackBoxes.delete(index);
      setBlackBoxes(new Set(newBlackBoxes));
    }

    setClickOrder([]);
    setIsResetting(false);
  };

  // Generate the grid boxes
  const renderBoxes = () => {
    return Array(9)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          onClick={() => handleBoxClick(index)}
          className={`
           w-24 h-24 border-2 border-gray-300 cursor-pointer
           transition-colors duration-300 ease-in-out
           ${blackBoxes.has(index) ? "bg-black" : "bg-white"}
         `}
        />
      ));
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="grid grid-cols-3 gap-4">{renderBoxes()}</div>

      <button
        onClick={handleReset}
        disabled={isResetting || blackBoxes.size === 0}
        className={`
           px-8 py-2 rounded-md font-medium
           transition-all duration-200
           ${
             isResetting || blackBoxes.size === 0
               ? "bg-gray-300 cursor-not-allowed text-gray-500"
               : "bg-blue-500 hover:bg-blue-600 text-white active:transform active:scale-95"
           }
         `}
      >
        {isResetting ? "Resetting..." : "Reset"}
      </button>
    </div>
  );
}
