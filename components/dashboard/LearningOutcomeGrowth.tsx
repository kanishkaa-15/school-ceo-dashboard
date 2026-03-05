'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import { TrendingUp, AlertCircle } from 'lucide-react'

const growthData = [
  { subject: 'Mathematics', baseline: 65, current: 78, growth: 20, gap: 2.3 },
  { subject: 'English', baseline: 72, current: 82, growth: 14, gap: 1.8 },
  { subject: 'Science', baseline: 68, current: 81, growth: 19, gap: 2.1 },
  { subject: 'Social Studies', baseline: 70, current: 79, growth: 13, gap: 1.5 },
  { subject: 'Languages', baseline: 60, current: 75, growth: 25, gap: 2.8 },
]

const avgGrowth = (growthData.reduce((sum, item) => sum + item.growth, 0) / growthData.length).toFixed(1)

export default function LearningOutcomeGrowth() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Learning Outcome Growth KPI</CardTitle>
        <CardDescription>Subject-wise baseline vs. current performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Average growth */}
        <div className="flex items-center justify-between bg-accent/10 rounded-lg p-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Average Growth Across Subjects</p>
            <p className="text-3xl font-bold text-accent">{avgGrowth}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-accent opacity-50" />
        </div>

        {/* Subject breakdown */}
        <div className="space-y-2">
          {growthData.map((item, idx) => (
            <div key={idx} className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground text-sm">{item.subject}</p>
                <span className="text-sm font-bold text-accent">+{item.growth}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full"
                  style={{ width: `${Math.min(item.growth, 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Baseline: {item.baseline}</span>
                <span>Current: {item.current}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="subject" stroke="var(--color-muted-foreground)" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-border)`,
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Legend />
              <Bar dataKey="baseline" fill="var(--color-chart-2)" name="Baseline Score" radius={[8, 8, 0, 0]} />
              <Bar dataKey="current" fill="var(--color-chart-1)" name="Current Score" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Intervention alerts */}
        <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20 flex gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-900">Intervention Required</p>
            <p className="text-xs text-yellow-800 mt-0.5">2 students in Mathematics, 1 in English require additional support</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
