"use client";
import React, { JSX, useState } from "react";

// Type for the click order array
type ClickOrder = number[];

// Type for the black boxes set
type BlackBoxesSet = Set<number>;

export default function Home() {
  // State with proper type definitions
  const [blackBoxes, setBlackBoxes] = useState<BlackBoxesSet>(new Set());
  const [clickOrder, setClickOrder] = useState<ClickOrder>([]);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // Handle box click with type definitions
  const handleBoxClick = (index: number): void => {
    if (isResetting) return;

    if (!blackBoxes.has(index)) {
      const newBlackBoxes: BlackBoxesSet = new Set(blackBoxes);
      newBlackBoxes.add(index);
      setBlackBoxes(newBlackBoxes);
      setClickOrder(
        (prevOrder: ClickOrder): ClickOrder => [...prevOrder, index]
      );
    }
  };

  // Handle reset with type definitions
  const handleReset = async (): Promise<void> => {
    if (isResetting) return;
    setIsResetting(true);

    const newBlackBoxes: BlackBoxesSet = new Set(blackBoxes);

    for (const index of clickOrder) {
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      newBlackBoxes.delete(index);
      setBlackBoxes(new Set(newBlackBoxes));
    }

    setClickOrder([]);
    setIsResetting(false);
  };

  // Generate the grid boxes with type definitions
  const renderBoxes = (): JSX.Element[] => {
    return Array(9)
      .fill(null)
      .map((_, index: number) => (
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

  // Return type is inferred as JSX.Element
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
