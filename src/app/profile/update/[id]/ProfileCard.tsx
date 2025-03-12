import { Contact, StudentSkill, User } from "@/types";
import { useEffect, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ContactModal from "./ContactModal";
import SkillModal from "@/app/profile/update/[id]/SkillModal";
import DescriptionModal from "@/app/profile/update/[id]/DescriptionModal";
import { fetchUserProfile } from "@/actions/userActions";

const ProfileCard: React.FC<{ user: User }> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit contact" | "add contact" | "delete contact" | "edit skill" | "add skill" | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<StudentSkill | null>(null);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [userDescription, setUserDescription] = useState(user.description || "No description available");
  const [contacts, setContacts] = useState<Contact[]>(user.links || []);
  const [skills, setSkills] = useState<StudentSkill[]>(user.studentSkills || []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const updatedUser = await fetchUserProfile(user.id);
        setUserDescription(updatedUser.description || "No description available");
        setContacts(updatedUser.links || []);
        setSkills(updatedUser.studentSkills || []);
      } catch (error) {
        console.error("Error fetching updated user data:", error);
      }
    };
    fetchUserData();
  }, [forceUpdate]);

  const openModal = (
    type: "edit contact" | "add contact" | "delete contact" | "edit skill" | "add skill",
    skill: StudentSkill | null = null
    ) => {
      if (type.includes("skill")) {
        setSelectedSkill(skill);
      }
      setModalType(type);
      setIsModalOpen(true);
  };

  const openDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDescriptionModalOpen(false);
    setForceUpdate(prev => prev + 1);
  };

  const handleDescriptionUpdate = (newDesc: string) => {
    setUserDescription(newDesc);
  };

  const handleContactUpdate = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
  }

  console.log("contacts:", contacts);

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 relative">
        <section className="flex items-center justify-between mb-2">
          <ProfileAvatar imgUrl={user.imgUrl} />
        </section>
        <section>
          <h1 className="text-3xl font-bold text-gray-800">{user.lastName} {user.firstName}</h1>
        </section>

        {/* About Section */}
        <section className="mt-8">
        <button
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => openDescriptionModal()}
          >
            About ✏️
        </button>
        <p className="text-gray-600 mb-4">{userDescription || "No description available"}</p>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-gray-600 font-medium">Name</th>
                <th className="text-left py-2 text-gray-600 font-medium">Email</th>
                <th className="text-left py-2 text-gray-600 font-medium">Major</th>
                <th className="text-left py-2 text-gray-600 font-medium">Contacts</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-gray-600">{user.lastName} {user.firstName}</td>
                <td className="py-2 text-gray-600">{user.email}</td>
                <td className="py-2 text-gray-600">{user.majorCode}</td>
                <td className="py-2 text-gray-600">
                  {user.links && user.links.length >= 0 ? (
                    <div>
                      <button
                        className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Contacts ▼
                      </button>
                      {isDropdownOpen && (
                        <ul className="mt-2 bg-white shadow-md rounded p-2">
                          {contacts.map((contact) => (
                            <li key={contact.id} className="py-1">
                              <span className="py-2 text-gray-600">{contact.name}: {contact.url}</span>
                            </li>
                          ))}
                          <button
                            className="mt-2 px-4 py-2 bg-logo text-white rounded mr-2"
                            onClick={() => openModal("add contact")}
                          >
                            Add more
                          </button>
                          <button
                            className="mt-2 px-4 py-2 bg-white text-logo border border-logo rounded mr-2"
                            onClick={() => openModal("edit contact")}
                          >
                            Edit
                          </button>
                          <button
                            className="mt-2 px-4 py-2 bg-danger text-white rounded"
                            onClick={() => openModal("delete contact")}
                          >
                            Delete
                          </button>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <span>No contacts added</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Skills Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills</h2>
          <ul className="list-disc space-y-2 gap-4">
            {skills && skills.length > 0 ? (
              skills.map((skill) => (
                <button 
                  key={skill.id} 
                  className="mr-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold"
                  onClick={() => openModal("edit skill", skill)}
                >
                  {skill.skillName}
                  <br/>
                  {skill.skillLevel && <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{skill.skillLevel}</span>}
                </button>
              ))
            ) : (
              <button className="px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
                No skills added
              </button>
            )}
            <button 
              className="px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold"
              onClick={() => openModal("add skill")}
            >
              + Add Skill
            </button>
          </ul>
        </section>
      </div>

      {modalType && modalType.includes("contact") && (
        <ContactModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          modalType={modalType} 
          existingContacts={contacts} 
          onUpdateContacts={handleContactUpdate} />
      )}

      {modalType && modalType.includes("skill") && (
        <SkillModal
        isOpen={isModalOpen}
        onClose={() => {closeModal();}}
        modalType={modalType}
        studentSkill={selectedSkill}
      />
      )}

      <DescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={closeModal}
        description={userDescription}
        onUpdate={handleDescriptionUpdate} // Callback function
      />
    </main>
  );
};

export default ProfileCard;
