import { useContext } from "react";
import { CreditCardInfos } from "../components/CreditCardInfos";
import SelectedItems from "../components/SelectedItems";
import { CreditCardContext } from "../context/CreditCardContext";

const CheckoutPage = () => {
  const { orderData, selectedItems, showModal } = useContext(CreditCardContext);

  return (
    <div className="checkout-page-container md:flex md:space-x-4 lg:ms-32 flex-col lg:flex-row items-center">
      {/* Responsive layout for small screens: Stack on top of each other */}
      <div className="mb-8 md:mb-0 w-full md:w-1/3 selected-items-wrapper">
        {showModal ? null : (
          <p className="text-xl font-bold mb-4 text-blue-600">
            <span className="text-md font-serif mb-4 text-gray-600">
              Total Price : &nbsp;
            </span>
            $ {orderData.order.totalPrice.toFixed(2)}
          </p>
        )}

        {showModal ? null : <SelectedItems {...{ selectedItems }} />}
      </div>

      {/* Responsive layout for medium and larger screens: Display side by side */}
      <div
        // style={{ width: "80%" }}
        className="w-full md:w-1/2 mt-10 card-infos-wrapper"
      >
        <CreditCardInfos />
      </div>
    </div>
  );
};

export default CheckoutPage;
