export default function AddMarks() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Add Marks</h1>

      <div className="bg-white p-6 rounded-xl shadow w-96">
        <input className="w-full p-3 border mb-3" placeholder="Student Name"/>
        <input className="w-full p-3 border mb-3" placeholder="Subject"/>
        <input className="w-full p-3 border mb-3" placeholder="Marks"/>

        <button className="bg-blue-600 text-white w-full p-3 rounded">
          Save Marks
        </button>
      </div>
    </>
  );
}
