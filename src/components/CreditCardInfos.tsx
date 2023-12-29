interface CreditCardInfosProps {}
import { number } from "card-validator";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UseMutateFunction, useMutation } from "react-query";
import { object, string } from "zod";
import { CreditCardContext } from "../context/CreditCardContext";
import ExpiryDateDropdown from "./DatePicker";
import "./styles.css";

export const CreditCardInfos: FunctionComponent<CreditCardInfosProps> = () => {
  // I renamed some state variables inside this component , added Field word so that I can use them in zod validation...
  const {
    name: nameField,
    setName,
    email: emailField,
    setEmail,
    address: addressField,
    setAddress,
    cardNumber: creditCardNumber,
    setCardNumber,
    cvv: cvvField,
    setCvv,
    // expirationDate,
    // setExpirationDate,
    // handleCheckout,
    // isLoading,
    // loading,
    error,
    data,
    isError,
    isSuccess,
    // showSuccess,
    orderData,
  } = useContext(CreditCardContext);

  const formData = {
    email: emailField,
    name: nameField,
    cardNumber: creditCardNumber,
    address: addressField,
    cvv: cvvField,
    // other fields...
  };

  // valid CN : 374200000000004

  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [cardNumberValid, setCardNumberValid] = useState(true);
  // const [expirationDateValid, setExpirationDateValid] = useState(true);
  const [cvvValid, setCvvValid] = useState(true);
  // **********
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [monthValid, setMonthValid] = useState(true);
  const [yearValid, setYearValid] = useState(true);

  function validateFields(): boolean {
    // Reset validation state
    setEmailValid(true);
    setNameValid(true);
    setAddressValid(true);
    setCardNumberValid(true);
    // setExpirationDateValid(true);
    setCvvValid(true);
    setMonthValid(true);
    setYearValid(true);

    // Perform validation logic here
    if (!emailField) {
      setEmailValid(false);
    }
    if (!nameField) {
      setNameValid(false);
    }
    if (!addressField) {
      setAddressValid(false);
    }
    if (!creditCardNumber) {
      setCardNumberValid(false);
    }
    // if (!expirationDate) {
    //   // setExpirationDateValid(false);
    // }
    if (!cvvField) {
      setCvvValid(false);
    }
    if (!selectedMonth) {
      setMonthValid(false); // Set to true if the condition is met
    }
    if (!selectedYear) {
      setYearValid(false);
    }

    // Return true if all fields are valid, false otherwise
    return (
      yearValid &&
      monthValid &&
      emailValid &&
      nameValid &&
      addressValid &&
      cardNumberValid &&
      // expirationDateValid &&
      cvvValid
    );
  }

  // Outside the component or as part of your state management

  // To remove the red border as soon as the user types something in the field
  const handleBlur = (field: string) => {
    switch (field) {
      case "email":
        setEmailValid(!!emailField); // Set to true if email is not empty
        break;
      // !!email: The !! is a JavaScript idiom to convert a value to a boolean. It's essentially a double negation. If email is a truthy value (not empty or not falsy), !!email will be true. If email is an empty string or a falsy value, !!email will be false.
      case "name":
        setNameValid(!!nameField);
        break;
      case "address":
        setAddressValid(!!addressField);
        break;
      case "cardNumber":
        setCardNumberValid(!!creditCardNumber);
        // setCardNumberValid(creditCardNumber.length === 16);
        // if (creditCardNumber.length !== 16) {
        //   setModalMessage("Credit card number must be 16 digits.");
        //   setShowModal(true);
        // }
        break;
      case "expirationDate":
        // setExpirationDateValid(!!expirationDate);
        break;
      case "cvv":
        setCvvValid(!!cvvField);
        break;
      case "month":
        setMonthValid(!!selectedMonth);
        break;
      case "year":
        setYearValid(!!selectedYear);
        break;
      default:
        break;
    }
  };
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const isValidCardNumber = (value: string): boolean => {
    const validation = number(value);
    return validation.isValid;
  };

  // Define your schema using Zod
  const schema = object({
    email: string().email(),
    name: string(),
    address: string(),
    cardNumber: string().refine((value) => isValidCardNumber(value), {
      message: "Invalid credit card number",
    }),
    cvv: string().refine((value) => value.length === 3, {
      message: "CVV must be 3 digits",
    }),
    // expirationDate: z.object({
    //   month: z.string(),
    //   year: z.string(),
    // }),
  });

  const emailSchema = object({
    email: string().email(),
  });
  const emailData = {
    email: emailField,
  };
  const emailValidationResult = emailSchema.safeParse(emailData);

  const postOrder = async (orderData: OrderDataType) => {
    console.log("Sending POST request with data:", orderData);

    try {
      // Simulate a successful response from the server
      // Adjust this part based on the actual structure of your server response
      const simulatedResponse = {
        success: true,
        message: "Order placed successfully!",
      };

      console.log(
        "Server response:",
        simulatedResponse.success,
        simulatedResponse.message
      );
      // Assuming you want to show the success message upon successful checkout
      setShowSuccess(true);
      // Delay to hide the success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return simulatedResponse;
    } catch (error) {
      console.error("Mutation error:", error);
      // Simulate an error response from the server
      return { success: false, message: "Error placing the order" };
    }
  };

  const {
    mutate,
  }: {
    mutate:
      | UseMutateFunction<
          {
            success: boolean;
            message: string;
          },
          unknown,
          OrderDataType,
          unknown
        >
      | any;
  } = useMutation(postOrder);

  const handleCheckout = async () => {
    // These lines ensure that the function won't proceed with the checkout process if any of the required fields are missing.

    if (
      !emailField ||
      !nameField ||
      !addressField ||
      !creditCardNumber ||
      !selectedMonth ||
      !selectedYear ||
      !cvvField
    ) {
      return;
    }
    // Validate the form data using Zod schema
    try {
      const validationResult = schema.safeParse(formData);

      if (validationResult.success) {
        // Validation succeeded
        console.log("Valid user credentials and card infos!");

        // Proceed with the checkout process
        setIsLoading(true);

        // Introduce a delay before placing the order
        setTimeout(async () => {
          try {
            // Call the mutation to send the POST request
            // console.error("About to call mutate with orderData:", orderData);
            const result = await mutate(orderData);
            // console.log(result);

            // If successful, you might want to handle the result accordingly
            if (result && result.success) {
              // Handle success (e.g., show a success message)
              console.log(result.message);

              // setShowSuccess(true);
            }
          } catch (error) {
            // Handle mutation error
            console.error("Mutation error:", error);
          } finally {
            // Reset loading state after placing the order (whether successful or not)
            setIsLoading(false);
          }
        }, 2000); // 2000 milliseconds (2 seconds)
      } else {
        // Validation failed
        console.error("Validation errors:", validationResult.error.errors);

        // Optionally, you can update state or show error messages to the user
      }
    } catch (error: any) {
      // Handle validation errors
      console.error("Validation error:", error.errors);
      return;
    }
  };

  useEffect(() => {
    if (nameField) handleBlur("name");
    if (addressField) handleBlur("address");
    if (emailField) handleBlur("email");
  }, [nameField, addressField, emailField]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Customer Details */}
      <div className="">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          Customer Details
        </h2>

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
                emailValidationResult.success
                  ? "text-green-500"
                  : "text-red-500"
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

      {/* Payment Method */}
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
          {/* Expiration Date */}
          {/* <label className="block">
            <span className="text-gray-700">Expiration Date:</span>
            <input
              value={expirationDate}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => {
                // Get the input value
                let inputValue = e.target.value;
                // Limit the length to 4 characters
                inputValue = inputValue.replace(/\D/g, "");
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
          </label> */}

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
              type="text"
              value={cvvField}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => {
                // Get the input value
                let inputValue = e.target.value;
                inputValue = inputValue.replace(/\D/g, "");
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

      <div>
        <button
          onClick={() => {
            if (validateFields()) {
              handleCheckout();
            }
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

        {/* Other elements */}
      </div>

      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {/* <>
        {showModal && (
          <Modal message={modalMessage} onClose={handleModalClose} />
        )}
      </> */}
    </div>
  );
};
