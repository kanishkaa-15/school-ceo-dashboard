'use client'

import { Button } from '@/components/ui/button'
import { GraduationCap, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import AdmissionsAnalytics from '@/components/dashboard/AdmissionsAnalytics'
import StaffDetails from '@/components/dashboard/StaffDetails'
import ParentQueries from '@/components/dashboard/ParentQueries'
import CEOSidebar from '@/components/dashboard/CEOSidebar'
import InstitutionalHealthIndex from '@/components/dashboard/InstitutionalHealthIndex'
import LearningOutcomeGrowth from '@/components/dashboard/LearningOutcomeGrowth'
import RetentionAttritionAnalytics from '@/components/dashboard/RetentionAttritionAnalytics'
import ParentTrustIndex from '@/components/dashboard/ParentTrustIndex'
import TeachingEffectiveness from '@/components/dashboard/TeachingEffectiveness'
import StudentPerformanceOverview from '@/components/dashboard/StudentPerformanceOverview'
import Achievements from '@/components/dashboard/Achievements'
import StudentAchievements from '@/components/dashboard/StudentAchievements'

interface DashboardPageProps {
  onLogout: () => void
  onNavigate: (page: 'dashboard' | 'staff' | 'admissions' | 'queries' | 'student-performance') => void
}

export default function DashboardPage({ onLogout, onNavigate }: DashboardPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <CEOSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={onNavigate} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border/50 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CEO Dashboard</h1>
                <p className="text-xs text-muted-foreground">Read-Only Analytics Platform</p>
              </div>
            </div>
          </div>

          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:bg-destructive/10 border-border/50 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Welcome section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-2">CEO Executive Dashboard</h2>
              <p className="text-muted-foreground">View-only access to institutional health, learning outcomes, retention, parent satisfaction, and teaching effectiveness metrics.</p>
            </div>

            {/* KPI Section 1: Institutional Health */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Institutional Health & Wellness</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <InstitutionalHealthIndex />
                <LearningOutcomeGrowth />
              </div>
            </div>

            {/* KPI Section 2: Student Outcomes */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Student Outcomes & Engagement</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <RetentionAttritionAnalytics />
                <ParentTrustIndex />
              </div>
            </div>

            {/* KPI Section 3: Staff Performance */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Teaching & Staff Performance</h3>
              <TeachingEffectiveness />
            </div>

            {/* Student Performance Overview */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Student Academic Performance Overview</h3>
              <StudentPerformanceOverview />
            </div>

            {/* Student Achievements */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Student Achievements & Competitions</h3>
              <StudentAchievements isEditable={false} />
            </div>

            {/* Legacy Analytics */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Operations Analytics</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <AdmissionsAnalytics />
                <StaffDetails />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">School Achievements</h3>
              <Achievements />
            </div>

            <ParentQueries />
          </div>
        </main>
      </div>
    </div>
  )
}
