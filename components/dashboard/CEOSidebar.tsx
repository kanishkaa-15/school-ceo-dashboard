'use client'

import { BarChart3, X, Eye, Users, BookOpen, MessageSquare, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CEOSidebarProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: 'dashboard' | 'staff' | 'admissions' | 'queries' | 'student-performance') => void
}

const viewOnlyItems = [
  { icon: BarChart3, label: 'Analytics Dashboard', page: 'dashboard' as const },
  { icon: Users, label: 'View Staff', page: 'staff' as const },
  { icon: BookOpen, label: 'View Admissions', page: 'admissions' as const },
  { icon: MessageSquare, label: 'View Queries', page: 'queries' as const },
  { icon: GraduationCap, label: 'Student Performance', page: 'student-performance' as const },
]

export default function CEOSidebar({ isOpen, onClose, onNavigate }: CEOSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
            <h2 className="text-lg font-bold text-sidebar-foreground">CEO View</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-sidebar-accent rounded transition-colors"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex-1 p-4 space-y-2">
            <div className="space-y-2">
              {viewOnlyItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground gap-3"
                    onClick={() => {
                      onNavigate(item.page)
                      onClose()
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Button>
                )
              })}
            </div>

            {/* Read-only notice */}
            <div className="pt-4 mt-4 border-t border-sidebar-border">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 font-medium">Read-Only Access</p>
                <p className="text-xs text-blue-600 mt-1">View data only, no modifications</p>
              </div>
            </div>
          </nav>

          {/* Footer info */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="bg-sidebar-accent/50 rounded-lg p-3">
              <p className="text-xs text-sidebar-foreground font-medium">School CEO</p>
              <p className="text-xs text-sidebar-accent-foreground/70 mt-1">ceo@school.edu</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}