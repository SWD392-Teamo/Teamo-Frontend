import { useEffect, useState } from "react";
import { updateProfileDescription } from "@/actions/userActions";
import { useParams } from "next/navigation";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onUpdate: (newDescription: string) => void; // Hàm cập nhật từ ProfileCard.tsx
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({ isOpen, onClose, description, onUpdate }) => {
  const params = useParams();
  const id =  Number(params.id);
  const [newDescription, setNewDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setError("");
    }
  }, [isOpen]);

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    if (!newDescription) {
      setError("Description cannot be empty.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await updateProfileDescription(id, {description: newDescription});
      console.log("Update description response:", response);
      if (response.statusCode === 200) {
        onUpdate(newDescription);
        onClose();
      }
    } catch (err) {
      setError("Failed to update description. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Description</h2>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
