'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

interface Student {
  id: string
  name: string
  rollNumber: string
  class: string
  section: string
  mathematics: number
  english: number
  science: number
  socialStudies: number
  overall: number
  grade: string
}

export default function StudentPerformanceOverview() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const loadStudents = () => {
      const savedStudents = localStorage.getItem('students')
      if (savedStudents) {
        setStudents(JSON.parse(savedStudents))
      }
    }

    loadStudents()

    // Poll for changes every 2 seconds
    const interval = setInterval(loadStudents, 2000)

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        loadStudents()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events for same-tab updates
    const handleStudentsUpdate = () => {
      loadStudents()
    }
    
    window.addEventListener('studentsUpdated', handleStudentsUpdate)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('studentsUpdated', handleStudentsUpdate)
    }
  }, [])

  // Calculate student statistics
  const totalStudents = students.length
  const averageMarks = students.length > 0 ? (students.reduce((sum, student) => sum + student.overall, 0) / students.length).toFixed(1) : 0
  const passCount = students.filter((student) => student.overall >= 60).length
  const passPercentage = totalStudents > 0 ? ((passCount / totalStudents) * 100).toFixed(1) : 0

  // Grade-wise performance
  const gradeWisePerformance = [
    { grade: 'Class 6', students: students.filter((s) => s.class === 'Class 6').length, avgMarks: students.filter((s) => s.class === 'Class 6').reduce((sum, s) => sum + s.overall, 0) / Math.max(students.filter((s) => s.class === 'Class 6').length, 1) },
    { grade: 'Class 7', students: students.filter((s) => s.class === 'Class 7').length, avgMarks: students.filter((s) => s.class === 'Class 7').reduce((sum, s) => sum + s.overall, 0) / Math.max(students.filter((s) => s.class === 'Class 7').length, 1) },
    { grade: 'Class 8', students: students.filter((s) => s.class === 'Class 8').length, avgMarks: students.filter((s) => s.class === 'Class 8').reduce((sum, s) => sum + s.overall, 0) / Math.max(students.filter((s) => s.class === 'Class 8').length, 1) },
    { grade: 'Class 9', students: students.filter((s) => s.class === 'Class 9').length, avgMarks: students.filter((s) => s.class === 'Class 9').reduce((sum, s) => sum + s.overall, 0) / Math.max(students.filter((s) => s.class === 'Class 9').length, 1) },
    { grade: 'Class 10', students: students.filter((s) => s.class === 'Class 10').length, avgMarks: students.filter((s) => s.class === 'Class 10').reduce((sum, s) => sum + s.overall, 0) / Math.max(students.filter((s) => s.class === 'Class 10').length, 1) },
    { grade: 'Class 11', students: students.filter((s) => s.class === 'Class 11').length, avgMarks: students.filter((s) => s.class === 'Class 11').reduce((sum, s) => sum + s.overall, 0) / Math.max(students.filter((s) => s.class === 'Class 11').length, 1) },
    { grade: 'Class 12', students: students.filter((s) => s.class === 'Class 12').length, avgMarks: students.filter((s) => s.class === 'Class 12').reduce((sum, s) => sum + s.overall, 0) / Math.max(students.filter((s) => s.class === 'Class 12').length, 1) },
  ]

  // Performance distribution
  const performanceDistribution = [
    { range: 'Excellent (90-100)', count: students.filter((s) => s.overall >= 90).length, fill: '#10b981' },
    { range: 'Good (75-89)', count: students.filter((s) => s.overall >= 75 && s.overall < 90).length, fill: '#3b82f6' },
    { range: 'Average (60-74)', count: students.filter((s) => s.overall >= 60 && s.overall < 75).length, fill: '#f59e0b' },
    { range: 'Below Average (<60)', count: students.filter((s) => s.overall < 60).length, fill: '#ef4444' },
  ]

  // Performance trend over students
  const performanceTrend = students
    .slice(0, 20) // Show first 20 students for trend
    .map((student, idx) => ({
      student: `${idx + 1}`,
      marks: student.overall,
      name: student.name.split(' ')[0],
    }))

  return (
    <div className="space-y-6">
      {/* Key Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Active students in system</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{averageMarks}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pass Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{passPercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">{passCount} students passed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {students.filter((s) => s.grade !== 'F').length}/{totalStudents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Students with passing grades</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Grade-wise Performance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Grade-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeWisePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="grade" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Bar dataKey="avgMarks" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, count }) => `${range}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trend */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Academic Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
              <Line
                type="monotone"
                dataKey="marks"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ r: 6 }}
                name="Student Marks"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
