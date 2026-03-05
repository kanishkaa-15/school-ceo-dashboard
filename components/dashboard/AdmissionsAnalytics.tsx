'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowUp, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AdmissionsAnalytics() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdmissionsData()
  }, [])

  const fetchAdmissionsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/analytics/admissions')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching admissions analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Admissions Analytics</CardTitle>
          <CardDescription>Year-over-year comparison</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Admissions Analytics</CardTitle>
          <CardDescription>Year-over-year comparison</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Admissions Analytics</CardTitle>
        <CardDescription>Real-time admissions data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Applications</p>
            <p className="text-2xl font-bold text-foreground">{data.totalAdmissions || 0}</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Approved</p>
            <p className="text-2xl font-bold text-primary">{data.approvedAdmissions || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-100 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{data.pendingAdmissions || 0}</p>
          </div>
          <div className="bg-red-100 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{data.rejectedAdmissions || 0}</p>
          </div>
        </div>

        {data.totalAdmissions > 0 && (
          <div className="flex items-center gap-2 bg-accent/10 rounded-lg p-3">
            <ArrowUp className="w-5 h-5 text-accent" />
            <div>
              <p className="font-semibold text-accent">Approval Rate: {((data.approvedAdmissions / data.totalAdmissions) * 100).toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">of total applications</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
