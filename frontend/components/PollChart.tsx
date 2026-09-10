"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import Typography from "./ui/typography/Typography"

type Props = {
  data: {
    poll_title: string
    is_active: boolean
    share_id: string
    created_at: string
    total_votes: number
    poll_options: {
      vote_count: number
    }[]
  }[]
}

export default function PollChart({ data }: Props) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="2 2" opacity={0.5} />
          <XAxis
            type="number"
            stroke="var(--color-text)"
            allowDecimals={false}
          />
          <YAxis
            dataKey="poll_title"
            type="category"
            width={100}
            stroke="var(--color-text)"
            tick={{ fontSize: 14 }}
          />
          <Tooltip
            content={CustomToolTip}
            cursor={{ fill: "var(--color-text-100)" }}
          />
          <Bar
            dataKey="total_votes"
            fill="var(--color-secondary)"
            radius={[0, 6, 6, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function CustomToolTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  return (
    <div className="flex flex-col items-start justify-center rounded-2xl bg-background-50 p-4 text-text">
      <Typography bold>{label}</Typography>
      <Typography>total votes: {payload[0].value}</Typography>
    </div>
  )
}
