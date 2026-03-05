'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Heart, Clock, CheckCircle } from 'lucide-react'

const satisfactionData = [
  { name: 'Very Satisfied', value: 65, color: 'var(--color-chart-1)' },
  { name: 'Satisfied', value: 25, color: 'var(--color-chart-2)' },
  { name: 'Neutral', value: 8, color: 'var(--color-chart-3)' },
  { name: 'Dissatisfied', value: 2, color: 'var(--color-chart-5)' },
]

const responseTimeData = [
  { period: 'Week 1', avgTime: 2.4, target: 2.0 },
  { period: 'Week 2', avgTime: 2.1, target: 2.0 },
  { period: 'Week 3', avgTime: 1.9, target: 2.0 },
  { period: 'Week 4', avgTime: 1.7, target: 2.0 },
]

const metrics = {
  totalQueries: 428,
  repeatComplaints: 12,
  avgResponseTime: 1.7,
  resolutionQuality: 94.5,
  satisfactionIndex: 92.8,
  escalationRate: 2.1,
}

export default function ParentTrustIndex() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Parent Trust & Satisfaction Index</CardTitle>
        <CardDescription>Parent engagement and satisfaction metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <Heart className="w-5 h-5 text-red-500 mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Satisfaction Index</p>
            <p className="text-2xl font-bold text-foreground">{metrics.satisfactionIndex}%</p>
            <p className="text-xs text-green-500 mt-1">Excellent</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <Clock className="w-5 h-5 text-blue-500 mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Avg Response Time</p>
            <p className="text-2xl font-bold text-foreground">{metrics.avgResponseTime}h</p>
            <p className="text-xs text-green-500 mt-1">Below target</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Resolution Quality</p>
            <p className="text-2xl font-bold text-foreground">{metrics.resolutionQuality}%</p>
            <p className="text-xs text-green-500 mt-1">High</p>
          </div>
        </div>

        {/* Satisfaction pie chart */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Satisfaction Distribution</h4>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid var(--color-border)`,
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response time trends */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Response Time Trends</h4>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="period" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid var(--color-border)`,
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                />
                <Bar dataKey="avgTime" fill="var(--color-chart-2)" name="Avg Response (hours)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="var(--color-chart-3)" name="Target (hours)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional stats */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Parent Queries</p>
            <p className="text-2xl font-bold text-foreground">{metrics.totalQueries}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Repeat Complaints</p>
            <p className="text-2xl font-bold text-orange-500">{metrics.repeatComplaints}</p>
            <p className="text-xs text-orange-600">2.8% escalation rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
