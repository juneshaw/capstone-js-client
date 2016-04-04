exports.up = function(knex, Promise) {
  return knex.schema.createTable('preference', function(table){
    table.increments('id');
    table.integer('custom_location_id');
    table.integer('custom_category_flag');
    table.integer('location_id');
    table.string('search_term');
    table.string('sort');
    table.string('category_filter');
    table.integer('radius_filter');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preference');
};
