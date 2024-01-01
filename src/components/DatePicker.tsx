import { useState } from "react";
import "./styles.css";

export const ExpiryDateDropdown = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  monthValid,
  yearValid,
  handleBlur,
}: {
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  monthValid: boolean;
  yearValid: boolean;
  handleBlur: (field: string) => void;
}) => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

  // This line creates an array of numbers representing months. It uses the Array.from method to generate an array with a length of 12 (representing the 12 months of the year). The second argument to Array.from is a mapping function that takes two parameters: _ (which is a placeholder for the array element, but it's not used in this case) and index (the index of the element being created). The mapping function returns index + 1, resulting in an array [1, 2, 3, ..., 12], which corresponds to the months of the year.
  // const currentYear = new Date().getFullYear();
  // This line gets the current year using the Date object. new Date() creates a new instance of the Date object, and .getFullYear() retrieves the current year as a four-digit number.
  // const years = Array.from({ length: 10 }, (_, index) => currentYear + index);
  // Similar to the months array, this line generates an array of years. It creates an array with a length of 10, and the mapping function adds the current year (currentYear) to the index for each element. This results in an array of 10 consecutive years starting from the current year.

  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false);
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      <label>Expiration Date:</label>
      <select
        className={`w-full p-2 border ${
          !monthValid ? "border-red-500" : "border-gray-300"
        } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
        value={selectedMonth}
        onChange={handleMonthChange}
        onBlur={() => {
          handleBlur("month");
          setIsMonthSelectOpen(false);
        }}
        onClick={() => {
          handleBlur("month");
        }}
        onFocus={() => setIsMonthSelectOpen(true)}
      >
        <option value="" disabled>
          {!isMonthSelectOpen ? "Month" : ""}
        </option>
        {months.map((month) => (
          <option
            key={month}
            className="text-gray-500 text-xl mb-2"
            value={month}
          >
            {month}
          </option>
        ))}
      </select>
      <select
        value={selectedYear}
        onChange={handleYearChange}
        className={`${!yearValid ? "border-red-500" : "border-gray-300"}`}
        onBlur={() => {
          handleBlur("year");
          setIsYearSelectOpen(false);
        }}
        onFocus={() => setIsYearSelectOpen(true)}
        onClick={() => handleBlur("year")}
      >
        <option value="" disabled className="text-gray-500 mb-2 ">
          {!isYearSelectOpen ? "Year" : ""}
        </option>
        {years.map((year) => (
          <option
            key={year}
            value={year}
            className="text-gray-500 mb-2 text-xl"
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
