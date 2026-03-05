'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Award, Target, TrendingUp, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

const achievementIcons = {
  trophy: Trophy,
  star: Star,
  award: Award,
  target: Target,
  trending: TrendingUp,
  users: Users,
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      // For now, using static data. Can be replaced with API call
      const staticAchievements = [
        {
          id: '1',
          title: 'Excellence in Education',
          description: 'Awarded Best School of the Year 2024',
          category: 'Academic',
          date: '2024-01-15',
          icon: 'trophy',
          status: 'achieved'
        },
        {
          id: '2',
          title: '95% Pass Rate',
          description: 'Achieved 95% student pass rate this semester',
          category: 'Performance',
          date: '2024-01-10',
          icon: 'star',
          status: 'achieved'
        },
        {
          id: '3',
          title: 'Staff Excellence',
          description: '100% staff retention rate for 2024',
          category: 'HR',
          date: '2024-01-05',
          icon: 'users',
          status: 'achieved'
        },
        {
          id: '4',
          title: 'Parent Satisfaction',
          description: '98% parent satisfaction rating',
          category: 'Community',
          date: '2024-01-01',
          icon: 'award',
          status: 'achieved'
        },
        {
          id: '5',
          title: 'Growth Target',
          description: 'Reached 500+ student enrollment milestone',
          category: 'Growth',
          date: '2023-12-20',
          icon: 'trending',
          status: 'achieved'
        },
        {
          id: '6',
          title: 'Digital Excellence',
          description: 'Successfully implemented digital learning platform',
          category: 'Technology',
          date: '2023-12-15',
          icon: 'target',
          status: 'achieved'
        }
      ]
      setAchievements(staticAchievements)
    } catch (error) {
      console.error('Error fetching achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800'
      case 'Performance': return 'bg-green-100 text-green-800'
      case 'HR': return 'bg-purple-100 text-purple-800'
      case 'Community': return 'bg-orange-100 text-orange-800'
      case 'Growth': return 'bg-yellow-100 text-yellow-800'
      case 'Technology': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">School Achievements</CardTitle>
          <CardDescription>Recent accomplishments and milestones</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading achievements...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">School Achievements</CardTitle>
        <CardDescription>Recent accomplishments and milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.slice(0, 6).map((achievement) => {
            const IconComponent = achievementIcons[achievement.icon as keyof typeof achievementIcons] || Trophy
            return (
              <div key={achievement.id} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground truncate">
                      {achievement.title}
                    </h4>
                    <Badge className={`${getCategoryColor(achievement.category)} text-xs`}>
                      {achievement.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        
        {achievements.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No achievements recorded yet
          </div>
        )}
      </CardContent>
    </Card>
  )
}