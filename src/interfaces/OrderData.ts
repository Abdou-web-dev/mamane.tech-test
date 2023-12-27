interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  items: OrderItem[];
  totalPrice: number;
}

interface Customer {
  name: string;
  email: string;
  address: string;
}

interface PaymentMethod {
  type: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

interface OrderDataType {
  order: Order;
  customer: Customer;
  paymentMethod: PaymentMethod;
}
