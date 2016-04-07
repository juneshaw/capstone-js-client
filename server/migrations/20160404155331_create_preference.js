exports.up = function(knex, Promise) {
  return knex.schema.createTable('preference', function(table){
    table.increments('id');
    table.string('day');
    table.string('periodicity');
    table.time('time');
    table.integer('custom_location_id');
    table.boolean('custom_category_flag');
    table.integer('location_id');
    table.string('search_term');
    table.integer('sort');
    table.integer('radius_filter');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preference');
};
