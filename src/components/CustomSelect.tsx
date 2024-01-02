import { useState } from "react";
import { CloseX } from "../icons/Icons";
import "./styles.css";

export const CustomSelect = ({
  monthValid,
  yearValid,
  handleBlur,
  value,
  selectedValue,
  setSelectedValue,
  label,
}: {
  monthValid?: boolean;
  yearValid?: boolean;
  handleBlur: (field: string) => void;
  value: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}) => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);
  // This line creates an array of numbers representing months. It uses the Array.from method to generate an array with a length of 12 (representing the 12 months of the year). The second argument to Array.from is a mapping function that takes two parameters: _ (which is a placeholder for the array element, but it's not used in this case) and index (the index of the element being created). The mapping function returns index + 1, resulting in an array [1, 2, 3, ..., 12], which corresponds to the months of the year.
  // const currentYear = new Date().getFullYear();
  // This line gets the current year using the Date object. new Date() creates a new instance of the Date object, and .getFullYear() retrieves the current year as a four-digit number.
  // const years = Array.from({ length: 10 }, (_, index) => currentYear + index);
  // Similar to the months array, this line generates an array of years. It creates an array with a length of 10, and the mapping function adds the current year (currentYear) to the index for each element. This results in an array of 10 consecutive years starting from the current year.

  const [isSelectOpen, setIsSelectOpen] = useState(false); //===  const [, setIsSelectOpen] = useState(false);

  const handleValueChange = (event: any) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  let values: number[] = value === "month" ? months : years;

  return (
    <div className="custom-dropdown">
      <div className="relative inline-block text-left">
        <select
          className={`w-full p-2 border
          ${(value =
            "month" && !monthValid ? "border-red-500" : "border-gray-300")} 

              ${(value =
                "year" && !yearValid ? "border-red-500" : "border-gray-300")} 
              rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
          value={selectedValue}
          onChange={handleValueChange}
          onBlur={() => {
            handleBlur("value");
            setIsSelectOpen(false);
            // console.log(isSelectOpen, "isSelectOpen");
          }}
          onClick={() => {
            handleBlur("value");
          }}
          onFocus={() => {
            setIsSelectOpen(true);
            // console.log(isSelectOpen, "isSelectOpen");
          }}
        >
          <option className="text-xl mb-2" value="" disabled>
            {label}
          </option>
          {values?.map((value) => (
            <option
              key={value}
              className="text-gray-500 text-xl mb-2"
              value={value}
            >
              {value}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-28 pb-2">
          <button
            className="bg-white focus:outline-none border-2 p-0"
            aria-label={`Clear ${label} selection`}
            style={{
              position: "relative",
              right: "4px",
            }}
            onClick={() => setSelectedValue("")}
          >
            <CloseX />
          </button>
        </div>
      </div>
      {/* <div
        style={{
          position: "relative",
          right: "40px",
          border: "2px solid red",
        }}
      >
        {isSelectOpen ? "true" : "false"}
      </div> */}
    </div>
  );
};
