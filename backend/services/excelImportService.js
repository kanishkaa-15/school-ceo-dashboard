const xlsx = require('xlsx');
const Admission = require('../models/Admission');

/**
 * Service to parse Excel files and upsert student data into the Admission collection.
 * Expected columns: studentId, studentName, parentName, email, phone, grade, section
 */
const importExcelData = async (filePath, io) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const datasheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(datasheet);

    console.log(`Excel Service: Processing ${data.length} records from ${filePath}`);

    const results = {
      added: 0,
      updated: 0,
      failed: 0
    };

    for (const row of data) {
      try {
        const studentId = row.studentId || row['Student ID'];
        const studentName = row.studentName || row['Student Name'];
        const grade = row.grade || row['Grade'];
        const section = row.section || row['Section'] || 'A';

        if (!studentName || !grade) {
          results.failed++;
          continue;
        }

        const studentData = {
          studentId: studentId || `STU${Date.now()}${Math.floor(Math.random() * 1000)}`,
          studentName,
          parentName: row.parentName || row['Parent Name'] || 'N/A',
          email: row.email || row['Email'] || 'N/A',
          phone: row.phone || row['Phone'] || 'N/A',
          grade: grade.toString(),
          section: section.toString(),
          status: 'Approved' // Auto-approve imported students for dashboard visibility
        };

        // Use studentName + grade + section as a unique key if studentId is missing
        const query = studentId ? { studentId } : { studentName, grade: studentData.grade, section: studentData.section };
        
        const existing = await Admission.findOne(query);
        
        if (existing) {
          await Admission.findByIdAndUpdate(existing._id, studentData);
          results.updated++;
          if (io) io.emit('updateAdmission', { ...studentData, _id: existing._id });
        } else {
          const newStudent = new Admission(studentData);
          await newStudent.save();
          results.added++;
          if (io) io.emit('newAdmission', newStudent);
        }
      } catch (err) {
        console.error('Excel Service: Error processing row', row, err);
        results.failed++;
      }
    }

    return results;
  } catch (error) {
    console.error('Excel Service: Critical error reading file', error);
    throw error;
  }
};

module.exports = { importExcelData };
