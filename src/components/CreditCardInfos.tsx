interface CreditCardInfosProps {}
import { number } from "card-validator";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UseMutateFunction, useMutation } from "react-query";
import { object, string } from "zod";
import { CreditCardContext } from "../context/CreditCardContext";
import { CheckOutBtn } from "./CheckOutBtn";
import { CustomerDetails } from "./CustomerDetails";
import { Modal } from "./MsgModal";
import { PaymentMethod } from "./PaymentMethod";
import "./styles.css";

export const CreditCardInfos: FunctionComponent<CreditCardInfosProps> = () => {
  // I renamed some state variables inside this component , added Field word so that I can use them in zod validation...
  const {
    name: nameField,
    email: emailField,
    address: addressField,
    cardNumber: creditCardNumber,
    cvv: cvvField,
    error,
    isError,
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
      <CustomerDetails
        {...{
          addressValid,
          emailValid,
          emailValidationResult,
          handleBlur,
          nameValid,
        }}
      ></CustomerDetails>

      {/* Payment Method */}
      <PaymentMethod
        {...{
          cvvValid,
          handleBlur,
          selectedMonth,
          setSelectedMonth,
          selectedYear,
          setSelectedYear,
          monthValid,
          yearValid,
          cardNumberValid,
          isValidCardNumber,
          setCardNumberValid,
        }}
      />

      <CheckOutBtn
        {...{
          handleCheckout,
          showSuccess,
          validateFields,
          loading,
        }}
      />

      {isError && <p className="text-red-500">Error: {error.message}</p>}
      <>{!loading && showSuccess && <Modal />}</>
    </div>
  );
};
