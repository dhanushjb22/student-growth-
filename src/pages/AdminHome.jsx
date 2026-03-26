export default function AdminHome() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2>Total Students</h2>
          <p className="text-4xl font-bold mt-2">120</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <h2>Total Subjects</h2>
          <p className="text-4xl font-bold mt-2">6</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
          <h2>Avg Attendance</h2>
          <p className="text-4xl font-bold mt-2">88%</p>
        </div>

        <div className="bg-pink-600 text-white p-6 rounded-xl shadow">
          <h2>Top Performer</h2>
          <p className="text-xl font-bold mt-2">Dhanush</p>
        </div>

      </div>
    </>
  );
}
