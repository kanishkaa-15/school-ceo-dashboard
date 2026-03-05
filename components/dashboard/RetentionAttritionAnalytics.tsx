'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts'
import { TrendingDown, AlertTriangle } from 'lucide-react'

const retentionData = [
  { month: 'Jan', retention: 97.5, attrition: 2.5, risk: 1.8 },
  { month: 'Feb', retention: 97.2, attrition: 2.8, risk: 2.1 },
  { month: 'Mar', retention: 97.8, attrition: 2.2, risk: 1.6 },
  { month: 'Apr', retention: 98.1, attrition: 1.9, risk: 1.3 },
  { month: 'May', retention: 98.3, attrition: 1.7, risk: 1.1 },
  { month: 'Jun', retention: 98.5, attrition: 1.5, risk: 0.9 },
]

const gradeStats = [
  { grade: 'Grade 1', retained: 145, transfers: 3, dropouts: 2, rate: 97.3 },
  { grade: 'Grade 6', retained: 132, transfers: 5, dropouts: 3, rate: 95.7 },
  { grade: 'Grade 10', retained: 118, transfers: 8, dropouts: 4, rate: 93.7 },
  { grade: 'Grade 12', retained: 89, transfers: 12, dropouts: 9, rate: 88.1 },
]

export default function RetentionAttritionAnalytics() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Student Retention & Attrition</CardTitle>
        <CardDescription>Grade-wise retention analysis and risk assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Avg Retention Rate</p>
            <p className="text-2xl font-bold text-green-500">98.2%</p>
            <p className="text-xs text-green-600 mt-1">↑ Improving</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Total Attrition Rate</p>
            <p className="text-2xl font-bold text-orange-500">1.8%</p>
            <p className="text-xs text-orange-600 mt-1">↓ Declining</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">At-Risk Students</p>
            <p className="text-2xl font-bold text-red-500">24</p>
            <p className="text-xs text-red-600 mt-1">Monitored</p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
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
              <Area type="monotone" dataKey="retention" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" name="Retention %" />
              <Area type="monotone" dataKey="attrition" fill="var(--color-chart-5)" stroke="var(--color-chart-5)" name="Attrition %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grade-wise breakdown */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Grade-wise Analysis</h4>
          <div className="space-y-2">
            {gradeStats.map((item, idx) => (
              <div key={idx} className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm text-foreground">{item.grade}</p>
                  <span className="text-sm font-bold text-primary">{item.rate}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Retained: {item.retained}</span>
                  <span>Dropouts: {item.dropouts}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert */}
        <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20 flex gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Attrition Alert</p>
            <p className="text-xs text-red-800 mt-0.5">Grade 12 shows higher attrition. Follow-up required for 9 students.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
