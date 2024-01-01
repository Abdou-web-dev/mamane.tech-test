import { useContext } from "react";
import { CreditCardInfos } from "../components/CreditCardInfos";
import SelectedItems from "../components/SelectedItems";
import { CreditCardContext } from "../context/CreditCardContext";

const CheckoutPage = () => {
  const { orderData, selectedItems, showModal } = useContext(CreditCardContext);
  return (
    <div className="ms-32 me-10 flex">
      {/* Adding margin on the left side of the page */}
      <div className="left w-1/3">
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
      <div className="right w-1/2 mt-10">
        <CreditCardInfos />
      </div>
    </div>
  );
};

export default CheckoutPage;
