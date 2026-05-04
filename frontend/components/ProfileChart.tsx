"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

//   const chartData = [
//     { name: "Active", value: 5 },
//     { name: "Inactive", value: 2 },
//   ];

export default function PollChart({ data }: Props) {
  return (
    <BarChart width={400} height={250} data={data}>
      <XAxis dataKey="poll_title" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" radius={10} />
    </BarChart>
  );
}
