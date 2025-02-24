

const ProfileCard = () => {
  

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <section className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits"
                alt="Profile"
              />
            </section>

        <section>
          <h1 className="text-3xl font-bold text-gray-800">Name</h1>
        </section>

        {/* About Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">About</h2>
          <p className="text-gray-600 mb-4">
            Description
          </p>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-gray-600 font-medium">Name</th>
                <th className="text-left py-2 text-gray-600 font-medium">Email</th>
                <th className="text-left py-2 text-gray-600 font-medium">Major</th>
                <th className="text-left py-2 text-gray-600 font-medium">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-gray-600">Name</td>
                <td className="py-2 text-gray-600">abc@test.com</td>
                <td className="py-2 text-gray-600">SE</td>
                <td className="py-2 text-gray-600">0123456789</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Skills Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills</h2>
          <ul className="list-disc pl-5 space-y-2">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-4">
            Java
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-4">
            React
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-4">
            Teamwork
          </button>
          </ul>
        </section>
      </div>
  </main>
  );
};

export default ProfileCard;