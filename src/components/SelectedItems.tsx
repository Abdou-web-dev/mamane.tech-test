import { FunctionComponent } from "react";

export interface SelectedItemsProps {
  selectedItems: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  showModal?: boolean;
}

const SelectedItems: FunctionComponent<SelectedItemsProps> = ({
  selectedItems,
  showModal,
}: SelectedItemsProps) => {
  return (
    <div className="flex flex-col items-start space-y-10">
      {/* Selected Items as Cards */}
      {selectedItems?.map((item, index) => (
        <div
          className={`p-4 rounded-lg shadow-md w-64 ${
            !showModal ? "bg-white" : "bg-slate-200"
          }`}
          key={`${item.productId}-${index}`}
          data-cy={`product-item-${index}`}
        >
          {/* Product Name at the top left */}
          <div
            className="text-2xl lg:text-xl font-bold mb-2"
            data-cy="product-name"
          >
            {item.name}
          </div>

          {/* Quantity underneath the product name */}
          <div
            className="text-gray-600 text-2xl lg:text-xl mb-2"
            data-cy="product-quantity"
          >
            Quantity: {item.quantity}
          </div>

          {/* Price centered and at the right */}
          <div
            className=" font-bold text-2xl lg:text-xl text-right"
            data-cy="product-price"
          >
            $ {item.price.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedItems;
