import { banUser } from "@/actions/userActions";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  message: string;
  onConfirm: () => void;
};

export default function ConfirmationPopup({ message, onConfirm }: Props) {
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <span className="text-lg font-medium text-gray-700 text-center">
        {message}
      </span>
      <div className="flex justify-end space-x-3 w-full pt-2">
        <button onClick={onConfirm} className="btn btn--primary">
          OK
        </button>
      </div>
    </div>
  );
}
