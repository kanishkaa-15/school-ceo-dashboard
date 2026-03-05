const mongoose = require('mongoose');
const User = require('./models/User');
const Staff = require('./models/Staff');
const Admission = require('./models/Admission');
const Query = require('./models/Query');
const Achievement = require('./models/Achievement');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/school_ceo_dashboard');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Staff.deleteMany({});
    await Admission.deleteMany({});
    await Query.deleteMany({});
    await Achievement.deleteMany({});

    // Create default users
    const users = [
      {
        name: 'School Administrator',
        email: 'admin@school.edu',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'School CEO',
        email: 'ceo@school.edu',
        password: 'ceo123',
        role: 'ceo'
      },
      {
        name: 'Staff Member',
        email: 'staff@school.edu',
        password: 'staff123',
        role: 'staff'
      },
      {
        name: 'Parent User',
        email: 'parent@school.edu',
        password: 'parent123',
        role: 'parent',
        studentName: 'Alex Thompson'
      }
    ];

    await User.insertMany(users);
    console.log('Users seeded');

    // Create sample staff
    const staff = [
      // Mathematics Department
      {
        name: 'John Smith',
        email: 'john.smith@school.edu',
        department: 'Mathematics',
        position: 'Department Head',
        joinDate: new Date('2018-05-15'),
        status: 'Active',
        experience: 15
      },
      {
        name: 'Maria Rodriguez',
        email: 'maria.rodriguez@school.edu',
        department: 'Mathematics',
        position: 'Senior Teacher',
        joinDate: new Date('2019-08-20'),
        status: 'Active',
        experience: 12
      },
      {
        name: 'David Chen',
        email: 'david.chen@school.edu',
        department: 'Mathematics',
        position: 'Teacher',
        joinDate: new Date('2021-01-10'),
        status: 'Active',
        experience: 6
      },
      
      // English Department
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@school.edu',
        department: 'English',
        position: 'Department Head',
        joinDate: new Date('2020-08-10'),
        status: 'Active',
        experience: 10
      },
      {
        name: 'Emily Watson',
        email: 'emily.watson@school.edu',
        department: 'English',
        position: 'Senior Teacher',
        joinDate: new Date('2017-09-01'),
        status: 'Active',
        experience: 14
      },
      {
        name: 'James Wilson',
        email: 'james.wilson@school.edu',
        department: 'English',
        position: 'Teacher',
        joinDate: new Date('2022-02-15'),
        status: 'Active',
        experience: 4
      },
      
      // Science Department
      {
        name: 'Dr. Lisa Thompson',
        email: 'lisa.thompson@school.edu',
        department: 'Science',
        position: 'Department Head',
        joinDate: new Date('2016-07-01'),
        status: 'Active',
        experience: 18
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@school.edu',
        department: 'Science',
        position: 'Physics Teacher',
        joinDate: new Date('2019-03-12'),
        status: 'Active',
        experience: 9
      },
      {
        name: 'Jennifer Lee',
        email: 'jennifer.lee@school.edu',
        department: 'Science',
        position: 'Chemistry Teacher',
        joinDate: new Date('2020-06-08'),
        status: 'Active',
        experience: 7
      },
      {
        name: 'Robert Garcia',
        email: 'robert.garcia@school.edu',
        department: 'Science',
        position: 'Biology Teacher',
        joinDate: new Date('2021-09-01'),
        status: 'Active',
        experience: 5
      },
      
      // Social Studies Department
      {
        name: 'Patricia Davis',
        email: 'patricia.davis@school.edu',
        department: 'Social Studies',
        position: 'Department Head',
        joinDate: new Date('2015-08-15'),
        status: 'Active',
        experience: 16
      },
      {
        name: 'Thomas Anderson',
        email: 'thomas.anderson@school.edu',
        department: 'Social Studies',
        position: 'History Teacher',
        joinDate: new Date('2018-01-20'),
        status: 'Active',
        experience: 11
      },
      {
        name: 'Amanda Miller',
        email: 'amanda.miller@school.edu',
        department: 'Social Studies',
        position: 'Geography Teacher',
        joinDate: new Date('2020-09-10'),
        status: 'Active',
        experience: 6
      },
      
      // Physical Education Department
      {
        name: 'Coach Mark Taylor',
        email: 'mark.taylor@school.edu',
        department: 'Physical Education',
        position: 'Department Head',
        joinDate: new Date('2017-06-01'),
        status: 'Active',
        experience: 13
      },
      {
        name: 'Jessica Moore',
        email: 'jessica.moore@school.edu',
        department: 'Physical Education',
        position: 'PE Teacher',
        joinDate: new Date('2019-08-25'),
        status: 'Active',
        experience: 8
      },
      
      // Arts Department
      {
        name: 'Catherine White',
        email: 'catherine.white@school.edu',
        department: 'Arts',
        position: 'Art Teacher',
        joinDate: new Date('2018-09-15'),
        status: 'Active',
        experience: 10
      },
      {
        name: 'Daniel Martinez',
        email: 'daniel.martinez@school.edu',
        department: 'Arts',
        position: 'Music Teacher',
        joinDate: new Date('2020-01-12'),
        status: 'Active',
        experience: 7
      },
      {
        name: 'Rachel Green',
        email: 'rachel.green@school.edu',
        department: 'Arts',
        position: 'Drama Teacher',
        joinDate: new Date('2021-08-30'),
        status: 'Active',
        experience: 4
      },
      
      // Technology Department
      {
        name: 'Kevin Park',
        email: 'kevin.park@school.edu',
        department: 'Technology',
        position: 'IT Coordinator',
        joinDate: new Date('2019-02-01'),
        status: 'Active',
        experience: 9
      },
      {
        name: 'Lisa Chang',
        email: 'lisa.chang@school.edu',
        department: 'Technology',
        position: 'Computer Science Teacher',
        joinDate: new Date('2020-07-15'),
        status: 'Active',
        experience: 6
      },
      
      // Administration
      {
        name: 'Principal Helen Adams',
        email: 'helen.adams@school.edu',
        department: 'Administration',
        position: 'Principal',
        joinDate: new Date('2014-07-01'),
        status: 'Active',
        experience: 22
      },
      {
        name: 'Vice Principal John Clark',
        email: 'john.clark@school.edu',
        department: 'Administration',
        position: 'Vice Principal',
        joinDate: new Date('2016-08-15'),
        status: 'Active',
        experience: 18
      },
      {
        name: 'Mary Johnson',
        email: 'mary.johnson@school.edu',
        department: 'Administration',
        position: 'Academic Coordinator',
        joinDate: new Date('2018-03-01'),
        status: 'Active',
        experience: 12
      },
      
      // Support Staff
      {
        name: 'Nancy Wilson',
        email: 'nancy.wilson@school.edu',
        department: 'Support Staff',
        position: 'School Counselor',
        joinDate: new Date('2017-09-01'),
        status: 'Active',
        experience: 14
      },
      {
        name: 'Dr. Paul Roberts',
        email: 'paul.roberts@school.edu',
        department: 'Support Staff',
        position: 'School Psychologist',
        joinDate: new Date('2019-01-15'),
        status: 'Active',
        experience: 11
      },
      {
        name: 'Sandra Lewis',
        email: 'sandra.lewis@school.edu',
        department: 'Support Staff',
        position: 'Librarian',
        joinDate: new Date('2016-10-01'),
        status: 'Active',
        experience: 15
      },
      {
        name: 'Carlos Hernandez',
        email: 'carlos.hernandez@school.edu',
        department: 'Support Staff',
        position: 'Maintenance Supervisor',
        joinDate: new Date('2015-05-20'),
        status: 'Active',
        experience: 17
      },
      
      // Special Education
      {
        name: 'Dr. Angela Foster',
        email: 'angela.foster@school.edu',
        department: 'Special Education',
        position: 'Special Education Coordinator',
        joinDate: new Date('2018-08-01'),
        status: 'Active',
        experience: 13
      },
      {
        name: 'Michelle Turner',
        email: 'michelle.turner@school.edu',
        department: 'Special Education',
        position: 'Special Education Teacher',
        joinDate: new Date('2020-09-15'),
        status: 'Active',
        experience: 8
      },
      
      // Language Department
      {
        name: 'Isabella Rossi',
        email: 'isabella.rossi@school.edu',
        department: 'Languages',
        position: 'Spanish Teacher',
        joinDate: new Date('2019-01-10'),
        status: 'Active',
        experience: 9
      },
      {
        name: 'Pierre Dubois',
        email: 'pierre.dubois@school.edu',
        department: 'Languages',
        position: 'French Teacher',
        joinDate: new Date('2021-02-01'),
        status: 'Active',
        experience: 5
      },
      
      // Inactive Staff (for demonstration)
      {
        name: 'Former Teacher',
        email: 'former.teacher@school.edu',
        department: 'Mathematics',
        position: 'Teacher',
        joinDate: new Date('2015-09-01'),
        status: 'Inactive',
        experience: 12
      }
    ];

    await Staff.insertMany(staff);
    console.log('Staff seeded');

    // Create sample admissions
    const admissions = [
      {
        studentName: 'Alex Thompson',
        parentName: 'Michael Thompson',
        email: 'alex.parent@email.com',
        phone: '+1-555-0101',
        grade: 'Class 9',
        status: 'Approved',
        applicationDate: new Date('2024-01-15'),
        notes: 'Excellent academic record'
      },
      {
        studentName: 'Maya Patel',
        parentName: 'Raj Patel',
        email: 'maya.p@email.com',
        phone: '+1-555-0102',
        grade: 'Class 10',
        status: 'Approved',
        applicationDate: new Date('2024-01-20'),
        notes: 'Good academic performance'
      },
      {
        studentName: 'Emma Davis',
        parentName: 'Robert Davis',
        email: 'emma.parent@email.com',
        phone: '+1-555-0103',
        grade: 'Class 8',
        status: 'Approved',
        applicationDate: new Date('2024-01-18'),
        notes: 'Strong in mathematics'
      },
      {
        studentName: 'Lucas Smith',
        parentName: 'Jennifer Smith',
        email: 'lucas.parent@email.com',
        phone: '+1-555-0104',
        grade: 'Class 7',
        status: 'Approved',
        applicationDate: new Date('2024-01-22'),
        notes: 'Excellent in science'
      },
      {
        studentName: 'Sarah Johnson',
        parentName: 'Mark Johnson',
        email: 'sarah.parent@email.com',
        phone: '+1-555-0105',
        grade: 'Class 11',
        status: 'Approved',
        applicationDate: new Date('2024-01-25'),
        notes: 'Outstanding academic record'
      }
    ];

    await Admission.insertMany(admissions);
    console.log('Admissions seeded');

    // Create sample queries
    const queries = [
      {
        parentName: 'Robert Davis',
        studentName: 'Emma Davis',
        email: 'robert.davis@email.com',
        phone: '+1-555-0104',
        subject: 'Math tutoring concerns',
        message: 'My daughter is struggling with algebra. Could we discuss additional support options?',
        status: 'Open',
        priority: 'High'
      },
      {
        parentName: 'Jennifer Smith',
        studentName: 'Lucas Smith',
        email: 'jennifer.smith@email.com',
        phone: '+1-555-0105',
        subject: 'Payment plan inquiry',
        message: 'I would like to know about flexible payment options for next semester.',
        status: 'In Progress',
        priority: 'Medium'
      }
    ];

    await Query.insertMany(queries);
    console.log('Queries seeded');

    // Create sample achievements
    const achievements = [
      {
        studentName: 'Alice Johnson',
        competition: 'Science Fair',
        position: '1st',
        date: new Date('2024-01-15'),
        category: 'Individual',
        level: 'State',
        description: 'Project on Renewable Energy Solutions'
      },
      {
        studentName: 'Bob Smith',
        competition: 'Math Olympiad',
        position: '2nd',
        date: new Date('2024-01-20'),
        category: 'Individual',
        level: 'National',
        description: 'Advanced Mathematics Competition'
      },
      {
        studentName: 'Carol Davis',
        competition: 'Debate Competition',
        position: '1st',
        date: new Date('2024-02-05'),
        category: 'Team',
        level: 'District',
        description: 'Inter-school Debate Championship'
      },
      {
        studentName: 'David Wilson',
        competition: 'Art Contest',
        position: '3rd',
        date: new Date('2024-02-10'),
        category: 'Individual',
        level: 'State',
        description: 'Painting Competition - Abstract Art'
      },
      {
        studentName: 'Emma Brown',
        competition: 'Sports Meet',
        position: '1st',
        date: new Date('2024-02-15'),
        category: 'Individual',
        level: 'School',
        description: '100m Sprint Championship'
      }
    ];

    await Achievement.insertMany(achievements);
    console.log('Achievements seeded');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();