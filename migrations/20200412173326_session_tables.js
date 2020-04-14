
exports.up = function (knex) {
  return knex.schema
  .createTable('sessions', function (table) {
    table.string('id', 36).notNullable()
    table.string('teacher_id', 36).notNullable()
    table.string('classroom_id', 36).notNullable()
    table.string('area_id', 36).notNullable()
    table.string('number', 9).notNullable()
    table.string('name', 255).notNullable()
    table.string('competences', 255).notNullable()
    table.primary(['id'])
    table.foreign('teacher_id').references('person_id').inTable('teachers')
  })
  .createTable('session_student', function (table) {
    table.string('id', 36).notNullable()
    table.string('session_id', 36).notNullable()
    table.string('student_id', 36).notNullable()
    table.boolean('participated')
    table.boolean('web')
    table.boolean('tv')
    table.boolean('radio')
    table.boolean('homework')
    table.boolean('optional_homework')
    table.string('optional_resources', 255)
    table.boolean('optional_meeting')
    table.string('optional_meeting_via', 255)
    table.date('optional_date')
    table.string('optional_theme', 255)
    table.boolean('comments')
    table.primary(['id'])
    table.foreign('session_id').references('id').inTable('sessions')
    table.foreign('student_id').references('person_id').inTable('students')
  })
};

exports.down = function (knex) {
  knex.schema.dropTable('session_student')
  .dropTable('sessions')
};
