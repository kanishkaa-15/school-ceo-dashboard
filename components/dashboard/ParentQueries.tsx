'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Resolved':
      return 'bg-accent/10 text-accent'
    case 'In Progress':
      return 'bg-primary/10 text-primary'
    case 'Open':
      return 'bg-secondary/50 text-foreground'
    default:
      return 'bg-secondary text-foreground'
  }
}

export default function ParentQueries() {
  const [queries, setQueries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQueries()
  }, [])

  const fetchQueries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/queries')
      const data = await response.json()
      setQueries(data)
    } catch (error) {
      console.error('Error fetching queries:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Parent Queries & Support</CardTitle>
          <CardDescription>Query status and recent communications</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  const totalQueries = queries.length
  const openQueries = queries.filter(q => q.status === 'Open').length
  const inProgressQueries = queries.filter(q => q.status === 'In Progress').length
  const resolvedQueries = queries.filter(q => q.status === 'Resolved').length

  const queryStatus = [
    { name: 'Open', value: openQueries, fill: 'var(--color-chart-2)' },
    { name: 'In Progress', value: inProgressQueries, fill: 'var(--color-chart-3)' },
    { name: 'Resolved', value: resolvedQueries, fill: 'var(--color-chart-1)' },
  ].filter(item => item.value > 0)

  const recentQueries = queries.slice(0, 5)

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Parent Queries & Support</CardTitle>
        <CardDescription>Real-time query status and communications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-2">Total Queries</p>
          <p className="text-3xl font-bold text-foreground mb-4">{totalQueries}</p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Open</p>
              <p className="font-semibold text-foreground">{openQueries}</p>
            </div>
            <div>
              <p className="text-muted-foreground">In Progress</p>
              <p className="font-semibold text-primary">{inProgressQueries}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Resolved</p>
              <p className="font-semibold text-accent">{resolvedQueries}</p>
            </div>
          </div>
        </div>

        {queryStatus.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Status Distribution</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={queryStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {queryStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {recentQueries.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Recent Queries</p>
            <div className="bg-secondary/50 rounded-lg overflow-hidden border border-border/50">
              <table className="w-full text-sm">
                <thead className="bg-secondary border-b border-border/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-foreground font-semibold">Parent</th>
                    <th className="px-4 py-3 text-left text-foreground font-semibold">Subject</th>
                    <th className="px-4 py-3 text-center text-foreground font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQueries.map((query) => (
                    <tr key={query._id} className="border-t border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium">{query.parentName}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{query.subject}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={`${getStatusColor(query.status)} border-0`}>
                          {query.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {totalQueries === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No queries available
          </div>
        )}
      </CardContent>
    </Card>
  )
}
