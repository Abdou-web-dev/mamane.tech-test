import { CustomSelect } from "./CustomSelect";
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
  return (
    <div className="custom-dropdown">
      <label>Expiration Date:</label>
      <CustomSelect
        label="Month"
        value="month"
        {...{
          handleBlur,
          monthValid,
        }}
        selectedValue={selectedMonth}
        setSelectedValue={setSelectedMonth}
      />
      <CustomSelect
        label="Year"
        value="year"
        selectedValue={selectedYear}
        setSelectedValue={setSelectedYear}
        {...{
          handleBlur,
          yearValid,
        }}
      />
    </div>
  );
};
