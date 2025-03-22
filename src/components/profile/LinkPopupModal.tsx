import { addLink, removeLink, updateLink } from "@/actions/userActions";
import { Link } from "@/types";
import { addLinkProfile } from "@/types/interface";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import PopupModal from "./PopupModal";
import { DeleteConfirmationPopup } from "./DeleteLinkConfirm";

interface LinkManagementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  links: Link[];
  onLinksUpdated: (links: Link[]) => void;
}

export const LinkManagementPopup: React.FC<LinkManagementPopupProps> = ({
  isOpen,
  onClose,
  links,
  onLinksUpdated,
}) => {
  const [linksList, setLinksList] = useState<Link[]>([]);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [newLinks, setNewLinks] = useState<{ name: string; url: string }[]>([
    { name: "", url: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLinksList([...links]);
      setNewLinks([{ name: "", url: "" }]);
      setHasChanges(false);
    }
  }, [isOpen, links]);

  const resetForm = () => {
    setNewLinks([{ name: "", url: "" }]);
    setEditingLink(null);
    setError("");
  };

  /**
   * Checks if a given string is a valid URL.
   * If the string does not contain a protocol, http:// is prepended before validation.
   * @param {string} url the URL to be validated
   * @returns {boolean} true if the URL is valid, false otherwise
   */
  const validateUrl = (url: string) => {
    if (!url.trim()) return false;

    try {
      new URL(url);
      return true;
    } catch (err) {
      try {
        new URL(`http://${url}`);
        return true;
      } catch (err) {
        return false;
      }
    }
  };

  /**
   * Returns the given URL string with 'http://' prepended if no protocol is present.
   * @param {string} url the URL to be formatted
   * @returns {string} the formatted URL
   */
  const formatUrl = (url: string) => {
    try {
      new URL(url);
      return url;
    } catch (err) {
      return `http://${url}`;
    }
  };

  const handleAddNewLinkField = () => {
    setNewLinks([...newLinks, { name: "", url: "" }]);
  };

  const handleRemoveLinkField = (index: number) => {
    const updatedLinks = [...newLinks];
    updatedLinks.splice(index, 1);
    setNewLinks(updatedLinks);
  };

  const handleNewLinkChange = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    const updatedLinks = [...newLinks];
    updatedLinks[index][field] = value;
    setNewLinks(updatedLinks);
  };

  const handleAddLinks = async () => {
    const linksToAdd = newLinks.filter(
      (link) => link.name.trim() && link.url.trim()
    );

    if (linksToAdd.length === 0) {
      setError("Please add at least one valid link.");
      return;
    }

    const invalidLinks = linksToAdd.filter((link) => !validateUrl(link.url));
    if (invalidLinks.length > 0) {
      setError("Please ensure all URLs are valid.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formattedLinks: addLinkProfile[] = linksToAdd.map((link) => ({
        name: link.name,
        url: formatUrl(link.url),
      }));

      const updatedUser = await addLink(formattedLinks);

      setLinksList(updatedUser.links);
      setHasChanges(true);
      resetForm();
    } catch (err) {
      console.error("Error saving links:", err);
      setError("Failed to save links. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditLink = async () => {
    if (!editingLink || !editingLink.name.trim() || !editingLink.url.trim()) {
      setError("Both name and URL are required.");
      return;
    }

    if (!validateUrl(editingLink.url)) {
      setError("Please enter a valid URL.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formattedUrl = formatUrl(editingLink.url);

      const updatedLink = await updateLink(editingLink.id, {
        name: editingLink.name,
        url: formattedUrl,
      });

      setLinksList((prevLinks) =>
        prevLinks.map((link) =>
          link.id === editingLink.id ? updatedLink : link
        )
      );

      setHasChanges(true);
      setEditingLink(null);
    } catch (err) {
      console.error("Error updating link:", err);
      setError("Failed to update link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEditLink = (link: Link) => {
    setEditingLink({ ...link });
  };

  const handleEditLinkChange = (field: "name" | "url", value: string) => {
    if (editingLink) {
      setEditingLink({ ...editingLink, [field]: value });
    }
  };

  const handleDeletePrompt = (linkId: number, linkName: string) => {
    setLinkToDelete({ id: linkId, name: linkName });
    setDeleteConfirmOpen(true);
  };

  const handleDeleteLink = async () => {
    if (!linkToDelete) return;

    setIsSubmitting(true);

    try {
      await removeLink(linkToDelete.id);
      setLinksList((prevLinks) =>
        prevLinks.filter((link) => link.id !== linkToDelete.id)
      );
      setHasChanges(true);
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error("Error deleting link:", err);
      setError("Failed to delete link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = () => {
    onLinksUpdated(linksList);
    onClose();
  };

  return (
    <>
      <PopupModal
        isOpen={isOpen}
        title="Manage Links"
        onSave={handleSave}
        disableSave={isSubmitting}
        isSaving={false}
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Edit Link Form */}
          {editingLink && (
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="font-medium text-lg mb-2">Edit Link</h3>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="editLinkName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Link Name
                  </label>
                  <input
                    id="editLinkName"
                    type="text"
                    value={editingLink.name}
                    onChange={(e) =>
                      handleEditLinkChange("name", e.target.value)
                    }
                    className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="GitHub Profile"
                  />
                </div>

                <div>
                  <label
                    htmlFor="editLinkUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    URL
                  </label>
                  <input
                    id="editLinkUrl"
                    type="text"
                    value={editingLink.url}
                    onChange={(e) =>
                      handleEditLinkChange("url", e.target.value)
                    }
                    className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleEditLink}
                    disabled={isSubmitting}
                    className="bg-[#46afe9] hover:bg-[#41a4db] text-white py-2 px-4 rounded-md"
                  >
                    {isSubmitting ? "Processing..." : "Update Link"}
                  </button>

                  <button
                    onClick={() => setEditingLink(null)}
                    className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form for adding multiple links */}
          {!editingLink && (
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-2">Add New Links</h3>

              <div className="space-y-4">
                {newLinks.map((link, index) => (
                  <div key={index} className="p-3 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Link #{index + 1}</span>
                      {newLinks.length > 1 && (
                        <button
                          onClick={() => handleRemoveLinkField(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor={`linkName-${index}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Link Name
                        </label>
                        <input
                          id={`linkName-${index}`}
                          type="text"
                          value={link.name}
                          onChange={(e) =>
                            handleNewLinkChange(index, "name", e.target.value)
                          }
                          className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="GitHub Profile"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`linkUrl-${index}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          URL
                        </label>
                        <input
                          id={`linkUrl-${index}`}
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            handleNewLinkChange(index, "url", e.target.value)
                          }
                          className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleAddNewLinkField}
                    className="border border-dashed border-gray-400 text-gray-600 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-50"
                  >
                    <FaPlus className="mr-2" /> Add Another Link
                  </button>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    onClick={handleAddLinks}
                    disabled={isSubmitting}
                    className="bg-[#46afe9] hover:bg-[#41a4db] text-white py-2 px-4 rounded-md flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <span>Submit All Links</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* List of existing links */}
          <div>
            <h3 className="font-medium text-lg mb-2">Your Links</h3>
            {linksList.length === 0 ? (
              <p className="text-gray-500 italic">No links added yet.</p>
            ) : (
              <ul className="space-y-2">
                {linksList.map((link) => (
                  <li
                    key={link.id}
                    className="flex items-center justify-between border rounded-md p-3"
                  >
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium">
                        {link.name || "Unnamed Link"}
                      </p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#46afe9] text-sm hover:underline truncate block"
                      >
                        {link.url}
                      </a>
                    </div>
                    <div className="flex space-x-2 shrink-0">
                      <button
                        onClick={() => handleStartEditLink(link)}
                        className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(link.id, link.name)}
                        className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </PopupModal>

      <DeleteConfirmationPopup
        isOpen={deleteConfirmOpen}
        linkName={linkToDelete?.name || ""}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirmDelete={handleDeleteLink}
        isDeleting={isSubmitting}
      />
    </>
  );
};
