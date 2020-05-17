const exceljs = require('exceljs')

const findStudentParticipationQuery =
  `select people.id, people.lastname, people.lastname2, people.name, 
    sum(case session_student.participated when true then 1 else 0 end) as participation
  from session_student
  left join sessions on sessions.id = session_student.session_id
  left join students on students.person_id = session_student.student_id
  left join people on people.id = students.person_id
  where sessions.classroom_id = ? and week_number = ?
  group by people.id, people.lastname, people.lastname2, people.name
  order by lastname, lastname2, name`

class StudentParticipationReport {

  constructor(knex) {
    this.knex = knex
  }

  async findStudentParticipation({ classroomId, weekNumber }) {
    const { rows: results } = await this.knex.raw(findStudentParticipationQuery, [classroomId, weekNumber])
    return results.map((r, i) => ({ i: i+1, ...r, result: r.participation > 0 ? 'ASISTIÓ' : 'NO ASISTIÓ'}))
  }

  async exportFindStudentParticipation({ classroomId, weekNumber, sout, grade }) {
    const data = await this.findStudentParticipation({ classroomId, weekNumber })
    var workbook = new exceljs.Workbook()
    await workbook.xlsx.readFile(`${__dirname}/templates/student_participation_template.xlsx`)
    const worksheet = workbook.getWorksheet('participacion')
    worksheet.columns = [
      { key: 'i', width: 4 },
      { key: 'lastname', width: 20 },
      { key: 'lastname2', width: 20 },
      { key: 'name', width: 31 },
      { key: 'participation' },
      { key: 'result' },
    ]
    worksheet.addRows(data)

    var row = worksheet.getRow(4);
    row.getCell(1).value = `${grade.replace(/_/ig, ' ')}`
    return workbook.xlsx.write(sout);
  }
}

module.exports = StudentParticipationReport