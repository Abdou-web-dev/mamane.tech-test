import { useContext, useEffect } from "react";
import { CreditCardContext } from "../context/CreditCardContext";
import SelectedItems from "./SelectedItems";

export const Modal = ({
  setShowModal,
  showModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}) => {
  const { selectedItems, orderData } = useContext(CreditCardContext);

  useEffect(() => {
    const closeModalOnOutsideClick = (event: MouseEvent) => {
      // Check if the click is outside the modal content
      const modalContent = document.querySelector(".modal-content");
      if (modalContent && !modalContent.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    const closeModalOnEscapeKey = (event: KeyboardEvent) => {
      // Check if the pressed key is the ESC key (key code 27)
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    // Attach event listeners when the modal is shown
    if (showModal) {
      document.addEventListener("mousedown", closeModalOnOutsideClick);
      document.addEventListener("keydown", closeModalOnEscapeKey);
    }

    // Detach event listeners when the modal is hidden or component unmounts
    return () => {
      document.removeEventListener("mousedown", closeModalOnOutsideClick);
      document.removeEventListener("keydown", closeModalOnEscapeKey);
    };
  }, [showModal, setShowModal]);

  return (
    <div
      className="modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black 
    bg-opacity-50"
    >
      <div className="relative modal-content w-2/5 bg-white p-8 rounded shadow-md">
        <p className="text-lg text-gray-800 mb-4">
          {"You ordered the following :"}
        </p>
        <>
          <p className="text-xl font-bold mb-4 text-blue-600">
            <span className="text-md font-serif mb-4 text-gray-600">
              Total Price : &nbsp;
            </span>
            $ {orderData.order.totalPrice.toFixed(2)}
          </p>
        </>
        <SelectedItems {...{ selectedItems, showModal }} />

        <button
          className="bg-blue-400 absolute top-2 right-2 text-white px-4 py-2 rounded
           cursor-pointer transition duration-300 hover:bg-blue-600"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
