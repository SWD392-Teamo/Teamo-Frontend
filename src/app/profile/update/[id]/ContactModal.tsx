import { addContact, deleteContact, updateContact } from "@/actions/userActions";
import { Contact } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: "edit contact" | "add contact" | "delete contact" | "edit skill" | "add skill" | null;
  existingContacts: Contact[];
  onUpdateContacts: (updatedContacts: Contact[]) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  modalType,
  existingContacts,
  onUpdateContacts,
}) => {
    const params = useParams();
    const id =  Number(params.id);
    const [contactName, setContactName] = useState("");
    const [contactUrl, setContactUrl] = useState("");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [newContacts, setNewContacts] = useState<Contact[]>(existingContacts);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      if (!isOpen) {
        setError("");
      }
    }, [isOpen]);

    const handleSelectContact = (contactName: string) => {
      const selected = existingContacts.find((contact) => contact.name === contactName);
      if (selected) {
        setSelectedContact(selected);
        setContactName(selected.name);
        setContactUrl(selected.url);
      }
    };

    const handleSave = async () => {
      setIsLoading(true);
      setError("");
      if (!contactName || !contactUrl) {
        console.error("Both fields are required.");
        setError("Both fields are required.");
        setIsLoading(false);
        return;
      }

      if (modalType === "edit contact" && selectedContact) {
        console.log("Updating contact:", { contactName, contactUrl });
        const response = await updateContact(id, selectedContact.id, {name: contactName, url: contactUrl} );
        try {
          console.log("Updated contact successfully:", response);
          const updatedContacts = newContacts.map((contact) =>
            contact.name === selectedContact.name ? { ...contact, name: contactName, url: contactUrl } : contact
          );

          setNewContacts(updatedContacts);
          if (response.statusCode === 200) {
            onUpdateContacts(newContacts);
            onClose();
          }
        } catch (error) {
          setError("Failed to update contact!");
          console.log("Failed to update contact!");
        }
      } else {
        console.log("Adding new contact:", { contactName, contactUrl });
        const response = await addContact(id, {name: contactName, url: contactUrl});
        try {
          console.log("Added new contact successfully:", response);
          const contactId = existingContacts.length + 1;
          const newContact: Contact = {id: contactId, name: contactName, url: contactUrl };
          setNewContacts([...newContacts, newContact]);
          if (response.statusCode === 200) {
            onUpdateContacts(newContacts);
            onClose();
          }
        } catch (error) {
          setError("Failed to add new contact!");
          console.log("Failed to add new contact!");
        } finally {
          setIsLoading(false);
        }
      };
    };

    const handleDelete = async () => {
        if (selectedContact) {
          console.log("Deleting contact:", selectedContact);
          const response = await deleteContact(id, selectedContact.id);
          setNewContacts(newContacts.filter((contact) => contact.name !== selectedContact?.name));
          try {
            console.log("Deleted contact successfully!");
            if (response.statusCode === 200) {
              onUpdateContacts(newContacts);
              onClose();
            }
          } catch (error) {
            console.error("Error deleting contact:", error);
            console.log("Failed to delete contact!");
          }
        }
    };
    
    if (!isOpen) return null;

    console.log("Selected contact:", selectedContact);
    console.log("contactName:", contactName);
    console.log("contactUrl:", contactUrl);
    console.log("newContacts:", newContacts);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
            {modalType === "add contact" ? "Add Contact" : modalType === "edit contact" ? "Edit Contact" : "Delete Contact"}
            </h2>
            {modalType === "edit contact" && (
              <select
                className="w-full border p-2 rounded mb-2"
                onChange={(e) => handleSelectContact(e.target.value)}
                value={selectedContact?.name}
              >
                <option value="">Select Contact</option>
                {existingContacts.map((contact) => (
                  <option key={contact.name} value={contact.name}>
                    {contact.name}
                  </option>
                ))}
              </select>
            )}
            {modalType === "delete contact" && (
              <><select
              className="w-full border p-2 rounded mb-2"
              onChange={(e) => handleSelectContact(e.target.value)}
              value={selectedContact?.name}
            >
              <option value="">Select Contact</option>
              {existingContacts.map((contact) => (
                <option key={contact.name} value={contact.name}>
                  {contact.name}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 bg-logo text-white rounded mr-2"
              onClick={handleDelete}
            >
                Confirm
              </button></>
            )}
            <input
              type="text"
              placeholder="Contact Name"
              className="w-full border p-2 rounded mb-2"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              disabled={modalType === "edit contact" && !selectedContact}
              hidden={modalType === "delete contact"}
            />
            <input
              type="text"
              placeholder="Contact URL"
              className="w-full border p-2 rounded mb-3"
              value={contactUrl}
              onChange={(e) => setContactUrl(e.target.value)}
              disabled={modalType === "edit contact" && !selectedContact}
              hidden={modalType === "delete contact"}
            />
            {error && 
              <p 
                className="text-red-500 text-sm mt-1 mb-1"
                hidden={modalType === "delete contact"}>
                  {error}
              </p>}
            <button
              className="px-4 py-2 bg-logo text-white rounded mr-2"
              onClick={handleSave}
              disabled={modalType === "edit contact" && !selectedContact || isLoading}
              hidden={modalType === "delete contact"}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button 
              className="px-4 py-2 bg-gray-300 rounded" 
              onClick={onClose}
              disabled={isLoading}>
              Cancel
            </button>
          </div>
        </div>
      );
    };
    

export default ContactModal;
