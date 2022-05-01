import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface FormulaProps {
  id: string;
  makeName: string;
  modelName: string;
  removeFormula: (id: string) => void;
  fuelType: string;
  risk: string | undefined;
  year: string;
  color: string | undefined;
  yearComparisonType: string;
}

const Formula = ({
  id,
  makeName,
  modelName,
  removeFormula,
  year,
  fuelType,
  risk,
  color,
  yearComparisonType,
}: FormulaProps) => {
  const onDeleteButtonClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white w-96 shadow rounded-2xl px-8 flex flex-col h-auto place-content-center">
            <h1 className="text-black mb-8 mt-8 text-2xl">
              Are you sure you want to delete this insurance offer?
            </h1>
            <div className="flex justify-around mb-12">
              <button
                onClick={() => {
                  removeFormula(id);
                  onClose();
                }}
                type="submit"
                className="self-center w-1/3 bg-blue-500 mt-12 hover:bg-blue-700 text-white font-bold py-2 rounded "
              >
                Yes
              </button>

              <button
                onClick={onClose}
                className="self-center w-1/3 bg-gray-400 mt-12 hover:bg-gray-700 text-white font-bold py-2 rounded "
              >
                Cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="lg:w-4/5 lg:mt-10 sm:mt-10 lg:h-auto sm:h-auto lg:flex lg:items-center lg:content-center lg:justify-around rounded-lg bg-gradient-to-l from-gray-200 to-transparent">
      <ul className="container lg:ml-10 mr-6 divide-y divide-gray-400 divide-dotted">
        <li className="flex items-center justify-between px-4 py-2">
          <div className="antialiased">
            <div className="font-light text-3xl align-middle mb-2">
              {makeName}
            </div>
            <ul className="list-outside list-disc">
              <li>Model: {modelName}</li>
              <li>Fuel type: {fuelType}</li>
              <li>Production year: {year}</li>
              <li style={{ color: color }} className="font-bold">
                {" "}
                Risk: {risk}
              </li>
              <li>
                Comparison character:{" "}
                <span className="font-bold">{yearComparisonType}</span>
              </li>
            </ul>
          </div>
          <div className="text-xs sm:mt-6 lg:mt-0">
            <button
              onClick={() => {
                onDeleteButtonClick();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold lg:py-3 lg:px-8 sm:py-2 sm:px-3 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Formula;
