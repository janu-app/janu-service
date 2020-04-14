
module.exports = (knex) => {
    return {
      async list() {
        const results = await knex.select({
            classroomId: 'classrooms.id',
            turno_order: 'schedules.order',
            turno: 'schedules.name',
            grado: 'grades.grade',
            seccion: 'grades.section',
            name: 'grades.name'
        })
          .from('classrooms')
          .leftJoin('grades_opened', 'classrooms.grade_opened_id', 'grades_opened.id')
          .leftJoin('grades', 'grades_opened.grade_id', 'grades.id')
          .leftJoin('schedules', 'grades.schedule_id', 'schedules.id')
        const data = results.reduce((prev, curr) => {
            if (!prev[curr.turno]) {
                prev[curr.turno] = { turno: curr.turno, grades: [] }
            }
            prev[curr.turno].grades.push(curr)
            return prev
        }, {})
        return { results: Object.values(data) }
      },

      async students(classroomId) {
          const results = await knex.select({
              classroomId: 'student_classroom_assignment.classroom_id',
              name: 'people.name',
              lastname: 'people.lastname',
              lastname2: 'people.lastname2'
          }).from('student_classroom_assignment')
          .leftJoin('students', 'student_classroom_assignment.student_id', 'students.person_id')
          .leftJoin('people', 'students.person_id', 'people.id')
          .where({
              classroom_id: classroomId
          })
          return { results }
      }
    }
  }