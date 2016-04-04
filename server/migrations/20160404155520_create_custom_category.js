
exports.up = function(knex, Promise) {
  return knex.schema.createTable('custom_category', function(table){
    table.increments('id');
    table.integer('preference_id');
    table.string('name');
    table.integer('location_id');
    table.string('image_url_link')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('custom_category');
};
