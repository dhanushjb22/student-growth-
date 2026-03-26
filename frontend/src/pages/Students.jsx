export default function Students() {
  const students = [
    {name:"Dhanush", email:"dhanush@gmail.com"},
    {name:"Manu", email:"manu@gmail.com"}
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Students List</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s,i)=>(
              <tr key={i} className="border-b">
                <td className="py-3">{s.name}</td>
                <td>{s.email}</td>
                <td>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </>
  );
}
