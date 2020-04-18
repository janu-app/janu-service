const exceljs = require('exceljs')

async function exportXlsx({ template, data, sout }) {
  var workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(`${__dirname}\\${template}`);
  const worksheet = workbook.getWorksheet('Table 1')
  worksheet.columns = [
    { key: 'i', width: 4},
    { key: 'code' },
    { key: 'cicle' },
    { key: 'grade' },
    { key: 'section' },
    { key: 'student_count' },
    { key: 'week_number' },
    { key: 'number' },
    { key: 'area_name', width: 31 },
    { key: 'competences', width: 50, style: { wrapText: true } },
    { key: 'name', width: 50, style: { wrapText: true } },
    { key: 'participated' },
    { key: 'web' },
    { key: 'tv' },
    { key: 'radio' },
    { key: 'had_homework' },
    { key: 'teacher_name', width: 30 },
    { key: 'teacher_lastname', width: 30 },
    { key: 'optional_homework' },
    { key: 'had_meetings' },
    { key: 'optional_meeting' },
    { key: 'optional_meeting_via' },
    { key: 'optional_theme' },
    { key: 'session_comments' }
  ];
  worksheet.addRows(data)
  return workbook.xlsx.write(sout);
}

module.exports = {
  exportXlsx
}