import { number } from "card-validator";
import { FunctionComponent, useContext, useState } from "react";
import amex from "../assets/img/amex.svg";
import mastercard from "../assets/img/mastercard.svg";
import visa from "../assets/img/visa.svg";

import { CreditCardContext } from "../context/CreditCardContext";
import { getCardType } from "../utils/helpers";
import { ExpiryDateDropdown } from "./DatePicker";

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
}) => {
  const {
    cardNumber: creditCardNumber,
    setCardNumber,
    cvv: cvvField,
    setCvv,
  } = useContext(CreditCardContext);
  const [formattedCN, setFormattedCN] = useState("");

  const isValidCardNumber = (value: string): boolean => {
    const validation = number(value);
    return validation.isValid;
  };

  // Now, you can use the cardType to display the corresponding logo

  let is_visa_or_MC_amex =
    getCardType(creditCardNumber) === `mastercard` ||
    getCardType(creditCardNumber) === `amex` ||
    getCardType(creditCardNumber) === `visa`;

  let is_length_15_or_16 =
    creditCardNumber.length === 16 || creditCardNumber.length === 15;
  // (creditCardNumber && creditCardNumber.replace(/\s/g, "").length !== 16) ||
  // (creditCardNumber && creditCardNumber.replace(/\s/g, "").length !== 15);

  return (
    <div className="card-details">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Payment Method</h2>

      {/* Card Number */}
      <div className="block mb-4 relative">
        <span className="text-gray-700">Card Number:</span>
        <input
          // type={creditCardNumber ? "password" : "text"}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={formattedCN}
          onChange={(e) => {
            let inputValue = e.target.value;
            // Remove non-numeric characters
            inputValue = inputValue.replace(/\D/g, "");
            // Limit the length to 16 characters
            if (inputValue.length > 16) {
              inputValue = inputValue.slice(0, 16);
            }
            if (inputValue.length > 14 && getCardType(inputValue) === `amex`) {
              inputValue = inputValue.slice(0, 15);
            }
            const formattedValue = inputValue.replace(/(\d{4})/g, "$1 ").trim();
            setCardNumber(inputValue);
            setFormattedCN(formattedValue);
            // console.log(formattedCN, formattedCN.length, "formattedCN");
            // console.log(
            //   creditCardNumber,
            //   creditCardNumber.length,
            //   "creditCardNumber"
            // );
          }}
          onBlur={() => handleBlur("cardNumber")}
          className={`w-full p-2 border ${
            !cardNumberValid ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
        />
        {creditCardNumber && (
          <div className="absolute right-2 top-2">
            {creditCardNumber &&
              is_visa_or_MC_amex &&
              isValidCardNumber(creditCardNumber) && (
                <img
                  src={
                    getCardType(creditCardNumber) === `mastercard`
                      ? mastercard
                      : getCardType(creditCardNumber) === `visa`
                      ? visa
                      : getCardType(creditCardNumber) === `amex`
                      ? amex
                      : ""
                  }
                  width={"30px"}
                  alt="logo"
                />
              )}
          </div>
        )}
        {/* 5425230000004415  MC*/}
        {/* 4456530000001005 VISA*/}
        {/* 374200000000004 AMEX*/}
        {/* American Express credit card numbers have 15 digits, while credit cards affiliated with other major payment networks such as Visa and Mastercard have card numbers that contain 16 digits.8 mai 2023 */}

        {creditCardNumber && creditCardNumber.length !== 16 && (
          <div className="text-red-500">
            {getCardType(creditCardNumber) !== `amex` &&
              "Credit card number must be 16 digits."}
          </div>
        )}
        {creditCardNumber && is_length_15_or_16 && (
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
      </div>

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
