
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
        table.string('id', 36).notNullable()
        table.string('uid', 255).notNullable()
        table.string('username', 255).notNullable()
        table.string('status', 10).notNullable()
        table.string('person_id', 36).notNullable()
        table.primary(['id'])
    })
    .createTable('schools', function (table) {
        table.string('id', 36).notNullable()
        table.string('name', 255).notNullable()
        table.string('code', 255).notNullable()
        table.primary(['id'])
    })
    .createTable('people', function (table) {
        table.string('id', 36).notNullable()
        table.string('national_id', 15)
        table.string('name', 255).notNullable()
        table.string('lastname', 255).notNullable()
        table.string('lastname2', 255).notNullable()
        table.primary(['id'])
    })
    .createTable('teachers', function (table) {
        table.string('person_id', 36).notNullable()
        table.string('code', 36)
        table.primary(['person_id'])
        table.foreign('person_id').references('id').inTable('people')
    })
    .createTable('schedules', function (table) {
        table.string('id', 36).notNullable()
        table.string('name', 255).notNullable()
        table.integer('order').notNullable()
        table.primary(['id'])
    })
    .createTable('grades', function (table) {
        table.string('id', 36).notNullable()
        table.string('school_id', 36).notNullable()
        table.string('name', 255).notNullable()
        table.string('schedule_id', 36).notNullable()
        table.string('grade', 25).notNullable()
        table.string('section', 2).notNullable()
        table.primary(['id'])
        table.foreign('school_id').references('id').inTable('schools')
        table.foreign('schedule_id').references('id').inTable('schedules')
    })
    .createTable('grades_opened', function (table) {
        table.string('id', 36).notNullable()
        table.string('grade_id', 36).notNullable()
        table.string('school_term', 8).notNullable()
        table.primary(['id'])
        table.foreign('grade_id').references('id').inTable('grades')
    })
    .createTable('areas', function(table) {
        table.string('id', 36).notNullable()
        table.string('name', 255).notNullable()
    })
    /*.createTable('grade_opened_areas', function (table) {
        table.string('id', 36).notNullable()
        table.string('area_id', 36).notNullable()
        table.string('grade_opened_id', 36).notNullable()
        table.primary(['id'])
        table.foreign('grade_opened_id').references('id').inTable('grades_opened')
        table.foreign('area_id').references('id').inTable('areas')
    })*/
    .createTable('classrooms', function(table) {
        table.string('id', 36).notNullable()
        table.string('grade_opened_id', 36).notNullable()
        //table.string('teacher_id', 36).notNullable()
        table.primary(['id'])
        table.foreign('grade_opened_id').references('id').inTable('grades_opened')
        //table.foreign('teacher_id').references('person_id').inTable('teachers')
    })
    .createTable('students', function(table) {
        table.string('person_id', 36).notNullable()
        table.primary(['person_id'])
        table.foreign('person_id').references('id').inTable('people')
    })
    .createTable('student_classroom_assignment', function(table) {
        table.string('id', 36).notNullable()
        table.string('student_id', 36).notNullable()
        table.string('classroom_id', 36).notNullable()
        table.primary(['id'])
        table.foreign('student_id').references('person_id').inTable('students')
        table.foreign('classroom_id').references('id').inTable('classrooms')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('student_classroom_assignment')
  .dropTable('students')
  .dropTable('classrooms')
  .dropTable('grade_opened_areas')
  .dropTable('areas')
  .dropTable('grades_opened')
  .dropTable('grades')
  .dropTable('schedules')
  .dropTable('teachers')
  .dropTable('people')
  .dropTable('schools')
  .dropTable('users')
};
