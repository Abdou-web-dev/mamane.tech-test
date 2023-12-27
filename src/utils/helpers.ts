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

export function generateRandomProductName() {
  const randomProductName =
    productNames[Math.floor(Math.random() * productNames.length)];
  return randomProductName;
}
