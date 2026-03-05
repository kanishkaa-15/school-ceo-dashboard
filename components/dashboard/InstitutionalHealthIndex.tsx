'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'

const healthData = [
  { month: 'Jan', academic: 78, financial: 82, wellbeing: 75, efficiency: 80 },
  { month: 'Feb', academic: 80, financial: 83, wellbeing: 77, efficiency: 81 },
  { month: 'Mar', academic: 82, financial: 84, wellbeing: 79, efficiency: 83 },
  { month: 'Apr', academic: 81, financial: 85, wellbeing: 81, efficiency: 84 },
  { month: 'May', academic: 83, financial: 86, wellbeing: 83, efficiency: 85 },
  { month: 'Jun', academic: 85, financial: 87, wellbeing: 85, efficiency: 86 },
]

const currentHealth = {
  academic: 85,
  financial: 87,
  wellbeing: 85,
  efficiency: 86,
  overall: 85.75,
  riskLevel: 'LOW',
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'LOW':
      return 'text-green-500'
    case 'MEDIUM':
      return 'text-yellow-500'
    case 'HIGH':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

const getRiskBgColor = (risk: string) => {
  switch (risk) {
    case 'LOW':
      return 'bg-green-500/10'
    case 'MEDIUM':
      return 'bg-yellow-500/10'
    case 'HIGH':
      return 'bg-red-500/10'
    default:
      return 'bg-gray-500/10'
  }
}

export default function InstitutionalHealthIndex() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Institutional Health Index (IHI)</CardTitle>
        <CardDescription>Comprehensive school wellness assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall health indicator */}
        <div className={`rounded-lg p-4 ${getRiskBgColor(currentHealth.riskLevel)}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Overall Health Score</p>
            <div className="flex items-center gap-2">
              {currentHealth.riskLevel === 'LOW' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {currentHealth.riskLevel === 'MEDIUM' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
              {currentHealth.riskLevel === 'HIGH' && <AlertTriangle className="w-5 h-5 text-red-500" />}
              <span className={`font-bold text-xl ${getRiskColor(currentHealth.riskLevel)}`}>
                {currentHealth.overall.toFixed(1)}/100
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Risk Level: {currentHealth.riskLevel}</span>
            <span className={`font-medium ${getRiskColor(currentHealth.riskLevel)}`}>Status: Healthy</span>
          </div>
        </div>

        {/* Component scores */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Academic Health</p>
            <p className="text-2xl font-bold text-foreground">{currentHealth.academic}</p>
            <p className="text-xs text-green-500 mt-1">↑ Strong</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Financial Health</p>
            <p className="text-2xl font-bold text-foreground">{currentHealth.financial}</p>
            <p className="text-xs text-green-500 mt-1">↑ Strong</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Student Wellbeing</p>
            <p className="text-2xl font-bold text-foreground">{currentHealth.wellbeing}</p>
            <p className="text-xs text-green-500 mt-1">↑ Stable</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Staff Efficiency</p>
            <p className="text-2xl font-bold text-foreground">{currentHealth.efficiency}</p>
            <p className="text-xs text-green-500 mt-1">↑ Excellent</p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-border)`,
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="academic" stroke="var(--color-chart-1)" name="Academic" strokeWidth={2} />
              <Line type="monotone" dataKey="financial" stroke="var(--color-chart-2)" name="Financial" strokeWidth={2} />
              <Line type="monotone" dataKey="wellbeing" stroke="var(--color-chart-3)" name="Wellbeing" strokeWidth={2} />
              <Line type="monotone" dataKey="efficiency" stroke="var(--color-chart-4)" name="Efficiency" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
