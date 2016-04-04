exports.up = function(knex, Promise) {
  return knex.schema.createTable('group', function(table){
    table.increments('id');
    table.string('title');
    table.integer('host_id');
    table.text('bio');
    table.integer('preference_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group');
};
