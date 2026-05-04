"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

export default function PollChart({ data }: Props) {
  return (
    <BarChart width={400} height={250} data={data}>
      <XAxis dataKey="name" tick={{ fill: "var(--color-text)" }} />
      <YAxis tick={{ fill: "var(--color-text)" }} />
      <Tooltip />
      <Bar dataKey="value" fill="var(--color-primary)" radius={10} />
    </BarChart>
  );
}
