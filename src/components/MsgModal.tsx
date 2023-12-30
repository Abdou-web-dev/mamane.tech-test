import { useContext, useState } from "react";
import { CreditCardContext } from "../context/CreditCardContext";
import SelectedItems from "./SelectedItems";

export const Modal = () => {
  const { selectedItems } = useContext(CreditCardContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{"You ordered the following :"}</p>
        <SelectedItems {...{ selectedItems }} />

        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};
