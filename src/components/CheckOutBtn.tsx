import { FunctionComponent, useContext } from "react";
import { CreditCardContext } from "../context/CreditCardContext";

interface CheckOutBtnProps {
  validateFields: () => boolean;
  handleCheckout: () => Promise<void>;
  showSuccess: boolean;
  loading: boolean;
  showFailure: boolean;
}

export const CheckOutBtn: FunctionComponent<CheckOutBtnProps> = ({
  validateFields,
  handleCheckout,
  showSuccess,
  loading,
  showFailure,
}) => {
  const {
    name: nameField,
    email: emailField,
    address: addressField,
    // cardNumber: creditCardNumber,
    formattedCN,
    cvc: cvcField,
    selectedMonth,
    selectedYear,
    setFormattedCN,
    setName,
    setEmail,
    setAddress,
    setCardNumber,
    setCvc,
    setSelectedMonth,
    setSelectedYear,
  } = useContext(CreditCardContext);

  function handleResetFields() {
    // console.log("handleResetFields clicked");
    setName("");
    setEmail("");
    setAddress("");
    setFormattedCN("");
    setCardNumber("");
    setCvc("");
    setSelectedMonth("");
    setSelectedYear("");
  }

  let is_at_least_one_field_filled: boolean =
    nameField ||
    emailField ||
    addressField ||
    formattedCN ||
    cvcField ||
    selectedMonth ||
    selectedYear
      ? true
      : false;

  return (
    // Using min-w-80 to set a minimum width for the container is a good solution. This way, the container won't shrink below a certain width, and the "Checkout" button can retain the desired width while both buttons are displayed next to each other.
    <div className="checkout-reset-btns-container">
      <div className="flex gap-3 min-w-80 checkout-reset-btns-inner ">
        <button
          className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue relative ${
            loading ? "cursor-not-allowed" : ""
          } w-full`}
          onClick={() => {
            if (validateFields()) {
              handleCheckout();
            }
          }}
          disabled={loading}
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
        <button
          className={`mt-4 bg-stone-400 text-white px-4 py-2 rounded hover:bg-stone-600 
        focus:outline-none focus:shadow-outline-blue relative ${
          is_at_least_one_field_filled ? "" : "cursor-not-allowed"
        } `}
          onClick={() => {
            handleResetFields();
          }}
          disabled={!is_at_least_one_field_filled ? true : false}
          data-cy="reset-btn"
        >
          Reset
        </button>
      </div>

      {!loading && showSuccess && (
        <p
          // style={{ display: showSuccess && !loading ? "block" : "none" }}
          className={`block bg-green-500 text-white font-bold p-2 rounded mt-4 w-full text-center ${
            showSuccess && !loading ? "fade-in" : "fade-out"
          }`}
        >
          <span>Order placed successfully !</span>
        </p>
      )}

      {showFailure && (
        <p
          // style={{ display: showSuccess && !loading ? "block" : "none" }}
          className={`block bg-red-500 text-white font-bold p-2 rounded mt-4 w-full text-center ${
            showFailure && !loading ? "fade-in" : "fade-out"
          }`}
        >
          <span>Failed to place order !</span>
        </p>
      )}
    </div>
  );
};
