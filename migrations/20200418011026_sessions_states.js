
exports.up = function(knex) {
    return knex.schema.alterTable('sessions', (table) => {
        table.string('state', 36)
    })
};

exports.down = function(knex) {
  
};
