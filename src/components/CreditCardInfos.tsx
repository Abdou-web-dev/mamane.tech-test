import { FunctionComponent, useContext, useState } from "react";
import { CreditCardContext } from "../context/CreditCardContext";
import "./styles.css";

interface CreditCardInfosProps {}

export const CreditCardInfos: FunctionComponent<CreditCardInfosProps> = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    cardNumber,
    setCardNumber,
    cvv,
    setCvv,
    expirationDate,
    setExpirationDate,
    handleCheckout,
    // isLoading,
    loading,
    error,
    data,
    isError,
    isSuccess,
    showSuccess,
  } = useContext(CreditCardContext);

  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [cardNumberValid, setCardNumberValid] = useState(true);
  const [expirationDateValid, setExpirationDateValid] = useState(true);
  const [cvvValid, setCvvValid] = useState(true);

  function validateFields() {
    // Reset validation state
    setEmailValid(true);
    setNameValid(true);
    setAddressValid(true);
    setCardNumberValid(true);
    setExpirationDateValid(true);
    setCvvValid(true);
    // Perform validation logic here
    if (!email) setEmailValid(false);
    if (!name) setNameValid(false);
    if (!address) setAddressValid(false);
    if (!cardNumber) setCardNumberValid(false);
    if (!expirationDate) setExpirationDateValid(false);
    if (!cvv) setCvvValid(false);

    // If any field is missing, prevent further action
    if (!email || !name || !address || !cardNumber || !expirationDate || !cvv) {
      return;
    }
  }

  // To remove the red border as soon as the user types something in the field
  const handleBlur = (field: string) => {
    switch (field) {
      case "email":
        setEmailValid(!!email); // Set to true if email is not empty
        break;
      // !!email: The !! is a JavaScript idiom to convert a value to a boolean. It's essentially a double negation. If email is a truthy value (not empty or not falsy), !!email will be true. If email is an empty string or a falsy value, !!email will be false.
      case "name":
        setNameValid(!!name);
        break;
      case "address":
        setAddressValid(!!address);
        break;
      case "cardNumber":
        setCardNumberValid(!!cardNumber);
        break;
      case "expirationDate":
        setExpirationDateValid(!!expirationDate);
        break;
      case "cvv":
        setCvvValid(!!cvv);
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Customer Details */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          Customer Details
        </h2>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            data-cy={`email ${email ? "email-not-empty" : "email-empty"}`} // Adding the data-cy attribute
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`w-full p-2 border ${
              !emailValid ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
          />
        </label>

        {/* Name */}
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            value={name}
            placeholder="Cardholder Name"
            onChange={(e) => setName(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => handleBlur("address")}
            className={`w-full p-2 border ${
              !addressValid ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
            data-cy="address"
          />
        </label>
      </div>

      {/* Payment Method */}
      <div className="card-details">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Payment Method</h2>

        {/* Card Number */}
        <label className="block mb-4">
          <span className="text-gray-700">Card Number:</span>
          <input
            type="number"
            value={cardNumber}
            // onChange={(e) => setCardNumber(e.target.value)}
            onChange={(e) => {
              let inputValue = e.target.value;
              // Limit the length to 3 characters
              if (inputValue.length > 16) {
                inputValue = inputValue.slice(0, 16);
              }
              setCardNumber(inputValue);
            }}
            onBlur={() => handleBlur("cardNumber")}
            className={`w-full p-2 border ${
              !cardNumberValid ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
          />
        </label>

        {/* Expiration Date and CVV */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Expiration Date */}
          <label className="block">
            <span className="text-gray-700">Expiration Date:</span>
            <input
              type="number"
              value={expirationDate}
              onChange={(e) => {
                // Get the input value
                let inputValue = e.target.value;
                // Limit the length to 4 characters
                if (inputValue.length > 4) {
                  inputValue = inputValue.slice(0, 4);
                }
                // Set the cvv state with the modified value
                setExpirationDate(inputValue);
              }}
              onBlur={() => handleBlur("expirationDate")}
              className={`w-full p-2 border ${
                !expirationDateValid ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
            />
          </label>

          {/* CVV */}
          <label className="block">
            <span className="text-gray-700">CVV:</span>
            <input
              type="number"
              value={cvv}
              onChange={(e) => {
                // Get the input value
                let inputValue = e.target.value;
                // Limit the length to 3 characters
                if (inputValue.length > 3) {
                  inputValue = inputValue.slice(0, 3);
                }
                // Set the cvv state with the modified value
                setCvv(inputValue);
              }}
              onBlur={() => handleBlur("cvv")}
              className={`w-full p-2 border ${
                !cvvValid ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
              data-cy="cvv"
            />
          </label>
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            validateFields();
            handleCheckout();
          }}
          disabled={loading}
          className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue relative ${
            loading ? "cursor-not-allowed" : ""
          } w-full`}
          data-cy="checkout-btn"
        >
          {/* White spinner */}
          {loading && (
            <div
              data-cy={loading ? "loading" : "not-loading"}
              className="absolute top-1/2 ms-4 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="border-t-4 border-white-700 border-solid h-6 w-6 rounded-full animate-spin"></div>
            </div>
          )}

          {loading ? "Placing Order..." : "Checkout"}
        </button>

        {isSuccess && (
          <p
            // style={{ display: showSuccess && !loading ? "block" : "none" }}
            className={`block bg-green-500 text-white font-bold p-2 rounded mt-4 w-full text-center ${
              showSuccess && !loading ? "fade-in" : "fade-out"
            }`}
          >
            <span>Order placed successfully !</span>
          </p>
        )}

        {/* Other elements */}
      </div>

      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {data && <p className="text-green-500">{data.message}</p>}
    </div>
  );
};
