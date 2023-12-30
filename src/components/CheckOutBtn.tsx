import { FunctionComponent } from "react";

interface CheckOutBtnProps {
  validateFields: () => boolean;
  handleCheckout: () => Promise<void>;
  showSuccess: boolean;
  loading: boolean;
}

export const CheckOutBtn: FunctionComponent<CheckOutBtnProps> = ({
  validateFields,
  handleCheckout,
  showSuccess,
  loading,
}) => {
  return (
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
    </div>
  );
};
