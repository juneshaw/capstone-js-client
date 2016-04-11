
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(table){
    table.increments('id');
    table.string('address_1');
    table.string('address_2');
    table.string('city');
    table.string('state');
    table.string('zipcode');
    table.float('lat');
    table.float('long');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
