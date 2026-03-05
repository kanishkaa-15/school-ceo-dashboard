'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { Star, TrendingUp } from 'lucide-react'

const teacherData = [
  { id: 'T001', name: 'Dr. Sarah Johnson', grade: '10', subject: 'Mathematics', growth: 92, engagement: 88, completion: 98, peer: 4.8, status: 'Excellent' },
  { id: 'T002', name: 'Mr. James Smith', grade: '9', subject: 'Science', growth: 87, engagement: 85, completion: 95, peer: 4.5, status: 'Good' },
  { id: 'T003', name: 'Ms. Emily Davis', grade: '8', subject: 'English', growth: 89, engagement: 90, completion: 96, peer: 4.7, status: 'Excellent' },
  { id: 'T004', name: 'Mr. Robert Brown', grade: '7', subject: 'History', growth: 82, engagement: 80, completion: 92, peer: 4.2, status: 'Good' },
  { id: 'T005', name: 'Ms. Lisa Wilson', grade: '6', subject: 'Languages', growth: 91, engagement: 92, completion: 99, peer: 4.9, status: 'Excellent' },
]

const performanceMetrics = [
  { metric: 'Student Growth', value: 88.2 },
  { metric: 'Engagement', value: 87 },
  { metric: 'Completion', value: 96 },
  { metric: 'Peer Review', value: 4.6 },
]

const scatterData = teacherData.map((teacher) => ({
  x: teacher.engagement,
  y: teacher.growth,
  name: teacher.name,
  fill: teacher.status === 'Excellent' ? 'var(--color-chart-1)' : 'var(--color-chart-2)',
}))

export default function TeachingEffectiveness() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Teaching Effectiveness Analytics</CardTitle>
        <CardDescription>Teacher performance and impact assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Avg Student Growth</p>
            <p className="text-2xl font-bold text-primary">88.2</p>
            <p className="text-xs text-green-500 mt-1">↑ Strong Progress</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Avg Engagement Index</p>
            <p className="text-2xl font-bold text-primary">87</p>
            <p className="text-xs text-green-500 mt-1">↑ Excellent</p>
          </div>
        </div>

        {/* Teacher ratings bar chart */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Performance Breakdown</h4>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" domain={[0, 100]} />
                <YAxis dataKey="metric" type="category" stroke="var(--color-muted-foreground)" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid var(--color-border)`,
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                />
                <Bar dataKey="value" fill="var(--color-chart-1)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top teachers */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Top Performing Teachers</h4>
          <div className="space-y-2">
            {teacherData.slice(0, 3).map((teacher, idx) => (
              <div key={idx} className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm text-foreground">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.grade} - {teacher.subject}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(Math.round(teacher.peer))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Growth:</span>
                    <p className="font-bold text-foreground">{teacher.growth}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engagement:</span>
                    <p className="font-bold text-foreground">{teacher.engagement}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Completion:</span>
                    <p className="font-bold text-foreground">{teacher.completion}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development areas */}
        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
          <div className="flex gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Development Opportunity</p>
              <p className="text-xs text-blue-800 mt-0.5">Mr. Robert Brown requires support in syllabus completion. Peer mentoring recommended.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
