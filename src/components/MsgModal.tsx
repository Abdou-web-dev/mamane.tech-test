export const Modal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
