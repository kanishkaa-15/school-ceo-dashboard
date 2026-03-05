'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit2, GraduationCap, LogOut, Plus, Save } from 'lucide-react'
import { useEffect, useState } from 'react'

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

interface StaffDashboardProps {
  onLogout: () => void
}

const CLASSES = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
const SECTIONS = ['A', 'B', 'C', 'D']

const generateInitialStudents = (): Student[] => {
  const students: Student[] = []
  CLASSES.forEach(cls => {
    SECTIONS.slice(0, cls.includes('11') || cls.includes('12') ? 2 : 3).forEach(section => {
      for (let i = 1; i <= 25; i++) {
        const math = Math.floor(Math.random() * 40) + 60
        const english = Math.floor(Math.random() * 40) + 60
        const science = Math.floor(Math.random() * 40) + 60
        const social = Math.floor(Math.random() * 40) + 60
        const overall = Math.round((math + english + science + social) / 4)
        
        let grade = 'F'
        if (overall >= 90) grade = 'A+'
        else if (overall >= 80) grade = 'A'
        else if (overall >= 70) grade = 'B'
        else if (overall >= 60) grade = 'C'
        else if (overall >= 50) grade = 'D'

        students.push({
          id: `${cls}-${section}-${i}`,
          name: `Student ${i}`,
          rollNumber: `${cls.slice(-1)}${section}${i.toString().padStart(2, '0')}`,
          class: cls,
          section: section,
          mathematics: math,
          english: english,
          science: science,
          socialStudies: social,
          overall: overall,
          grade: grade
        })
      }
    })
  })
  return students
}

