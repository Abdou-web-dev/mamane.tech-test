import { QueryClient, QueryClientProvider } from "react-query";
import { CreditCardContextProvider } from "./context/CreditCardContext";
import "./index.css";
import CheckoutPage from "./pages/CheckoutPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CreditCardContextProvider>
        <div className="App">
          <CheckoutPage />
        </div>
      </CreditCardContextProvider>
    </QueryClientProvider>
  );
};

export default App;
