import React from "react";

interface CustomSelectProps {
  name: string;
  onChangeCallback: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  additionalCallback?: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void | null;
  value: string;
  data: any;
  dataKey: string;
  placeHolderSelect: string;
}

const CustomSelect = ({
  name,
  onChangeCallback,
  additionalCallback,
  value,
  data,
  dataKey,
  placeHolderSelect,
}: CustomSelectProps) => {
  return (
    <div className="w-52 sm:mb-2 lg:mb-0">
      <select
        name={name}
        onChange={(e) => {
          if (additionalCallback) {
            additionalCallback(e);
          }
          onChangeCallback(e);
        }}
        value={value}
        className="form-select
          w-full
          sm:w-4/5
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
      >
        <option value="" disabled>
          {placeHolderSelect}
        </option>
        {data.map((item: any) => {
          return (
            <option key={item[dataKey]} value={item[dataKey]}>
              {item[dataKey]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CustomSelect;
