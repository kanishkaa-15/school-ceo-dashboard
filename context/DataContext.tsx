'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface StaffMember {
  id: string
  name: string
  email: string
  department: string
  position: string
  joinDate: string
  status: 'Active' | 'Inactive' | 'On Leave'
  experience: number
}

export interface AdmissionApplication {
  id: string
  studentName: string
  parentEmail: string
  appliedFor: string
  applicationDate: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review'
  marks: number
  phone: string
}

export interface ParentQuery {
  id: string
  parentName: string
  studentName: string
  email: string
  phone: string
  category: string
  subject: string
  message: string
  status: 'Open' | 'In Progress' | 'Resolved'
  priority: 'Low' | 'Medium' | 'High'
  createdDate: string
}

interface DataContextType {
  staff: StaffMember[]
  addStaff: (member: Omit<StaffMember, 'id'>) => void
  updateStaff: (id: string, member: Omit<StaffMember, 'id'>) => void
  deleteStaff: (id: string) => void

  admissions: AdmissionApplication[]
  addAdmission: (app: Omit<AdmissionApplication, 'id'>) => void
  updateAdmission: (id: string, app: Omit<AdmissionApplication, 'id'>) => void
  deleteAdmission: (id: string) => void

  queries: ParentQuery[]
  addQuery: (query: Omit<ParentQuery, 'id'>) => void
  updateQuery: (id: string, query: Omit<ParentQuery, 'id'>) => void
  deleteQuery: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const INITIAL_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@school.edu',
    department: 'Mathematics',
    position: 'Senior Teacher',
    joinDate: '2018-05-15',
    status: 'Active',
    experience: 15,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@school.edu',
    department: 'English',
    position: 'Teacher',
    joinDate: '2020-08-10',
    status: 'Active',
    experience: 8,
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@school.edu',
    department: 'Science',
    position: 'Lab Coordinator',
    joinDate: '2019-03-20',
    status: 'Active',
    experience: 10,
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@school.edu',
    department: 'Social Studies',
    position: 'Department Head',
    joinDate: '2017-09-01',
    status: 'Active',
    experience: 12,
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@school.edu',
    department: 'Physical Education',
    position: 'Teacher',
    joinDate: '2021-01-15',
    status: 'Active',
    experience: 6,
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.a@school.edu',
    department: 'Languages',
    position: 'Senior Teacher',
    joinDate: '2019-08-20',
    status: 'On Leave',
    experience: 9,
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert.t@school.edu',
    department: 'Arts',
    position: 'Teacher',
    joinDate: '2022-03-10',
    status: 'Active',
    experience: 4,
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria.g@school.edu',
    department: 'Mathematics',
    position: 'Teacher',
    joinDate: '2020-11-05',
    status: 'Active',
    experience: 7,
  },
  {
    id: '9',
    name: 'James Brown',
    email: 'james.b@school.edu',
    department: 'Science',
    position: 'Counselor',
    joinDate: '2018-02-28',
    status: 'Inactive',
    experience: 11,
  },
]

const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: '1',
    studentName: 'Alex Thompson',
    parentEmail: 'alex.parent@email.com',
    appliedFor: 'Class 9',
    applicationDate: '2024-01-15',
    status: 'Approved',
    marks: 92,
    phone: '+1-555-0101',
  },
  {
    id: '2',
    studentName: 'Maya Patel',
    parentEmail: 'maya.p@email.com',
    appliedFor: 'Class 10',
    applicationDate: '2024-01-20',
    status: 'Under Review',
    marks: 85,
    phone: '+1-555-0102',
  },
  {
    id: '3',
    studentName: 'James Wilson',
    parentEmail: 'james.w@email.com',
    appliedFor: 'Class 8',
    applicationDate: '2024-01-18',
    status: 'Pending',
    marks: 78,
    phone: '+1-555-0103',
  },
]

const INITIAL_QUERIES: ParentQuery[] = [
  {
    id: '1',
    parentName: 'Robert Davis',
    studentName: 'Emma Davis',
    email: 'robert.davis@email.com',
    phone: '+1-555-0104',
    category: 'Academic',
    subject: 'Math tutoring concerns',
    message: 'My daughter is struggling with algebra. Could we discuss additional support options?',
    status: 'Open',
    priority: 'High',
    createdDate: '2024-01-22',
  },
  {
    id: '2',
    parentName: 'Jennifer Smith',
    studentName: 'Lucas Smith',
    email: 'jennifer.smith@email.com',
    phone: '+1-555-0105',
    category: 'Fees',
    subject: 'Payment plan inquiry',
    message: 'I would like to know about flexible payment options for next semester.',
    status: 'In Progress',
    priority: 'Medium',
    createdDate: '2024-01-20',
  },
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF)
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(INITIAL_ADMISSIONS)
  const [queries, setQueries] = useState<ParentQuery[]>(INITIAL_QUERIES)

  const addStaff = (member: Omit<StaffMember, 'id'>) => {
    setStaff([...staff, { ...member, id: Date.now().toString() }])
  }

  const updateStaff = (id: string, member: Omit<StaffMember, 'id'>) => {
    setStaff(staff.map((s) => (s.id === id ? { ...member, id } : s)))
  }

  const deleteStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id))
  }

  const addAdmission = (app: Omit<AdmissionApplication, 'id'>) => {
    setAdmissions([...admissions, { ...app, id: Date.now().toString() }])
  }

  const updateAdmission = (id: string, app: Omit<AdmissionApplication, 'id'>) => {
    setAdmissions(admissions.map((a) => (a.id === id ? { ...app, id } : a)))
  }

  const deleteAdmission = (id: string) => {
    setAdmissions(admissions.filter((a) => a.id !== id))
  }

  const addQuery = (query: Omit<ParentQuery, 'id'>) => {
    setQueries([...queries, { ...query, id: Date.now().toString() }])
  }

  const updateQuery = (id: string, query: Omit<ParentQuery, 'id'>) => {
    setQueries(queries.map((q) => (q.id === id ? { ...query, id } : q)))
  }

  const deleteQuery = (id: string) => {
    setQueries(queries.filter((q) => q.id !== id))
  }

  return (
    <DataContext.Provider
      value={{
        staff,
        addStaff,
        updateStaff,
        deleteStaff,
        admissions,
        addAdmission,
        updateAdmission,
        deleteAdmission,
        queries,
        addQuery,
        updateQuery,
        deleteQuery,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
