'use client'

import { Button } from '@/components/ui/button'
import { GraduationCap, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import AdmissionsAnalytics from '@/components/dashboard/AdmissionsAnalytics'
import StaffDetails from '@/components/dashboard/StaffDetails'
import ParentQueries from '@/components/dashboard/ParentQueries'
import Sidebar from '@/components/dashboard/Sidebar'
import InstitutionalHealthIndex from '@/components/dashboard/InstitutionalHealthIndex'
import LearningOutcomeGrowth from '@/components/dashboard/LearningOutcomeGrowth'
import RetentionAttritionAnalytics from '@/components/dashboard/RetentionAttritionAnalytics'
import ParentTrustIndex from '@/components/dashboard/ParentTrustIndex'
import TeachingEffectiveness from '@/components/dashboard/TeachingEffectiveness'
import StudentPerformanceOverview from '@/components/dashboard/StudentPerformanceOverview'
import Achievements from '@/components/dashboard/Achievements'
import StudentAchievements from '@/components/dashboard/StudentAchievements'

interface AdminDashboardPageProps {
  onNavigate: (page: 'dashboard' | 'staff' | 'admissions' | 'queries' | 'admin' | 'admin-staff' | 'admin-admissions' | 'admin-queries' | 'admin-staff-management') => void
  onLogout?: () => void
}

export default function AdminDashboardPage({ onNavigate, onLogout }: AdminDashboardPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
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
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Full Management Platform</p>
              </div>
            </div>
          </div>

          {onLogout && (
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="gap-2 text-destructive hover:bg-destructive/10 border-border/50 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-2">Admin Control Center</h2>
              <p className="text-muted-foreground">Full access to all institutional data with modification rights. Monitor and manage all aspects of the school system.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Institutional Health & Wellness</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <InstitutionalHealthIndex />
                <LearningOutcomeGrowth />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Student Outcomes & Engagement</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <RetentionAttritionAnalytics />
                <ParentTrustIndex />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Teaching & Staff Performance</h3>
              <TeachingEffectiveness />
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Student Academic Performance Overview</h3>
              <StudentPerformanceOverview />
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Student Achievements & Competitions</h3>
              <StudentAchievements isEditable={true} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Operations Analytics</h3>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => onNavigate('admin-staff-management')}>
                    Staff Members
                  </Button>
                  <Button size="sm" onClick={() => onNavigate('admin-admissions')}>
                    Manage Admissions
                  </Button>
                  <Button size="sm" onClick={() => onNavigate('staff')}>
                    Manage Staff
                  </Button>
                  <Button size="sm" onClick={() => onNavigate('queries')}>
                    Manage Queries
                  </Button>
                </div>
              </div>
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
