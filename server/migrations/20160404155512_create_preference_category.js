exports.up = function(knex, Promise) {
  return knex.schema.createTable('preference_category', function(table){
    table.increments('id');
    table.integer('preference_id');
    table.integer('category_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preference_category');
};
