
exports.up = function(knex) {
    return knex.schema.alterTable('sessions', (table) => {
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(knex.fn.now());
    }).alterTable('grades', (table) => {
        table.integer('order')
    })
};

exports.down = function(knex) {
  
};
