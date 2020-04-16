
exports.up = function(knex) {
  return knex.schema.alterTable('sessions', (table) => {
    table.string('week_number', 9)
}).alterTable('grades', (table) => {
    table.string('cicle', 20)
})
};

exports.down = function(knex) {
  
};
