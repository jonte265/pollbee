"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Typography from "./ui/typography/Typography";

type Props = {
  data: {
    poll_title: string;
    is_active: boolean;
    share_id: string;
    created_at: string;
    total_votes: number;
    poll_options: {
      vote_count: number;
    }[];
  }[];
};

export default function PollChart({ data }: Props) {
  return (
    <BarChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        margin: "auto",
      }}
      responsive
      data={data}
      layout="vertical"
    >
      <XAxis type="number" stroke="var(--color-text)" />
      <YAxis
        dataKey="poll_title"
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
