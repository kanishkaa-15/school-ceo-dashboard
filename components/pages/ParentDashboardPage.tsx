'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, LogOut, MessageSquare, TrendingUp, User } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ParentDashboardProps {
  onLogout: () => void
}

export default function ParentDashboardPage({ onLogout }: ParentDashboardProps) {
  const [studentName, setStudentName] = useState('')
  const [queries, setQueries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newQuery, setNewQuery] = useState({
    subject: '',
    message: '',
    priority: 'Medium'
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      setStudentName(userData.studentName || '')
    }
    fetchQueries()
  }, [])

  const fetchQueries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/queries')
      const data = await response.json()
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      // Filter queries for this parent's student
      const parentQueries = data.filter((q: any) => q.studentName === user.studentName)
      setQueries(parentQueries)
    } catch (error) {
      console.error('Error fetching queries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const response = await fetch('http://localhost:5000/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: user.name,
          studentName: user.studentName,
          email: user.email,
          phone: 'N/A',
          subject: newQuery.subject,
          message: newQuery.message,
          priority: newQuery.priority,
          status: 'Open'
        }),
      })

      if (response.ok) {
        setNewQuery({ subject: '', message: '', priority: 'Medium' })
        fetchQueries()
      }
    } catch (error) {
      console.error('Error submitting query:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Open': return 'bg-red-100 text-red-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Parent Dashboard</h1>
            <p className="text-xs text-muted-foreground">Student: {studentName}</p>
          </div>
        </div>

        <Button
          onClick={onLogout}
          variant="outline"
          size="sm"
          className="gap-2 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Parent!</h2>
            <p className="text-muted-foreground">Submit queries and track your child's progress</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Submit Query */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Submit Query
                </CardTitle>
                <CardDescription>Ask questions or raise concerns about your child</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuery} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="Enter query subject"
                      value={newQuery.subject}
                      onChange={(e) => setNewQuery(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <Select value={newQuery.priority} onValueChange={(value) => setNewQuery(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Describe your query in detail"
                      value={newQuery.message}
                      onChange={(e) => setNewQuery(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Query
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Student Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Student Performance
                </CardTitle>
                <CardDescription>Your child's academic progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{studentName}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Performance</p>
                        <p className="font-medium">Good Progress</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Detailed performance metrics will be available soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Queries */}
          <Card>
            <CardHeader>
              <CardTitle>My Queries ({queries.length})</CardTitle>
              <CardDescription>Track your submitted queries and responses</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading queries...</div>
              ) : queries.length > 0 ? (
                <div className="space-y-4">
                  {queries.map((query) => (
                    <div key={query._id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{query.subject}</h3>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(query.priority)}>
                            {query.priority}
                          </Badge>
                          <Badge className={getStatusColor(query.status)}>
                            {query.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{query.message}</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {new Date(query.createdAt).toLocaleDateString()}
                      </p>
                      {query.response && (
                        <div className="mt-3 p-3 bg-green-50 rounded border-l-4 border-green-400">
                          <p className="text-sm font-medium text-green-800">Response:</p>
                          <p className="text-sm text-green-700">{query.response}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No queries submitted yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}