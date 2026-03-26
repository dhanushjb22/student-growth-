import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Analytics() {

  const data = [
    { subject: "Data Structures", marks: 85 },
    { subject: "Database", marks: 78 },
    { subject: "OS", marks: 92 },
    { subject: "Networks", marks: 88 },
    { subject: "Web", marks: 95 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Performance Analytics</h1>

      <div className="bg-white p-6 rounded-xl shadow w-fit">
        <BarChart width={600} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="marks" />
        </BarChart>
      </div>
    </div>
  );
}
