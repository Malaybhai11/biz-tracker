export default function Riders() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Riders Management</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Rider Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Rider
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          View all riders{" "}
          <a href="/riders/list" className="text-blue-600 hover:underline">
            here
          </a>
        </p>
      </div>
    </div>
  );
}