import { FunctionComponent, useContext } from "react";
import amex from "../assets/img/amex.svg";
import mastercard from "../assets/img/mastercard.svg";
import visa from "../assets/img/visa.svg";
import { CreditCardContext } from "../context/CreditCardContext";
import { getCardType, isValidCardNumber } from "../utils/helpers";
import { ExpiryDateDropdown } from "./DatePicker";
import "./styles.css";

interface PaymentMethodProps {
  cvcValid: boolean;
  handleBlur: (field: string) => void;
  monthValid: boolean;
  yearValid: boolean;
  cardNumberValid: boolean;
  setCardNumberValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  cvcValid,
  handleBlur,
  monthValid,
  yearValid,
  cardNumberValid,
}) => {
  const {
    cardNumber: creditCardNumber,
    setCardNumber,
    cvc: cvcField, // Card Verification Code
    setCvc,
    showRedBorder,
    showModal,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    formattedCN,
    setFormattedCN,
  } = useContext(CreditCardContext);

  // Now, I can use the cardType to display the corresponding logo

  let is_visa_or_MC_amex =
    getCardType(creditCardNumber) === `mastercard` ||
    getCardType(creditCardNumber) === `amex` ||
    getCardType(creditCardNumber) === `visa`;

  let is_length_15_or_16 =
    creditCardNumber.length === 16 || creditCardNumber.length === 15;

  return (
    <div className="card-details-container">
      {/* <div className="card-details min-w-80 lg:max-w-0"> */}

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
            // Implement formatting logic (e.g., adding spaces)

            const formattedValue = inputValue.replace(/(\d{4})/g, "$1 ").trim();
            setCardNumber(inputValue);
            setFormattedCN(formattedValue);
          }}
          onBlur={() => handleBlur("cardNumber")}
          className={`w-full p-2 border ${
            !cardNumberValid ? "border-red-500" : "border-gray-300"
          } 
          ${showRedBorder ? "border-red-400 border-2" : "border-gray-300"} 
          rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
          data-cy="creditcard"
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

      {/* Expiration Date and CVC */}
      {/* <div className="Expiry-date-dropdown grid md:grid-cols-1 grid-cols-2 gap-4"> */}
      <div className="date-and-cvc grid grid-cols-1 gap-4">
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
        {/* CVC */}
        <label
          // className="block z-50"
          className={`cvc-block block ${showModal ? "" : "z-50"}
          `}
        >
          <span className="text-gray-700">CVC:</span>
          <input
            type={cvcField ? "password" : "text"}
            value={cvcField}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              // Get the input value
              let enteredCvc = e.target.value;
              enteredCvc = enteredCvc.replace(/\D/g, "");
              // Limit the length to 3 characters

              if (enteredCvc.length > 3) {
                enteredCvc = enteredCvc.slice(0, 3);
              }
              // Set the cvc state with the modified value
              setCvc(enteredCvc);
            }}
            onBlur={() => handleBlur("cvc")}
            className={`w-full p-2 border ${
              !cvcValid ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
            data-cy="cvc"
          />
          {cvcField && (
            <div
              className={`text-sm ${
                cvcField.length === 3 ? "text-green-500" : "text-red-500"
              }`}
            >
              {cvcField.length !== 3
                ? "CVC must be 3 digits long"
                : "CVC is valid"}
            </div>
          )}
        </label>
      </div>
    </div>
  );
};
