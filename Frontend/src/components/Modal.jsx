
export default function Modal({ isOpen, onClose, title, children, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-2">
          <button 
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
