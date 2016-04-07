
exports.up = function(knex, Promise) {
  return knex.schema.createTable('category', function(table){
    table.increments('id');
    table.string('category_filter');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('category');
};
