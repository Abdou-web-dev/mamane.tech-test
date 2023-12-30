import { FunctionComponent, useContext } from "react";
import { SafeParseReturnType } from "zod";
import { CreditCardContext } from "../context/CreditCardContext";

interface CustomerDetailsProps {
  emailValid: boolean;
  handleBlur: (field: string) => void;
  emailValidationResult: SafeParseReturnType<
    {
      email: string;
    },
    {
      email: string;
    }
  >;
  nameValid: boolean;
  addressValid: boolean;
}

export const CustomerDetails: FunctionComponent<CustomerDetailsProps> = ({
  emailValid,
  handleBlur,
  emailValidationResult,
  nameValid,
  addressValid,
}) => {
  const {
    name: nameField,
    setName,
    email: emailField,
    setEmail,
    address: addressField,
    setAddress,
  } = useContext(CreditCardContext);

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Customer Details</h2>

      {/* Email */}
      <label className="block mb-4">
        <span className="text-gray-700">Email:</span>
        <input
          className={`w-full p-2 border ${
            !emailValid ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
          data-cy={`email ${emailField ? "email-not-empty" : "email-empty"}`} // Adding the data-cy attribute
          type="email"
          placeholder="Email"
          value={emailField}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
        />

        {emailField && (
          <div
            className={`text-sm ${
              emailValidationResult.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {emailValidationResult.success ? "Valid email" : "Invalid email"}
          </div>
        )}
      </label>

      {/* Name */}
      <label className="block mb-4">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={nameField}
          placeholder="Cardholder Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          onBlur={() => handleBlur("name")}
          className={`w-full p-2 border ${
            !nameValid ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
          data-cy="name" // Adding the data-cy attribute
        />
      </label>

      {/* Address */}
      <label className="block mb-4">
        <span className="text-gray-700">Address:</span>
        <input
          type="text"
          placeholder="Type your address"
          value={addressField}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => handleBlur("address")}
          className={`w-full p-2 border ${
            !addressValid ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
          data-cy="address"
        />
      </label>
    </div>
  );
};
