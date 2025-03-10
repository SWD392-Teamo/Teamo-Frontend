import { User } from "@/types";
import Link from "next/link";
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";


const ProfileCard: React.FC<{user: User}> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const link = `/profile/update/${user.id}`;

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 relative">
        <section className="flex items-center justify-between mb-2">
            <ProfileAvatar imgUrl={user.imgUrl}/>
            <div className="absolute top-4 right-4">
            <Link href={"/"}>
              <button className=" px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold mr-2">
                Application
              </button>
            </Link>
            <Link href={link}>
              <button className=" px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
                Edit
              </button>
            </Link>
            </div>
            </section>
        <section>
          <h1 className="text-3xl font-bold text-gray-800">{user.lastName} {user.firstName}</h1>
        </section>

        {/* About Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">About</h2>
          <p className="text-gray-600 mb-4">
            {user.description}
          </p>
          
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
                  {user.links && user.links.length > 0 ? (
                    <div>
                      <button
                        className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Contacts ▼
                      </button>
                      {isDropdownOpen && (
                        <ul className="mt-2 bg-white shadow-md rounded p-2">
                          {user.links.map((contact) => (
                            <li key={contact.id} className="py-1">
                              <span className="py-2 text-gray-600">{contact.name}: {contact.url}</span>
                            </li>
                          ))}
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
          <ul className="list-disc space-y-2">
          {user.studentSkills && user.studentSkills.length > 0 ? (
              user.studentSkills.map((skill) => (
                <button key={skill.id} className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold mr-4">
                  {skill.skillName}
                  <br/>
                  {skill.skillLevel && <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{skill.skillLevel}</span>}
                </button>
              ))
            ) : (
              <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold mr-4">
                No skills added
              </button>
            )}
          </ul>
        </section>
      </div>
  </main>
  );
};

export default ProfileCard;