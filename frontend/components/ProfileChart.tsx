"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Typography from "./ui/typography/Typography";

type Props = {
  data: { name: string; total_votes: number }[];
};

export default function PollChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" stroke="var(--color-text)" />
        <YAxis
          dataKey="name"
          type="category"
          width={150}
          stroke="var(--color-text)"
        />
        <CartesianGrid strokeDasharray="2 2" />
        <Tooltip
          content={CustomToolTip}
          cursor={{ fill: "var(--color-primary-100)" }}
        />
        <Bar dataKey="total_votes" fill="var(--color-primary)" radius={6} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomToolTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="flex flex-col justify-center items-start bg-background-50 text-text rounded-2xl p-4">
      <Typography bold>{label}</Typography>
      <Typography>total votes: {payload[0].value}</Typography>
    </div>
  );
}
