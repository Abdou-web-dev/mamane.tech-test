import { number } from "card-validator";

export function generateRandomPrice() {
  // Generate a random float between 1.00 and 5000
  return (Math.random() * (200 - 1) + 1).toFixed(2);
}

export function generateRandomInteger() {
  // Generate a random float between 0 (inclusive) and 1 (exclusive)
  const randomFloat = Math.random();

  // Scale the random float to the range [1, 10]
  const randomInteger = Math.floor(randomFloat * 10) + 1;

  return randomInteger;
}

const productNames = [
  "Laptop",
  "Smartphone",
  "Headphones",
  "Camera",
  "Smartwatch",
  "Tablet",
  "Printer",
  "Gaming Console",
  "Fitness Tracker",
  "Wireless Earbuds",
];

export const getCardType = (cardNumber: string) => {
  // Remove non-numeric characters
  const cleanNumber = cardNumber.replace(/\D/g, "");

  // Define patterns for different card types
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    // Add more patterns as needed
  };

  // Check the patterns to determine the card type
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleanNumber)) {
      return type;
    }
  }

  // Default to unknown if no pattern matches
  return "unknown";
};

export function generateRandomProductName() {
  const randomProductName =
    productNames[Math.floor(Math.random() * productNames.length)];
  return randomProductName;
}

export const isValidCardNumber = (value: string): boolean => {
  const validation = number(value);
  return validation.isValid;
};
