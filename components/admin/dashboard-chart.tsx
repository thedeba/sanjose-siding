"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/card";

interface DashboardChartProps {
  data: Array<{ month: string; leads: number }>;
}

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <Card className="h-[320px] p-6 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Monthly leads</p>
          <h3 className="text-xl font-semibold text-slate-100">Lead flow</h3>
        </div>
      </div>
      <div className="flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: "#cbd5e1" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#cbd5e1" }} axisLine={false} tickLine={false} />
            <Tooltip wrapperStyle={{ backgroundColor: "#0f172a", borderRadius: 12, border: "1px solid rgba(148,163,184,0.2)" }} />
            <Line type="monotone" dataKey="leads" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: "#38bdf8" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
