
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contact_info', function(table){
    table.increments('id');
    table.integer('location_id');
    table.string('email');
    table.string('phone');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contact_info');
};
