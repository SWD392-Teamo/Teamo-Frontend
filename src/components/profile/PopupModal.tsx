import React, { ReactNode } from "react";

interface PopupModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  onSave: () => void;
  saveLabel?: string;
  isSaving?: boolean;
  disableSave?: boolean;
}

export default function PopupModal({
  isOpen,
  title,
  children,
  onClose,
  onSave,
  saveLabel = "Save",
  isSaving = false,
  disableSave = false,
}: PopupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {children}
        <div className="flex justify-end gap-3 mt-4">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          )}

          <button
            onClick={onSave}
            disabled={isSaving || disableSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
