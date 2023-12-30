import { number } from "card-validator";
import { FunctionComponent, useContext } from "react";
import { CreditCardContext } from "../context/CreditCardContext";
import ExpiryDateDropdown from "./DatePicker";

interface PaymentMethodProps {
  cvvValid: boolean;
  handleBlur: (field: string) => void;
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  monthValid: boolean;
  yearValid: boolean;
  cardNumberValid: boolean;
  setCardNumberValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  cvvValid,
  handleBlur,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  monthValid,
  yearValid,
  cardNumberValid,
  setCardNumberValid,
}) => {
  const {
    cardNumber: creditCardNumber,
    setCardNumber,
    cvv: cvvField,
    setCvv,
  } = useContext(CreditCardContext);

  const isValidCardNumber = (value: string): boolean => {
    const validation = number(value);
    return validation.isValid;
  };

  return (
    <div className="card-details">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Payment Method</h2>

      {/* Card Number */}
      <label className="block mb-4">
        <span className="text-gray-700">Card Number:</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={creditCardNumber}
          onChange={(e) => {
            let inputValue = e.target.value;
            // Remove non-numeric characters
            inputValue = inputValue.replace(/\D/g, "");
            // Limit the length to 16 characters
            if (inputValue.length > 16) {
              inputValue = inputValue.slice(0, 16);
            }

            setCardNumberValid(inputValue.length === 16);
            setCardNumber(inputValue);
          }}
          onBlur={() => handleBlur("cardNumber")}
          className={`w-full p-2 border ${
            !cardNumberValid ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
        />
        {creditCardNumber && creditCardNumber.length !== 16 && (
          <div className="text-red-500">
            Credit card number must be 16 digits.
          </div>
        )}
        {creditCardNumber && creditCardNumber.length === 16 && (
          <div
            className={`text-sm ${
              isValidCardNumber(creditCardNumber)
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {!isValidCardNumber(creditCardNumber)
              ? " Credit card number is not valid."
              : "Valid credit card number"}
          </div>
        )}
      </label>

      {/* Expiration Date and CVV */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpiryDateDropdown
          {...{
            selectedMonth,
            setSelectedMonth,
            selectedYear,
            setSelectedYear,
            monthValid,
            handleBlur,
            yearValid,
          }}
        />

        {/* CVV */}
        <label className="block">
          <span className="text-gray-700">CVV:</span>
          <input
            type={cvvField ? "password" : "text"}
            value={cvvField}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              // Get the input value
              let enteredCVV = e.target.value;
              enteredCVV = enteredCVV.replace(/\D/g, "");
              // Limit the length to 3 characters

              if (enteredCVV.length > 3) {
                enteredCVV = enteredCVV.slice(0, 3);
              }
              // Set the cvv state with the modified value
              setCvv(enteredCVV);
            }}
            onBlur={() => handleBlur("cvv")}
            className={`w-full p-2 border ${
              !cvvValid ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
            data-cy="cvv"
          />
          {cvvField && (
            <div
              className={`text-sm ${
                cvvField.length === 3 ? "text-green-500" : "text-red-500"
              }`}
            >
              {cvvField.length !== 3
                ? "CVV must be 3 digits long"
                : "CVV is valid"}
            </div>
          )}
        </label>
      </div>
    </div>
  );
};
