exports.up = function(knex, Promise) {
  return knex.schema.createTable('member', function(table){
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.integer('contact_info_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('member');
};
