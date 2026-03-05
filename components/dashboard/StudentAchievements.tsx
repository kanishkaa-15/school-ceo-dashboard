'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Edit2, Trash2, Trophy, Medal, Award, Loader2 } from 'lucide-react'
import { apiService } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

interface Achievement {
  _id: string
  studentName: string
  competition: string
  category: string
  position: string
  date: string
  level: 'School' | 'District' | 'State' | 'National' | 'International'
  description?: string
}

interface StudentAchievementsProps {
  isEditable?: boolean
}

const COMPETITIONS = [
  'Science Fair', 'Math Olympiad', 'Debate Competition', 'Art Contest', 
  'Sports Meet', 'Quiz Competition', 'Essay Writing', 'Spelling Bee',
  'Robotics Competition', 'Music Competition', 'Drama Festival', 'Poetry Recitation'
]

const CATEGORIES = [
  'Individual', 'Team', 'Group Project', 'Solo Performance', 'Pair Competition'
]

const POSITIONS = ['1st', '2nd', '3rd', 'Participation', 'Special Recognition', 'Best Performance']

const LEVELS = ['School', 'District', 'State', 'National', 'International'] as const

export default function StudentAchievements({ isEditable = false }: StudentAchievementsProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Achievement>>({
    level: 'School'
  })

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const data = await apiService.getAchievements()
      setAchievements(data)
    } catch (error) {
      console.error('Error fetching achievements:', error)
      toast({
        title: 'Error',
        description: 'Failed to load achievements',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setEditingId(null)
    setFormData({
      studentName: '',
      competition: '',
      category: '',
      position: '',
      date: '',
      level: 'School',
      description: ''
    })
    setOpenDialog(true)
  }

  const handleEditClick = (achievement: Achievement) => {
    setEditingId(achievement._id)
    // Format date for input
    const formattedDate = achievement.date ? new Date(achievement.date).toISOString().split('T')[0] : ''
    setFormData({
      ...achievement,
      date: formattedDate
    })
    setOpenDialog(true)
  }

  const handleSave = async () => {
    if (!formData.studentName || !formData.competition || !formData.position || !formData.date || !formData.category) {
      toast({
        title: 'Required Fields',
        description: 'Please fill all required fields',
        variant: 'destructive',
      })
      return
    }

    try {
      if (editingId) {
        await apiService.updateAchievement(editingId, formData)
        toast({
          title: 'Success',
          description: 'Achievement updated successfully',
        })
      } else {
        await apiService.createAchievement(formData)
        toast({
          title: 'Success',
          description: 'Achievement added successfully',
        })
      }
      setOpenDialog(false)
      fetchAchievements()
    } catch (error) {
      console.error('Error saving achievement:', error)
      toast({
        title: 'Error',
        description: 'Failed to save achievement',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      try {
        await apiService.deleteAchievement(id)
        toast({
          title: 'Success',
          description: 'Achievement deleted successfully',
        })
        fetchAchievements()
      } catch (error) {
        console.error('Error deleting achievement:', error)
        toast({
          title: 'Error',
          description: 'Failed to delete achievement',
          variant: 'destructive',
        })
      }
    }
  }

  const getPositionIcon = (position: string) => {
    switch (position) {
      case '1st': return <Trophy className="h-4 w-4 text-yellow-600" />
      case '2nd': return <Medal className="h-4 w-4 text-gray-500" />
      case '3rd': return <Award className="h-4 w-4 text-orange-600" />
      default: return <Award className="h-4 w-4 text-blue-600" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'International': return 'bg-purple-100 text-purple-800'
      case 'National': return 'bg-red-100 text-red-800'
      case 'State': return 'bg-blue-100 text-blue-800'
      case 'District': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Student Achievements
          </CardTitle>
          {isEditable && (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={handleAddClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? 'Edit Achievement' : 'Add New Achievement'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Student Name"
                    value={formData.studentName || ''}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                  <Select value={formData.competition || ''} onValueChange={(value) => setFormData({ ...formData, competition: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Competition" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPETITIONS.map(comp => (
                        <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={formData.category || ''} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={formData.position || ''} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITIONS.map(pos => (
                        <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={formData.level || 'School'} onValueChange={(value) => setFormData({ ...formData, level: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <Button onClick={handleSave} className="w-full">
                    {editingId ? 'Update Achievement' : 'Add Achievement'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement._id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getPositionIcon(achievement.position)}
                      <h4 className="font-semibold">{achievement.studentName}</h4>
                      <Badge className={getLevelColor(achievement.level)}>
                        {achievement.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>{achievement.competition}</strong> - {achievement.category}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      Position: <strong>{achievement.position}</strong> | Date: {new Date(achievement.date).toLocaleDateString()}
                    </p>
                    {achievement.description && (
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    )}
                  </div>
                  {isEditable && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(achievement)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(achievement._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {achievements.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No achievements recorded yet
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
