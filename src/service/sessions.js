const { v4: uuid } = require('uuid')

module.exports = (knex) => {
  return {
    async list({ classroomId }) {
      const results = await knex.select()
      .from('sessions')
      .where({
        classroom_id: classroomId
      })
      return { results }
    },

    async create(session) {
      const sessionId = uuid()
      await knex('sessions').insert(Object.assign({ id: sessionId }, session))
      const students = await knex.select('student_id').from('student_classroom_assignment').where({
        classroom_id: session.classroom_id
      })
      await knex('session_student')
      .insert(students.map(studentId => ({ id: uuid(), session_id: sessionId, student_id: studentId.student_id })))
      return { sessionId }
    },

    async loadById({ sessionId }) {
      const session = await knex.select({
        name: 'sessions.name',
        number: 'sessions.number',
        competences: 'sessions.competences',
        grade_name: 'grades.name',
        area_id: 'sessions.area_id'
      })
      .from('sessions')
      .leftJoin('classrooms', 'sessions.classroom_id', 'classrooms.id')
      .leftJoin('grades_opened', 'grades_opened.id', 'classrooms.grade_opened_id')
      .leftJoin('grades', 'grades.id', 'grades_opened.grade_id')
      .first()
      .where({
        'sessions.id': sessionId
      })
      session.detail = await knex.select({
        detail_id: 'session_student.id',
        session_id: 'session_student.session_id',
        student_name: 'people.name',
        student_lastname: 'people.lastname',
        student_lastname2: 'people.lastname2',
        participated: 'session_student.participated',
        web: 'session_student.web',
        tv: 'session_student.tv',
        radio: 'session_student.radio',
        homework: 'session_student.homework',
        optional_homework: 'session_student.optional_homework',
        optional_resources: 'session_student.optional_resources',
        optional_meeting: 'session_student.optional_meeting',
        optional_meeting_via: 'session_student.optional_meeting_via',
        optional_date: 'session_student.optional_date',
        optional_theme: 'session_student.optional_theme',
        comments: 'session_student.comments'
      })
      .from('session_student')
      .leftJoin('students', 'session_student.student_id', 'students.person_id')
      .leftJoin('people', 'students.person_id', 'people.id')
      .where({ session_id: sessionId })
      .orderBy(['lastname', 'lastname2', 'name'])
      return session
    },

    async updateDetail(detail) {
      await knex('session_student').where({ id: detail.id }).update(detail)
      return detail
    }
  }
}