export default function StaffDashboardPage({ onLogout }: StaffDashboardProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedClass, setSelectedClass] = useState('Class 9')
  const [selectedSection, setSelectedSection] = useState('A')
  const [editingStudent, setEditingStudent] = useState<string | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState<Partial<Student>>({})
  const [editStudent, setEditStudent] = useState<Partial<Student>>({})

  const handleAddDialogChange = (open: boolean) => {
    setAddDialogOpen(open)
    if (open) {
      setNewStudent({ class: selectedClass, section: selectedSection })
    } else {
      setNewStudent({})
    }
  }

  const handleEditClick = (student: Student) => {
    setEditStudent(student)
    setEditDialogOpen(true)
  }

  const handleEditSave = () => {
    if (!editStudent.name || !editStudent.class || !editStudent.section) {
      alert('Please fill all required fields')
      return
    }

    const updatedStudents = students.map(student => {
      if (student.id === editStudent.id) {
        const updated = { ...editStudent } as Student
        if (updated.mathematics !== undefined && updated.english !== undefined && updated.science !== undefined && updated.socialStudies !== undefined) {
          const overall = Math.round((updated.mathematics + updated.english + updated.science + updated.socialStudies) / 4)
          let grade = 'F'
          if (overall >= 90) grade = 'A+'
          else if (overall >= 80) grade = 'A'
          else if (overall >= 70) grade = 'B'
          else if (overall >= 60) grade = 'C'
          else if (overall >= 50) grade = 'D'
          updated.overall = overall
          updated.grade = grade
        }
        return updated
      }
      return student
    })
    setStudents(updatedStudents)
    localStorage.setItem('students', JSON.stringify(updatedStudents))
    window.dispatchEvent(new Event('studentsUpdated'))
    setEditDialogOpen(false)
    setEditStudent({})
  }

  useEffect(() => {
    const savedStudents = localStorage.getItem('students')
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    } else {
      const initialStudents = generateInitialStudents()
      setStudents(initialStudents)
      localStorage.setItem('students', JSON.stringify(initialStudents))
    }
  }, [])

  const filteredStudents = students.filter(s => s.class === selectedClass && s.section === selectedSection)

  const updateStudent = (id: string, field: keyof Student, value: any) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        const updated = { ...student, [field]: value }
        if (['mathematics', 'english', 'science', 'socialStudies'].includes(field)) {
          const overall = Math.round((updated.mathematics + updated.english + updated.science + updated.socialStudies) / 4)
          let grade = 'F'
          if (overall >= 90) grade = 'A+'
          else if (overall >= 80) grade = 'A'
          else if (overall >= 70) grade = 'B'
          else if (overall >= 60) grade = 'C'
          else if (overall >= 50) grade = 'D'
          updated.overall = overall
          updated.grade = grade
        }
        return updated
      }
      return student
    })
    setStudents(updatedStudents)
    localStorage.setItem('students', JSON.stringify(updatedStudents))
    window.dispatchEvent(new Event('studentsUpdated'))
  }

  const addStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.section || newStudent.mathematics === undefined || newStudent.english === undefined || newStudent.science === undefined || newStudent.socialStudies === undefined) {
      alert('Please fill all required fields')
      return
    }

    const math = newStudent.mathematics || 0
    const english = newStudent.english || 0
    const science = newStudent.science || 0
    const social = newStudent.socialStudies || 0
    const overall = Math.round((math + english + science + social) / 4)
    
    let grade = 'F'
    if (overall >= 90) grade = 'A+'
    else if (overall >= 80) grade = 'A'
    else if (overall >= 70) grade = 'B'
    else if (overall >= 60) grade = 'C'
    else if (overall >= 50) grade = 'D'

    const nextRoll = filteredStudents.length + 1
    const student: Student = {
      id: `${newStudent.class}-${newStudent.section}-${Date.now()}`,
      name: newStudent.name,
      rollNumber: `${newStudent.class?.slice(-1)}${newStudent.section}${nextRoll.toString().padStart(2, '0')}`,
      class: newStudent.class,
      section: newStudent.section,
      mathematics: math,
      english: english,
      science: science,
      socialStudies: social,
      overall: overall,
      grade: grade
    }

    const updatedStudents = [...students, student]
    setStudents(updatedStudents)
    localStorage.setItem('students', JSON.stringify(updatedStudents))
    window.dispatchEvent(new Event('studentsUpdated'))
    setNewStudent({})
    setAddDialogOpen(false)
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-green-100 text-green-700'
      case 'B': return 'bg-blue-100 text-blue-800'
      case 'C': return 'bg-yellow-100 text-yellow-800'
      case 'D': return 'bg-orange-100 text-orange-800'
      default: return 'bg-red-100 text-red-800'
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
            <h1 className="text-xl font-bold text-foreground">Staff Dashboard</h1>
            <p className="text-xs text-muted-foreground">Student Performance Management</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Student Performance Management</h2>
            <p className="text-muted-foreground">Manage student records and update performance data</p>
          </div>

          {/* Class and Section Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Class & Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASSES.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Section</label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTIONS.map(section => (
                        <SelectItem key={section} value={section}>Section {section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Dialog open={addDialogOpen} onOpenChange={handleAddDialogChange}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Student Name"
                        value={newStudent.name || ''}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      />
                      <Select value={newStudent.class || selectedClass} onValueChange={(value) => setNewStudent({...newStudent, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASSES.map(cls => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={newStudent.section || selectedSection} onValueChange={(value) => setNewStudent({...newStudent, section: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                          {SECTIONS.map(section => (
                            <SelectItem key={section} value={section}>Section {section}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="number"
                          placeholder="Mathematics"
                          value={newStudent.mathematics || ''}
                          onChange={(e) => setNewStudent({...newStudent, mathematics: parseInt(e.target.value) || 0})}
                        />
                        <Input
                          type="number"
                          placeholder="English"
                          value={newStudent.english || ''}
                          onChange={(e) => setNewStudent({...newStudent, english: parseInt(e.target.value) || 0})}
                        />
                        <Input
                          type="number"
                          placeholder="Science"
                          value={newStudent.science || ''}
                          onChange={(e) => setNewStudent({...newStudent, science: parseInt(e.target.value) || 0})}
                        />
                        <Input
                          type="number"
                          placeholder="Social Studies"
                          value={newStudent.socialStudies || ''}
                          onChange={(e) => setNewStudent({...newStudent, socialStudies: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <Button onClick={addStudent} className="w-full">
                        Add Student
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {/* Edit Student Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Student Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Student Name"
                        value={editStudent.name || ''}
                        onChange={(e) => setEditStudent({...editStudent, name: e.target.value})}
                      />
                      <Select value={editStudent.class || ''} onValueChange={(value) => setEditStudent({...editStudent, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASSES.map(cls => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={editStudent.section || ''} onValueChange={(value) => setEditStudent({...editStudent, section: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                          {SECTIONS.map(section => (
                            <SelectItem key={section} value={section}>Section {section}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="number"
                          placeholder="Mathematics"
                          value={editStudent.mathematics || ''}
                          onChange={(e) => setEditStudent({...editStudent, mathematics: parseInt(e.target.value) || 0})}
                        />
                        <Input
                          type="number"
                          placeholder="English"
                          value={editStudent.english || ''}
                          onChange={(e) => setEditStudent({...editStudent, english: parseInt(e.target.value) || 0})}
                        />
                        <Input
                          type="number"
                          placeholder="Science"
                          value={editStudent.science || ''}
                          onChange={(e) => setEditStudent({...editStudent, science: parseInt(e.target.value) || 0})}
                        />
                        <Input
                          type="number"
                          placeholder="Social Studies"
                          value={editStudent.socialStudies || ''}
                          onChange={(e) => setEditStudent({...editStudent, socialStudies: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <Button onClick={handleEditSave} className="w-full">
                        Update Student
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Student Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedClass} - Section {selectedSection} ({filteredStudents.length} students)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead className="text-center">Mathematics</TableHead>
                      <TableHead className="text-center">English</TableHead>
                      <TableHead className="text-center">Science</TableHead>
                      <TableHead className="text-center">Social Studies</TableHead>
                      <TableHead className="text-center">Overall %</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNumber}</TableCell>
                        <TableCell>
                          {editingStudent === student.id ? (
                            <Input
                              value={student.name}
                              onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                              className="w-full"
                            />
                          ) : (
                            student.name
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingStudent === student.id ? (
                            <Input
                              type="number"
                              value={student.mathematics}
                              onChange={(e) => updateStudent(student.id, 'mathematics', parseInt(e.target.value) || 0)}
                              className="w-20 text-center"
                            />
                          ) : (
                            `${student.mathematics}%`
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingStudent === student.id ? (
                            <Input
                              type="number"
                              value={student.english}
                              onChange={(e) => updateStudent(student.id, 'english', parseInt(e.target.value) || 0)}
                              className="w-20 text-center"
                            />
                          ) : (
                            `${student.english}%`
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingStudent === student.id ? (
                            <Input
                              type="number"
                              value={student.science}
                              onChange={(e) => updateStudent(student.id, 'science', parseInt(e.target.value) || 0)}
                              className="w-20 text-center"
                            />
                          ) : (
                            `${student.science}%`
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingStudent === student.id ? (
                            <Input
                              type="number"
                              value={student.socialStudies}
                              onChange={(e) => updateStudent(student.id, 'socialStudies', parseInt(e.target.value) || 0)}
                              className="w-20 text-center"
                            />
                          ) : (
                            `${student.socialStudies}%`
                          )}
                        </TableCell>
                        <TableCell className="text-center font-medium">{student.overall}%</TableCell>
                        <TableCell className="text-center">
                          <Badge className={getGradeColor(student.grade)}>
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {editingStudent === student.id ? (
                            <Button
                              size="sm"
                              onClick={() => setEditingStudent(null)}
                              className="mr-2"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <div className="flex gap-1 justify-center">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingStudent(student.id)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditClick(student)}
                              >
                                Edit Details
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}