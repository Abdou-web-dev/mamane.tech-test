import * as React from "react";
import { createContext, useState } from "react";
import { UseMutateFunction, useMutation } from "react-query";
import {
  generateRandomInteger,
  generateRandomPrice,
  generateRandomProductName,
} from "../utils/helpers";

// Initialize the counter outside of the component
let productIdCounter = 0;

export interface CreditCardContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  expirationDate: string;
  setExpirationDate: React.Dispatch<React.SetStateAction<string>>;
  cvc: string;
  setCvc: React.Dispatch<React.SetStateAction<string>>;
  orderData: OrderDataType;
  selectedItems: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data:
    | {
        success: boolean;
        message: string;
      }
    | undefined;
  error: any;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRedBorder: React.Dispatch<React.SetStateAction<boolean>>;
  showRedBorder: boolean;
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  formattedCN: string;
  setFormattedCN: React.Dispatch<React.SetStateAction<string>>;
}

export const CreditCardContext = createContext<CreditCardContextType>({
  selectedItems: [],
  name: "",
  setName: () => {},
  email: "",
  setEmail: () => {},
  address: "",
  setAddress: () => {},
  cardNumber: "",
  setCardNumber: () => {},
  expirationDate: "",
  setExpirationDate: () => {},
  cvc: "",
  setCvc: () => {},
  orderData: {
    order: {
      items: [],
      totalPrice: 0,
    },
    customer: {
      name: "",
      email: "",
      address: "",
    },
    paymentMethod: {
      type: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
  },
  isLoading: false,
  // loading: false,
  isError: false,
  isSuccess: false,
  data: {
    success: false,
    message: "",
  },
  error: "",
  setShowModal: () => {},
  showModal: false,
  showRedBorder: false,
  setShowRedBorder: () => {},
  selectedMonth: "",
  selectedYear: "",
  setSelectedMonth: () => {},
  setSelectedYear: () => {},
  formattedCN: "",
  setFormattedCN: () => {},
});

export const CreditCardContextProvider = ({
  children,
}: {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}) => {
  const [selectedItems, setSelectedItems] = useState([
    {
      productId: "",
      name: "",
      quantity: 0,
      price: 0,
    },
    {
      productId: "",
      name: "",
      quantity: 0,
      price: 0,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [showRedBorder, setShowRedBorder] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [formattedCN, setFormattedCN] = useState("");

  const customerDetails = {
    name: name,
    email: email,
    address: address,
  };

  const orderData: OrderDataType = {
    order: {
      items: selectedItems,
      totalPrice: selectedItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ),
    },
    customer: customerDetails,
    paymentMethod: {
      type: "credit_card",
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvc: cvc,
    },
  };

  // Simulated API endpoint for the POST request
  const postOrder = async (orderData: OrderDataType) => {
    console.log("Sending POST request with data:", orderData);
    constructJson();
    // If any field is missing, prevent further action
    if (!email || !name || !address || !cardNumber || !expirationDate || !cvc) {
      return;
    }
    return { success: true, message: "" };
  };

  // Define a mutation for the POST request
  const {
    // mutate,
    isLoading,
    isError,
    data,
    error,
    isSuccess,
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
    isLoading: boolean | any;
    isSuccess: boolean | any;
    isError: boolean | any;
    data: { success: boolean; message: string } | undefined | any; // replace with the actual success response type
    error: any;
  } = useMutation(postOrder);

  const [jsonData, setJsonData] = useState<OrderDataType>({
    order: {
      items: [],
      totalPrice: 0,
    },
    customer: {
      name: "",
      email: "",
      address: "",
    },
    paymentMethod: {
      type: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
  });

  // Function to construct the JSON object
  // store the input fields' values and the order details in a JSON structure, I can create a function that constructs this JSON object based on the values I have
  const constructJson = () => {
    // Construct the order object based on your data
    const order = {
      items: selectedItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: orderData.order.totalPrice,
    };

    // Construct the customer object
    const customer = {
      name: name,
      email: email,
      address: address, // Assuming you have an 'address' state variable
    };

    // Construct the paymentMethod object
    const paymentMethod = {
      type: "credit_card",
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvc: cvc,
    };

    // Construct the final JSON object
    const jsonData = {
      order: order,
      customer: customer,
      paymentMethod: paymentMethod,
    };

    // Log or use jsonData as needed
    console.log(jsonData);

    // Set jsonData in state if needed
    setJsonData(jsonData);
  };

  const generateRandomProduct = () => {
    // Increment a counter to ensure unique productId values
    productIdCounter += 1;

    return {
      productId: `product_id_${productIdCounter}`,
      name: generateRandomProductName(),
      quantity: generateRandomInteger(),
      price: parseFloat(generateRandomPrice()),
    };
  };

  // the useEffect hook runs only when the component mounts ([] as the dependency array), ensuring that random values are generated only once during the initial render.
  React.useEffect(() => {
    // Function to generate a single random product
    // Generate random values only when the component mounts
    const numRandomProducts = 2; // Adjust as needed
    const randomItems = Array.from(
      { length: numRandomProducts },
      generateRandomProduct
    );
    setSelectedItems(randomItems);
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <CreditCardContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        address,
        setAddress,
        cardNumber,
        setCardNumber,
        expirationDate,
        setExpirationDate,
        cvc,
        setCvc,
        orderData,
        selectedItems,
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        setShowModal,
        showModal,
        showRedBorder,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        setShowRedBorder,
        formattedCN,
        setFormattedCN,
      }}
    >
      {children}
    </CreditCardContext.Provider>
  );
};
