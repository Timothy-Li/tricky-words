import "./Modal.css";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />

      <div
        className={`modal-content ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          x
        </button>
        <h2 id="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
      </div>
    </>
  );
}
