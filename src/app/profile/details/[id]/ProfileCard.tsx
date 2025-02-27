import { User } from "@/types";


const ProfileCard: React.FC<{user: User}> = ({ user }) => {

  console.log("img", user.imgUrl);

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <section className="flex items-center space-x-4">
            <img 
              src={user.imgUrl} 
              alt="Profile Picture" 
              className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"/>
            </section>

            

        <section>
          <h1 className="text-3xl font-bold text-gray-800">{user.firstName}</h1>
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
                <td className="py-2 text-gray-600">{user.phone || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Skills Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills</h2>
          <ul className="list-disc pl-5 space-y-2">
          {user.studentSkills && user.studentSkills.length > 0 ? (
              user.studentSkills.map((skill) => (
                <button key={user.id} className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold mr-4">
                  {skill.skillName}
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