'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function StaffDetails() {
  const [staffData, setStaffData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStaffData()
  }, [])

  const fetchStaffData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/staff')
      const data = await response.json()
      setStaffData(data)
    } catch (error) {
      console.error('Error fetching staff data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Staff Details</CardTitle>
          <CardDescription>Staff composition and experience distribution</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  const totalStaff = staffData.length
  const activeStaff = staffData.filter(s => s.status === 'Active').length
  const inactiveStaff = staffData.filter(s => s.status === 'Inactive').length

  const departmentCounts = staffData.reduce((acc, staff) => {
    acc[staff.department] = (acc[staff.department] || 0) + 1
    return acc
  }, {})

  const departmentData = Object.entries(departmentCounts).map(([name, value], index) => ({
    name,
    value,
    fill: `var(--color-chart-${(index % 5) + 1})`
  }))

  const experienceRanges = {
    '0-5 years': staffData.filter(s => s.experience <= 5).length,
    '5-10 years': staffData.filter(s => s.experience > 5 && s.experience <= 10).length,
    '10+ years': staffData.filter(s => s.experience > 10).length,
  }

  const experienceData = Object.entries(experienceRanges).map(([range, count]) => ({
    range,
    count
  }))

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Staff Details</CardTitle>
        <CardDescription>Real-time staff composition and metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Staff Members</p>
          <p className="text-3xl font-bold text-foreground">{totalStaff}</p>
          <div className="flex gap-4 mt-3 text-sm">
            <div>
              <p className="text-muted-foreground">Active</p>
              <p className="font-semibold text-primary">{activeStaff}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Inactive</p>
              <p className="font-semibold text-accent">{inactiveStaff}</p>
            </div>
          </div>
        </div>

        {departmentData.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Department Distribution</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {experienceData.some(d => d.count > 0) && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Experience Distribution</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={experienceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="range" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: `1px solid var(--color-border)`,
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'var(--color-foreground)' }}
                  />
                  <Bar dataKey="count" fill="var(--color-chart-3)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {totalStaff === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No staff data available
          </div>
        )}
      </CardContent>
    </Card>
  )
}
